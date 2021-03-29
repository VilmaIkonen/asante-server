import mongoose from 'mongoose';

// Mongoose schemas for making each post similar.
// SelectedFile: Convert image to string using base64
const postSchema = mongoose.Schema(
    {
      recipient: String,
      message: String,
      name: String,
      creator: String,
      selectedFile: String,
      url: String,
      likes: {
        type: [String], // array of ids
        default: []
      },
      createdAt: {
        type: Date,
        default: new Date()
      }
    }
  );

// Schema into a model:
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
