import express from 'express';
import Users from '../../controllers/challenge3/userControllers3';

const router = express.Router();
router.post('/api/v2/auth/signup', Users.Create);
export default router;
