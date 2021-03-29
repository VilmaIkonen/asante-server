import express from 'express';

import { signin, signup } from '../controllers/userControllers.js'

const router = express.Router();

// Routes:
// send data from the form to backend, call signin/signup controller:
router.post('/signin', signin);
router.post('/signup', signup);

export default router;