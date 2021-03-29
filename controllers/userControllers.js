// for securing passwords:
import bcrypt from 'bcryptjs'
// for safe storage of user data in the browser for a defined time period:
import jwt from 'jsonwebtoken'
import userSchema from '../models/userSchema.js';
import User from '../models/userSchema.js';

export const signin = async(req, res) => {
  // getting email and password from frontend:
  const {email, password} = req.body;

  try {
    // check if from db, based on email, if user already exists:
    const existingUser = await userSchema.findOne({email});
    if(!existingUser) res.status(404).json({message: 'User does not exist.'});
    
    // compare (hashed pswd) if password input equals to one in db made by the user on signup: 
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect) return res.status(400).json({message: 'Invalid credentials'});

    // if the user exists and password is correct, get the jsonwebtoken (jwt will be send to frontend). jwt.sign() --> data that will be stored in token
    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '1h'}); // MOVE SECRET STRING TO .ENV FILE (here only as 'test')    
    
    // return user and token and send result
    res.status(200).json({result: existingUser, token})   
  } 
  catch (err) {
    // if token creation did not succeed:
    res.status(500).json({message: 'Something went wrong.'});
    
  }
}

export const signup = async(req, res) => {
  const {email, password, firstname, lastname} = req.body;

  try {
    // first need to check if user already exists in db
    const existingUser = await userSchema.findOne({email});
    if(existingUser) return res.status(400).json({message: 'User already exists.'});

    // if user does not exist already create one:
    // 1st: hash the pswd, hash and add salt of length 12:
    const hashedPassword = await bcrypt.hash(password, 12);
    // create user:
    const result = await User.create({email, password: hashedPassword, name: `${firstname} ${lastname}` });
    // create token:
    const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'});

    // return user and token and send result:
    res.status(201).json({result, token})
  }
  catch(err) {
    // if user creation did not succeed:
    res.status(500).json({message: 'Something went wrong.'});
  }
} 