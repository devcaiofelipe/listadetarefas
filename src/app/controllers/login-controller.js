import jwt from 'jsonwebtoken';
import User from '../models/user-model';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import jwtConfig from '../../config/jwt';


export default new class LoginController {
  async store(req, res) {
    const schema = Yup.object().shape({
      phone: Yup.string().required().min(11).max(11),
      password: Yup.string().required().min(6) 
    });
    
    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ info: 'Phone and password must be sendly'});
    };

    const { phone, password } = req.body;
    
    const userExists = await User.findOne({ where: { phone, active: true } });
    
    if(!userExists) {
      return res.status(400).json({ error: 'User not registered or not activated' });
    };

    const passwordIsValid = await bcrypt.compare(password, userExists.password);

    if(!passwordIsValid) {
      return res.status(401).json({ info: 'Invalid password' });
    };
    
    const { id, first_name, last_name, avatar } = userExists;

    const url = `http://localhost:3000/${avatar}`

    const token = jwt.sign({ id }, jwtConfig.secret, { expiresIn:jwtConfig.expiresIn });
    return res.json({
      id,
      first_name,
      last_name,
      url,
      token
    });
  }; 
};