import User from '../models/user-model';
import * as Yup from 'yup';
import phoneCodeGenerator from '../utils/phone-code-generator';



export default new class PhoneController {
  async update(req, res) {
    const { phone } = req.body.phone; 

    const schema = Yup.object().shape({
      phone: Yup.string().required().min(11).max(11),
    });

    if(!schema.isValid(req.body)) {
      return res.status(401).json({ info: "User id and phone code must be sendly" });
    }; 

    const phoneAlreadyExists = User.findOne({ where: { id: phone } });


    return res.json({ ok: true });
  };
};