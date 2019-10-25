import { User } from '../models/user';
import generateToken from '../helpers/tokenHelpers';
import { passHash } from '../helpers/helpers4user';


export const users = [];

class Controller4user {
  // User sign-up
  static signUp = (req, res) => {
    let {
      email, firstName, lastName, password,
    } = req.body;

    const hashedPass = passHash(password);

    const emailUsed = users.find((user) => user.email === email);
    if (emailUsed) {
      return res.status(409).send({
        status: 409,
        error: `${email} has arleady been used`,
      });
    }
    // then create account
    const user = new User(users.length + 1, email, firstName, lastName, hashedPass);
    users.push(user);
    const token = generateToken(email);
    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: {
        id: user.id,
        token,
      },
    });
  };
}

export default Controller4user;
