import express from 'express';
import Users from '../controllers/userControllers';
import signUpSchema from '../middleware/userValidation.middleware';
import Entries from '../controllers/entryControllers';
import auth from '../middleware/userAuth.middleware';
import createEntrySchema from '../middleware/entryValidation.middleware';
// data.createData();
console.log(process.env.NODE_ENV);

const router = express.Router();
router.post('/api/v2/auth/signup', signUpSchema, Users.signUp);
router.post('/api/v2/auth/signin', Users.signIn);
router.post('/api/v2/entries', auth, Entries.create);
router.patch('/api/v2/entries/:entryId', auth, createEntrySchema.modifyEntry, Entries.modify);
router.get('/api/v2/entries', auth, Entries.viewAllEntries);
router.get('/api/v2/entries/:entryId', auth, createEntrySchema.deleteEntry, Entries.viewSingleEntry);
router.delete('/api/v2/entries/:entryId', auth, createEntrySchema.deleteEntry, Entries.DeleteEntry);

router.all('*', (req, res) => {
  res.status(400).json({
    status: 400,
    massage: 'wrong request',
  });
});

export default router;
