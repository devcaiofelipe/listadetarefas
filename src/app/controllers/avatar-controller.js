import resizeImage from '../utils/resize-avatar-image';


export default new class AvatarController {
  async store(req, res) {
    resizeImage(req.file.filename);
    return res.json(req.file);
  };
};