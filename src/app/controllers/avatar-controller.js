export default new class AvatarController {
  async store(req, res) {
    console.log(req.file);
    return res.json(req.file);
  };
};