const jwt = require('jsonwebtoken')
const crypto = require("crypto");

// Generate a secret key
const generateSecretKey = () => {
  const secret = crypto.randomBytes(32).toString("hex");
  return secret;
};

// Create a secret key
const secretKey = generateSecretKey();

const setCookie = (res, userId) => {
  try {
    // const token = jwt.sign({ userId }, secretKey, { expiresIn: '15s' }); ////Expiration du token pour 15 secondes
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '7d' });
    
    res.cookie('Authorization', 'Bearer ' + token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // maxAge: 15 * 1000, //Expiration du token pour 15 secondes
      path: '/'
    });

    return token;
  } catch (error) {
    console.error('Error signing JWT:', error);
    throw new Error('Could not create token');
  }
};

module.exports = { setCookie, secretKey }