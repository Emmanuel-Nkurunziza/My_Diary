import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (email) => jwt.sign({ Email: email }, process.env.secretOrPrivateKey, { expiresIn: '1d' });

export default generateToken;
