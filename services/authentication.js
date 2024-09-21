const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function createTockenForUser(user) {
  const payload = {
    _id: user._id,
    username : user.username,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, SECRET_KEY);
  return payload;
}

module.exports = { createTockenForUser, validateToken };
