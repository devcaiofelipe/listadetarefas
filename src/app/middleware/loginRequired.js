import jwtConfig from '../../config/jwt';
import jwt from 'jsonwebtoken';


export default async (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if(!tokenHeader) {
    return res.status(400).json({ error: "Token not provided" });
  };
  
  const [, token] = tokenHeader.split(' ');

  try {
    const tokenDecoded = jwt.verify(token, jwtConfig.secret);
    req.userId = tokenDecoded.id;
    return next();
  } catch(error) {
    return res.status(400).json({
      error: "Invalid token"
    });
  };
};