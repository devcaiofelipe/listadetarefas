import { parseISO, isPast, isTomorrow, subDays, format } from 'date-fns';
import * as Yup from 'yup';
import SMS from '../jobs/code-phone';
import Task from '../models/task-model';
import User from '../models/user-model';
import Cache from '../../lib/Cache';


export default new class TaskController {
  async store(req, res) {
    const schema = Yup.object().shape({
      task: Yup.string().required(),
      expirationDate: Yup.string().required()
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Task and expiration date must be submitted'});
    };

    const { task, expirationDate } = req.body;
    
    const parsedDate = parseISO(expirationDate);
    
    if(isPast(parsedDate)) {
      return res.status(401).json({ info: 'Past dates are invalid' });
    };

    if(isTomorrow(parsedDate)) {
      return res.status(401).json({ info: 'Tasks need to be longer than two days' });
    };

    const taskCreated = await Task.create({ task, date:expirationDate, user_id:req.userId });

    const user = await User.findOne({ where: { id:req.userId }});

    const dateMessage = subDays(parsedDate, 1);
    
    const scheduledDate = format(dateMessage, 'yyyy-MM-dd');

    //SMS.sendScheduledMessage({user}, task, scheduledDate);

    await Cache.invalidate(`${req.userId}`)

    return res.json(taskCreated);
  };

  async index(req, res) {
    const cached = await Cache.get(`${req.userId}`);

    if(cached) {
      console.log(cached)
      return res.json(cached);
    };


    const allTasks = await Task.findAndCountAll({
      where: { user_id:req.userId },
      attributes: ['id', 'task', 'done', 'date']
    });

    await Cache.set(`${req.userId}`, allTasks);

    return res.json(allTasks);
  };

  async update(req, res) {
    const { taskId } = req.body;
    const task = await Task.findOne({ where: { id: taskId },
      include: { model: User, as: 'user',
      attributes: ['id']
    }});
    
    if(task.user.id !== req.userId) {
      return res.status(401).json({
        error: 'You can only update your own tasks'
      });
    };

    await Task.update({ done: true }, { where: { id: taskId }});

    await Cache.invalidate(`${req.userId}`)
  
    return res.json({
      info: 'Task updated'
    });
  };
}