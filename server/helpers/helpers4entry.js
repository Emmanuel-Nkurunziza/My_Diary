import jwt from 'jsonwebtoken';

// user email referencing entry
export const emailDecrypt = (token) => {
  const userdata = jwt.verify(token, process.env.secretOrPrivateKey);
  return userdata.Email;
};
