import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
    {comments: {
        type: [String], // array of ids
        default: []}
    }
  );

// Schema into a model:
const CommentMessage = mongoose.model('CommentMessage', commentSchema);

export default CommentMessage;
