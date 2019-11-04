import pool from './connect';
// creating tables;
export const Createtables = () => {
  const Users = `CREATE TABLE IF NOT EXISTS 
	users(
    id SERIAL PRIMARY KEY,
	  email VARCHAR(30) UNIQUE NOT NULL,
	firstName VARCHAR(20) NOT NULL,
	lastName VARCHAR(20) NOT NULL,
  password VARCHAR(300) NOT NULL 
  )`;
  const Diaries = `CREATE TABLE IF NOT EXISTS
  diaries(
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(200) NOT NULL
  )`;
  const Queries =`${Users};${Diaries}`;
  pool.query(Queries).then((res) => {
    console.log(res);
    pool.end();
  })
    .catch((err) => {
      console.log(err)
      pool.end();
    });
};
export const Droptables = () => {
  const Users = `DROP TABLE IF EXISTS users CASCADE`;
  const Diaries=`DROP TABLE IF EXISTS diaries CASCADE`;
  const Queries = `${Users};${Diaries}`;
  pool.query(Queries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err)
      pool.end();
    });
  pool.on('remove', () => {
    process.exit(0);
  });
};
require('make-runnable');