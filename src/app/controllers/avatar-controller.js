import resizeImage from '../utils/resize-avatar-image';
import User from '../models/user-model';


export default new class AvatarController {
  async store(req, res) {
    resizeImage(req.file.filename);

    await User.update({ avatar: req.file.filename }, { where: { id:req.userId } });

    return res.json(req.file);
  };
};