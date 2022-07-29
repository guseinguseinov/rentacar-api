import jwt from "jsonwebtoken";
import { config } from 'dotenv';
import generateResponse from '../global/index.js'
config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_SECRET_KEY ,(err, user) => {
  
      if (err) return res.sendStatus(403);
      req.user = user;
  
      next();
    });
}

function generateAccessToken( data ) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(data, jwtSecretKey);
    return token;
}

function authenticateTokenSalons(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_SECRET_KEY ,(err, user) => {
  
      if (err) return res.sendStatus(403);

      if (user.role == 'user') {
        return res.status(401).json(generateResponse(401, 'User cannot add a salon', null));
      }
      req.user = user;
      next();
    });
}


export { authenticateToken, generateAccessToken, authenticateTokenSalons };