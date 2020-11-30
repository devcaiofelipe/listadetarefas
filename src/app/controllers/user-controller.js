import User from '../models/user-model';
import * as Yup from 'yup';
import phoneCodeGenerator from '../utils/phone-code-generator';
import bcrypt from 'bcrypt';
import SMS from '../jobs/code-phone';



export default new class UserController {
  async store(req, res) { 
    const schema = Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      password: Yup.string().required().min(6),
      phone: Yup.string().required().min(11).max(11)
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'});
    };

    const { first_name, last_name, password, phone } = req.body;

    const phoneAlreadyExists = await User.findOne({ where: { phone: phone } });

    if(phoneAlreadyExists) {
      return res.status(400).json({ error: "This phone already registered on our database" });
    };

    const userCode = phoneCodeGenerator();

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      password: passwordHash,
      phone: phone,
      code: userCode
    });

    const { id } = user;

    //SMS.sendMessage({user});
    
    return res.status(201).json({
      id,
      first_name,
      last_name,
      phone
    });
  };

  async activeUser(req, res) {
    const schema = Yup.object().shape({
      userId: Yup.number().required(),
      phoneCode: Yup.string().required().min(6).max(6)
    });

    if(!schema.isValid(req.body)) {
      return res.status(401).json({ info: "User id and phone code must be sendly" });
    }; 

    const { userId, phoneCode } = req.body;
    
    const userExists = await User.findOne({ where:  { id: userId } })

    if(!userExists) {
      return res.status(404).json({ error: 'User not found' });
    };

    if(userExists.code !== phoneCode) {
      return res.status(401).json({ error: "Invalid code" });
    };

    await User.update({ active: true }, { where: { id: userId } });

    return res.status(200).json({ message: "phone successfully verified" })
  };

  async update(req, res) {
    if(req.body.phone || req.body.password) {
      return res.status(401).json({
        info: 'You cannot update your password via this route. Try "/user/update/password" to update password'
      });
    };

    const user = await User.findOne({ where: { id:req.userId, active:true }});

    if(!user) {
      return res.status(400).json({ error: 'User not found' });
    };
    
    const updatedUser = await user.update(req.body);

    const { id, first_name, last_name } = updatedUser;

    return res.json({ id, first_name, last_name });
  };

  async delete(req, res) {
    await User.update({ active: false }, { where: { id:req.userId } });
    
    return res.json({ info: 'User successfuly deleted' });
  };
};