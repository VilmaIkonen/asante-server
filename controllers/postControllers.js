// All the handlers for the routes
// Extract logic from the route functions (in posts.js) here, to keep posts.js simple and readable

import mongoose from 'mongoose';
import PostMessage from '../models/postSchema.js'

// Getting all posts currently in db
export const getPosts =  async (req, res) => {
  try {
    const postMessages = await PostMessage.find(); 
    res.status(200).json(postMessages);
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()}); // set creator automatically based on login
  try {
    await newPost.save();
    res.status(201).json(newPost);
  }
  catch (err) {
    res.status(409).json({ message: err.message });
  }
}

// Get post from route eg. /post/123
// rename id to _id
// Update logic handled on client side on Form.js
export const updatePost = async (req, res) => {
  const {id} = req.params;
  const {recipient, message, selectedFile, url, likes} = req.body

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post found with id ${id}.`)
  };

  const updatedPost = { recipient, message, selectedFile, url, likes, _id: id}

  await PostMessage.findByIdAndUpdate(id, updatePost, {new: true}); // spread old post and add the id property
  res.json(updatedPost);
}

// Like
export const likePost = async (req, res) => {
  const {id} = req.params;

  // controlling if user is authenticated:
  if(!req.userId) {
    return res.json({message: 'Unauthenticated'}); // likePost has access to auth and req.userId as auth is called before likePost postRoutes.js
  } 

  // check if post exists and get it:
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post found with id ${id}.`);
  }
  
  const post = await PostMessage.findById(id);

  // check if user's id is already in the like section --> prevent multiple likes (loop through all likes):
  const index = post.likes.findIndex((id) => id === String(req.userId));
  // if users id is not in likes, index =-1
  if(index === -1) {
    // like:
    post.likes.push(req.userId);
  } 
  else {
    // dislike:
    post.likes = post.likes.filter((id) => id !== String(req.userId)) // returns array of all likes except current person's like
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
  res.status(200).json(updatedPost);
}

// Delete post
export const deletePost = async (req, res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post found with id ${id}.`);
  await PostMessage.findByIdAndRemove(id);
  res.json({message: 'Post deleted succesfully'})
}

