const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(userData) {
  const userIdentity = {
    id: userData.id,
    username: userData.username
  }
  const token = jwt.sign(userIdentity, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'});
  return token;
}

function generateRefreshToken(userData) {
  const userIdentity = {
    id: userData.id,
    username: userData.username
  }
  const token = jwt.sign(userIdentity, process.env.REFRESH_TOKEN_SECRET);
  return token;
}

module.exports = {generateAccessToken, generateRefreshToken};