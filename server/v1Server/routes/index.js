import express from 'express';
import signUpSchema from '../../middleware/userValidation.middleware';
import Controller4user from '../../controllers/userControllers';
import Controller4entry from '../../controllers/entryControllers';
import createEntrySchema from '../../middleware/entryValidation.middleware';
import authanticate from '../../middleware/userAuth.middleware';

const router = express.Router();


router.post('/auth/signup', signUpSchema, Controller4user.signUp);
router.post('/auth/signin', Controller4user.signIn);
router.post('/entries', authanticate, createEntrySchema, Controller4entry.createEntry);
router.patch('/entries/:entryId', authanticate, createEntrySchema, Controller4entry.editEntry);
router.get('/entries', authanticate, Controller4entry.getAllEntries);
router.get('/entries/:entryId', authanticate, Controller4entry.getSpecificEntry);
router.delete('/entries/:entryId', authanticate, Controller4entry.deleteEntry);

export default router;
