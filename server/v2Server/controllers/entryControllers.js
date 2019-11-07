// import jwt from 'jsonwebtoken';
// import pool from '../models/connect';
import { query } from '../models/db';
// import { emailDecrypt } from '../helpers/helpers4entry';
import entryTimeStamp from '../helpers/entryCreationTime';

const date = new Date();
const Entries = {

  async  create(req, res) {
    const emailvalue = req.user.email;
    const owner = req.user.email;
    const createEntry = 'insert into stories (createdon, title, description, useremail) values($1, $2, $3, $4) returning*';
    const values = [date, req.body.title, req.body.description, owner];
    const result = await query(createEntry, values);
    return res.status(201).send({
      status: 201,
      message: 'Entry is successfully created',
      data: {
        id: result[0].id,
        email: emailvalue,
        created_on: date,
        title: result[0].title,
        description: result[0].description,
        userId: owner,
      },
    });
  },
  async modify(req, res) {
    const emailvalue = req.user.email;
    const owner = req.user.id;
    const exists = await query('select * from stories where storyid = $1', [req.params.entryId]);
    const updateQuery = 'update stories set title=$1, description=$2 where storyid=$3 returning*';
    const values = [req.body.title, req.body.description, parseInt((req.params.entryId), 10)];
    if (!exists[0]) {
      return res.status(404).send({
        status: 404,
        message: 'Non existing text entry',
      });
    }
    const result = await query(updateQuery, values);
    return res.status(200).json({
      status: 200,
      massage: 'modified successfully',
      data: {
        id: result.id,
        email: emailvalue,
        created_on: date,
        title: result[0].title,
        description: result[0].description,
        edited_on: entryTimeStamp(),
        userId: owner,
      },
    });
  },

  async viewAllEntries(req, res) {
    const ownerEmail = req.user.email;
    const allEntriesQuery = 'SELECT * FROM stories WHERE useremail=$1';
    const rows = await query(allEntriesQuery, [ownerEmail]);
    return res.status(201).send({
      status: 201,
      message: 'Entries retrieved',
      data: rows,
    });
  },

  async viewSingleEntry(req, res) {
    const emailvalue = req.user.email;
    const exists = await query('select * from stories where storyid = $1', [req.params.entryId]);
    const viewSingleEntryQuery = 'SELECT * FROM stories WHERE useremail=$1 AND storyid=$2';
    const values = [emailvalue, parseInt(req.params.entryId, 10)];
    if (!exists[0]) {
      return res.status(404).send({
        status: 404,
        message: 'Non existing text entry',
      });
    }
    const result = await query(viewSingleEntryQuery, values);
    res.status(200).json({
      status: 'this story is successively retrieved!',
      data: {
        userEmail: emailvalue,
        entry: result[0],
      },
    });
  },

  async DeleteEntry(req, res) {
    const exists = await query('select * from stories where storyid = $1', [req.params.entryId]);
    const deleteEntryQuery = 'DELETE FROM stories WHERE storyid=$1 RETURNING *';
    const values = [parseInt(req.params.entryId, 10)];
    if (!exists[0]) {
      return res.status(404).send({
        status: 404,
        message: 'Non existing text entry',
      });
    }
    await query(deleteEntryQuery, values);
    return res.status(204).json();
  },
};
export default Entries;
