import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { query } from '../models/db';

dotenv.config();
// middleware definition;
const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(402).send({
      status: 402,
      message: 'Access Denied.No token provided',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decoded;
    const select = 'select * from users where id=$1';
    const value = [decoded.id];
    const result = await query(select, value);
    if (!result[0]) {
      return res.status(403).send({
        status: 403,
        message: 'Forbidden',
      });
    }
    next();
  } catch (ex) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid token',
    });
  }
};
export default auth;
