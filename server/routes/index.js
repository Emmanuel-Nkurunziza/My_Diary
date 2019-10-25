import express from 'express';
import signUpSchema from '../middleware/userValidation.middleware';
import Controller4user from '../controllers/userControllers';


const router = express.Router();


router.post('/auth/signup', signUpSchema, Controller4user.signUp);


export default router;
