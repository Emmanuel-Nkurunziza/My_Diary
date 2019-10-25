import { users } from '../controllers/userControllers';
import { emailDecrypt } from '../helpers/helpers4entry';


const authanticate = (req, res, next) => {
  const token = req.header('authorization');
  if (!token) {
    return res.status(400).send({
      status: 400,
      error: 'there is no token provided!',
    });
  }
  try {
    const userData = emailDecrypt(token);
    const user = users.find((u) => u.email === userData);
    if (!user) {
      return res.status(401).send({
        status: 401,
        error: 'You are not registered in my Diary!',
      });
    }

    next();
  } catch (error) {
    return res.status(400).send({
      status: 400,
      error: error.message,
    });
  }
};

export default authanticate;
