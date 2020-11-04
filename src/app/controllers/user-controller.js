import User from '../models/user-model';
import * as Yup from 'yup';
import phoneCodeGenerator from '../utils/phone-code-generator';
import bcrypt from 'bcrypt';
import { TextMessageService } from 'comtele-sdk';


export default new class UserController {
  async store(req, res) {
    const { first_name, last_name, password, phone } = req.body; 
    const schema = Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      password: Yup.string().required().min(6),
      phone: Yup.string().required().min(11).max(11)
    });
    
    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'});
    };

    const phoneAlreadyExists = await User.findOne({ where: { phone: phone } });

    if(phoneAlreadyExists) {
      return res.json({ error: "This phone already registered on our database" });
    };

    const userCode = phoneCodeGenerator();

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await User.create({ first_name: first_name, last_name: last_name, password: passwordHash, phone: phone, code: userCode });

    const textMessageService = new TextMessageService(process.env.API_KEY);
    
    textMessageService.send(user.id,
      `Ola ${user.first_name} ${user.last_name} aqui esta seu codigo de verificacao: ${user.code}`, [`${user.phone}`],
      (result) => {console.log(result)});
    
    return res.json(user);
  };

  async confirmPhone(req, res) {
    const userId = req.params.userId;
    console.log(userId);
    return res.json({ ok: true })
  };
};