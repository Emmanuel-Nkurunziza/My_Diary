import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import pool from '../models/connect';
import Usershelpers from '../helpers/helpers4user';
import { query } from '../models/db';
// import { User } from '../models/user';


dotenv.config();


const Users = {

  async signUp(req, res) {
    // const { rows } = await data.insertUser(
    //   Values,
    // );
    const selectString = 'Select * from users where email=$1';
    const value = req.body.email;
    const rows = await query(selectString, [value]);
    if (rows[0]) {
      return res.status(409).json({
        status: 409,
        error: 'User already exists',
      });
    }
    const hashpassword = Usershelpers.hashPassword(req.body.password);
    const insert = 'insert into users (firstname, lastname, email, password) values($1, $2, $3, $4) returning*';
    const values = [req.body.firstname, req.body.lastname, req.body.email, hashpassword];
    const result = await query(insert, values);
    const token = jwt.sign({ id: result[0].id, email: result[0].email }, process.env.jwtPrivateKey);
    return res.status(201).send({
      status: 201,
      message: `${result[0].firstname} created successfully`,
      data: {
        token,
        id: result[0].id,
        email: result[0].email,
        firstname: result[0].firstname,
        lastname: result[0].lastname,
      },
    });
  },


  async signIn(req, res) {
    if (!(req.body.email) || (!(req.body.password))) {
      return res.status(400).send({
        status: 400,
        message: 'User email or password is missing',
      });
    }
    const selectQuery = 'select * from users where email = $1';
    const value = [req.body.email];

    const rows = await query(selectQuery, value);
    if (!rows[0]) {
      return res.status(401).send({
        status: 401,
        message: 'INVALID email ',
      });
    }
    if (!Usershelpers.comparePassword(rows[0].password, req.body.password)) {
      return res.status(401).send({
        status: 401,
        message: 'INVALID  password',
      });
    }
    const token = jwt.sign({ id: rows[0].id, email: rows[0].email }, process.env.jwtPrivateKey);
    console.log(token);
    return res.status(200).send({
      status: 200,
      message: 'Logged in successfully',
      data: {
        token,
        id: rows[0].id,
        email: rows[0].email,
        firstname: rows[0].firstname,
        lastname: rows[0].lastname,
      },
    });
  },

};
export default Users;
