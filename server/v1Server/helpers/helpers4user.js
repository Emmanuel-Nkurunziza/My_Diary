import bcrypt from 'bcrypt';

// this function helps in hashing the password
export const passHash = (password) => bcrypt.hashSync(password, Number(process.env.passNumber));

// password decryption
export const passdecrypt = (pass, hashedpass) => bcrypt.compareSync(pass, hashedpass);
