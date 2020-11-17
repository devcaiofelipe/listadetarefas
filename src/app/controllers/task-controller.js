import { parseISO, isPast, isTomorrow, subDays, format } from 'date-fns';
import * as Yup from 'yup';
import SMS from '../services/code-phone';
import Task from '../models/task-model';
import User from '../models/user-model';



export default new class TaskController {
  async store(req, res) {
    const schema = Yup.object().shape({
      task: Yup.string().required(),
      date: Yup.string().required()
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Task and expiration date must be submitted'});
    };

    const { task, date } = req.body;
    const parsedDate = parseISO(date);
    
    if(isPast(parsedDate)) {
      return res.status(401).json({ info: 'Past dates are invalid' });
    };

    if(isTomorrow(parsedDate)) {
      return res.status(401).json({ info: 'Tasks need to be longer than two days' });
    };

    const taskCreated = await Task.create({ task, date, user_id:req.userId });

    const user = await User.findOne({ where: { id:req.userId }});

    const dateMessage = subDays(parsedDate, 1);
    
    const scheduledDate = format(dateMessage, 'yyyy-MM-dd');

    SMS.sendScheduledMessage({user}, task, scheduledDate);

    return res.json(taskCreated);
  };
}