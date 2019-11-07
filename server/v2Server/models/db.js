import pool from './connect';
import '@babel/polyfill';

export const query = async (string, value = []) => pool.connect().then((client) => client
  .query(string, value)
  .then((res) => {
    client.release();
    return res.rows;
  }));
  // creating tables;
export const Createtables = () => {
  const Users = `CREATE TABLE IF NOT EXISTS 
users (
id SERIAL PRIMARY KEY,
email VARCHAR(30) UNIQUE NOT NULL,
firstName VARCHAR(20) NOT NULL,
lastName VARCHAR(20) NOT NULL,
password VARCHAR(300) NOT NULL 
  )`;
  const Stories = `CREATE TABLE IF NOT EXISTS
  stories (
    storyid SERIAL PRIMARY KEY,
    createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(500) NOT NULL,
    useremail VARCHAR(200) NOT NULL
  )`;
  const Queries = `${Users};${Stories}`;
  pool.query(Queries).then((res) => {
    console.log(res);
    pool.end();
  })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
export const Droptables = () => {
  const Users = 'DROP TABLE IF EXISTS users CASCADE';
  const Stories = 'DROP TABLE IF EXISTS stories CASCADE';
  const Queries = `${Users};${Stories}`;
  pool.query(Queries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    process.exit(0);
  });
};
require('make-runnable');
