import { Entry } from '../models/entry';
import { emailDecrypt } from '../helpers/helpers4entry';
import entryTimeStamp from '../helpers/entryCreationTime';


const entries = [];


class Controller4entry {
  // Add Entry
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

  // Modify Entry 
  static editEntry = (req, res) => {
    let {
      title, description,
    } = req.body;
    let { entryId } = req.params;
    if (isNaN(entryId)) {
      return res.status(400).send({
        status: 400,
        error: 'The entry id should be a number',
      });
    }
    const authEmail = emailDecrypt(req.header('authorization'));

    const editableEntry = entries.find((entry) => entry.id === parseInt(entryId, 10));
    if (!editableEntry) {
      return res.status(404).send({
        status: 404,
        message: 'Non existing text entry',
      });
    }
    if (editableEntry.userEmail !== authEmail) {
      return res.status(403).send({
        status: 403,
        message: 'You are not authorized to take this action!',
      });
    }

    editableEntry.title = title;
    editableEntry.description = description;

    return res.status(200).send({
      status: 200,
      message: 'Story was edited successfully',
      data: editableEntry,
    });
  }
}

export default Controller4entry;
