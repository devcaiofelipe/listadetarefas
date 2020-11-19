import User from '../models/user-model';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';


export default new class PasswordController {
  async update(req, res) {
    const schema = Yup.object().shape({
      oldPassword: Yup.string().required(),
      newPassword: Yup.string().required(),
      newPasswordConfirm: Yup.string().required().min(6)
    });

    if(!schema.isValid(req.body)) {
      return res.status(401).json({ info: "Old and new password must be sendly" });
    };

    const { oldPassword, newPassword, newPasswordConfirm } = req.body;

    if(newPassword !== newPasswordConfirm) {
      return res.status(401).json({ info: 'Passwords do not match' });
    };

    const user = User.findOne({ where: { id: req.userId } });

    if(!user) {
      return res.status(401).json({ error: 'User not found' });
    };

    const isOldPassword = bcrypt.compare(oldPassword, user.password);

    if(!isOldPassword) {
      return res.status(401).json('Old password is incorrect');
    };

    const passwordHash = await bcrypt.hash(newPassword, 8);

    await User.update({ password: passwordHash }, { where: { id:req.userId } });

    return res.json({ info: 'Password updated successfuly' });
  };
};