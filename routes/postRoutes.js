import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/postControllers.js'
import auth from '../middleware/authMiddleware.js'

const router = express.Router();

// Routes

// All routes in posts.js are reached via localhost:5000/posts, not localhost:5000/, as the prefix of posts is set in index.js to '/posts'
// All other routes, exept getAll, require authentication, ie use auth middleware
router.get('/', getPosts); 

router.post('/', auth, createPost);

// For modifying existing post:
router.patch('/:id', auth, updatePost);

// Like (similar to updating. Here the no. of likes is updated):
router.patch('/:id/likePost', auth, likePost); // as auth is called before likePost. likePost has access to auth and req.userId

// For deleting a post:
router.delete('/:id', auth, deletePost)


export default router;