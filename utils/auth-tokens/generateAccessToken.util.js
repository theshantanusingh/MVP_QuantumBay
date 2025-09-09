const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {

  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" } 
  );
};

module.exports = generateAccessToken;