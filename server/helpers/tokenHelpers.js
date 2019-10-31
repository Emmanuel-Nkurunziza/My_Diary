import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id) => jwt.sign({ UserId: id }, process.env.secretOrPrivateKey, { expiresIn: '1d' });

export default generateToken;
