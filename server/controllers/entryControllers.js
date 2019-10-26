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

  //get all entries
  static getAllEntries = (req, res) => {
    const authEmail = emailDecrypt(req.header('authorization'));
    entries.reverse(); 
    const userEntries = entries.filter((entry) => entry.userEmail
      === authEmail); 
    if (userEntries.length === 0) {
      return res.status(404).send({
        status: 404,
        message: 'No story created yet',
      });
    }
    return res.status(200).send({
      status: 200,
      message: 'stories are successfully displayed',
      data: userEntries,
    });
  }

  // get specific entry
  static getSpecificEntry = (req, res) => {
    const authEmail = emailDecrypt(req.header('authorization'));
    let { entryId } = req.params;
    const specificEntry = entries.find((entry) => entry.id
      === parseInt(entryId, 10)); 
    if (isNaN(entryId)) {
      return res.status(400).send({
        status: 400,
        error: 'The entry id should be a number',
      });
    }
    if (!entryId) {
      return res.status(404).send({
        status: 404,
        error: 'Non existing text id!',
      });
    }
    if (!specificEntry) {
      return res.status(404).send({
        status: 404,
        message: 'Non existing text entry',
      });
    }
    if (specificEntry.userEmail !== authEmail) {
      return res.status(403).send({
        status: 403,
        message: 'You are not authorized to take this action!',
      });
    }
    return res.status(200).send({
      status: 200,
      message: 'Story is displayed successfully',
      data: specificEntry,
    });
  }

  // delete entry
  static deleteEntry = (req, res) => {
    const authEmail = emailDecrypt(req.header('authorization'));
    let { entryId } = req.params;
    if (isNaN(entryId)) {
      return res.status(400).send({
        status: 400,
        error: 'The entry id should be a number',
      });
    }
    const entryToBeDeleted = entries.find((entry) => entry.id === parseInt(entryId, 10));
    if (!entryToBeDeleted) {
      return res.status(404).send({
        status: 404,
        message: 'Non existing text entry',
      });
    }

    if (entryToBeDeleted.userEmail !== authEmail) {
      return res.status(403).send({
        status: 403,
        error: 'You are not authorized to take this action!',
      });
    }
    entries.splice(entries.indexOf(entryToBeDeleted), 1);
    return res.status(200).send({
      status: 200,
      message: 'Story has been deleted successfully!',
    });
  }
}

export default Controller4entry;
