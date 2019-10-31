import { User } from '../models/user';
import generateToken from '../helpers/tokenHelpers';
import { passHash, passdecrypt } from '../helpers/helpers4user';


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
    const token = generateToken(user.id);
    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
      },
    });
  };


  // User sign in
  static signIn = (req, res) => {
    let {
      email, password,
    } = req.body;

    const isUserExist = users.find((user) => (user.email === email)
      && (passdecrypt(password, user.password)));
    if (!isUserExist) {
      return res.status(401).send({
        status: 401,
        error: 'incorect email or password',
      });
    }

    const token = generateToken(isUserExist.id);

    return res.status(200).send({
      status: 200,
      message: 'User is successfully logged in',
      data: {
        firstName: isUserExist.firstName,
        lastName: isUserExist.lastName,
        email: isUserExist.email,
        token,
      },
    });
  };
}

export default Controller4user;
