// Used in Likes and deletes, controlling if the user is logged in and can perform likes and delete.

import jwt from 'jsonwebtoken';

// similar to controllers, but has 'next' in addition:
const auth = async (req, res, next) => {
  try {
    // get token from frontend:
    const token = req.headers.authorization.split(' ')[1]; // token on the 1 position in array after split, take only that 
    const isCustomAuth = token.length <500; // 'own' token. Google auth length > 500

    // data from the token:
    let decodedData;

    // check user identity with jsonwebtoken:
    if(token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test') // data from token(username + id) // MOVE SECRET TO .ENV FILE!
      // decodedData --> identification which user is logged in/liking/deleting). Store identif data into req.userId
      req.userId = decodedData?.id;
    }
    // check user identity with Google oAuth token:
    else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; // sub = google's own name for id that differentiates users
    }
    
    next();
    
  } 
  catch (err) {
    console.log(err);  
  }
}

export default auth;