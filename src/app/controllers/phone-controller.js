import User from '../models/user-model';
import * as Yup from 'yup';
import phoneCodeGenerator from '../utils/phone-code-generator';
import SMS from '../services/code-phone';



export default new class PhoneController {
  async update(req, res) {
    const { phone } = req.body.phone; 

    const schema = Yup.object().shape({
      phone: Yup.string().required().min(11).max(11),
    });

    if(!schema.isValid(req.body)) {
      return res.status(401).json({ info: "Phone must be sendly" });
    }; 

    const phoneAlreadyExists = User.findOne({ where: { phone } });

    if(phoneAlreadyExists) {
      return res.status(401).json({ info: 'Phone already registered' });
    };

    const code = phoneCodeGenerator();

    const userWithCodeUpdated = await User.update({ code }, { where: { id:req.userId } });

    userWithCodeUpdated.phone = phone;

    SMS.sendMessage({ userWithCodeUpdated });

    return res.json({ info: 'Code phone ' });
  };
};