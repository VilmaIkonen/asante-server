import CommentMessage from '../models/commentSchema.js'

// Getting all comments currently in db
export const getComments =  async (req, res) => {
  try {
    const commentMessages = await CommentMessage.find(); 
    res.status(200).json(commentMessages);
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const createComment = async (req, res) => {
  const comment = req.body;
  const newComment = new CommentMessage({comment});
  try {
    await newComment.save();
    res.status(201).json(newComment);
  }
  catch (err) {
    res.status(409).json({ message: err.message });
  }
}


