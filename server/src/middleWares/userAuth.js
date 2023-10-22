const bcrypt = require("bcrypt");
const user = require("../database/user");
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res) => {
  try {
    const data = req.body;
    const userDetails = { username, password, email, first_name, last_name, dob } = data;

    // check for unique username
    const checkUserName = await user.check(username);
    if(checkUserName){
      return res.status(409).json({
        message: `Username ${username} already exit.`});
    }

    // add user details into db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    userDetails.password = hashedPassword;
    await user.insert(userDetails);

    res.status(200).json({
      status: "success",
      message: "user saved successfully",
      data: {
        user: username,
      },
    });
    console.log(`success username: ${username}`);
  } 
  catch (e) {
    console.error("signup failure: ", e.message);
    res.status(500).json({
      status: "failure",
      message: e.message,
    });
  }
};

async function login(req, res) {
  try{
    const {username, password} = req.body;
    if(!username && !password){
      return res.status(400).json({message: "Either username or password not sent."})
    }

    const userData = await user.check(username);
    if(!userData){
      return res.status(401).json({ message: "user doesn't exist."});
    }

    const match = await bcrypt.compare(password, userData.password);
    if(!match){
      return res.status(401).json({ message: "password incorrect."});
    }

    const accessToken = generateToken.generateAccessToken(userData);
    const refreshToken = generateToken.generateRefreshToken(userData);
    await user.updateToken(userData.username, refreshToken);

    res.status(200).json({
      accessToken: accessToken, 
      refreshToken: refreshToken
    });
  }
  catch(e) {
    console.error("login failure: ",e.message);
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
} 

async function logout(req, res) {
  try {
    const { refreshToken } = req.body;
    console.log("refreshToken: ",refreshToken);
    if(!refreshToken) {
      return res.status(400).json({ message: "You didn't send refresh token."})
    }
    await user.removeToken(refreshToken);
    res.status(200).json({ message: "You logged out successfully."})
  }
  catch(e) {
    console.error("logout failure", e.message);
    res.status(500).json({
      status: "failure",
      message: e.message,
    });
  }
} 

// this adds req.user 
async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return res.status(403).json({ message: "You didn't send access token"});
  }

  try{
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
      if (err) {
        console.log("Invaild access token error: ", err);
        return res.status(403).json({ message: "Invalid access token"})
      }
      req.userData = userData;
      next();
    })
  }
  catch(e) {
    console.error("token verification error: ", e.message);
    res.status(500).json({ message: e.message});
  }
}

async function refresh(req, res) {
  const refreshToken = req.body.refreshToken;
  if(!refreshToken){
    return res.status(401).json({message: "You didn't send refresh token."});
  }

  try{
    const match = await user.checkToken(refreshToken);
    if(!match) return res.status(403).json({message: "Refresh token invalid"});

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userData) => {
      if(err){
        return res.status(403).json({ message: "Jwt verification refresh token invalid."})
      }
      const accessToken = generateToken.generateAccessToken(userData);
      res.status(200).json({ accessToken: accessToken});
    })
  }
  catch(e) {
    console.error("refresh the access token error: ", e.message);
    res.status(500).json({ message: e.message});
  }
}

module.exports = { signup, login, logout, authenticateUser, refresh };