import express from 'express';

import { getComments, createPost, updatePost, deletePost, likePost, commentPost } from '../controllers/postControllers.js'
import auth from '../middleware/authMiddleware.js'

const router = express.Router();

// All other routes, exept getAll, require authentication, ie use auth middleware
router.get('/comments', getComments); 

router.patch('/:id/likePost', auth, likePost); // as auth is called before likePost. likePost has access to auth and req.userId


export default router;