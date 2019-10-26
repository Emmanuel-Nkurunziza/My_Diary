import { Entry } from '../models/entry';
import { emailDecrypt } from '../helpers/helpers4entry';
import entryTimeStamp from '../helpers/entryCreationTime';


const entries = [];


class Controller4entry {
  static createEntry = (req, res) => {
    let {
      title, description,
    } = req.body;
    const authEmail = emailDecrypt(req.header('authorization'));
    const date = entryTimeStamp();
    const entry = new Entry(entries.length + 1, title, date, description, authEmail);
    entries.push(entry);
    // console.log(entry);
    return res.status(200).send({
      status: 200,
      message: 'Entry created successfully',
      data: entry,
    });
  }
}

export default Controller4entry;
