import jwtConfig from '../../config/jwt';
import jwt from 'jsonwebtoken';
import User from '../models/user-model';


export default async (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if(!tokenHeader) {
    return res.status(400).json({ error: "Token not provided" });
  };

  const [, token] = tokenHeader.split(' ');

  try {
    const tokenDecoded = jwt.verify(token, jwtConfig.secret);

    const userIsActive = await User.findOne({ where: { id: tokenDecoded.id, active: true } });

    if(!userIsActive) {
      return res.status(401).json({ info: 'You need active your account' })
    };
    
    req.userId = tokenDecoded.id;
    return next();
  } catch(error) {
    return res.status(400).json({
      error: "Invalid token"
    });
  };
};