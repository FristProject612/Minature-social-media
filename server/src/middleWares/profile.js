const user = require('../database/user')

async function uploadAvtar(req, res) {
  if(!req.file){
    return res.status(401).json({ message: "avtar file not found."});
  }

  const filetype = req.file.mimetype;
  const filename = req.file.filename;

  if(filetype !== 'image/png' && filetype !== 'image/jpg' && filetype !== 'image/jpeg'){
    return res.status(400).json({ message: "Incorrect image file type"});
  }

  const userId = req.userData.id;
  await user.updateAvtar(userId, filename, filetype);
  res.status(200).json({ message: "Avtar added successfully" });
}

async function uploadAbout(req, res) {
  const about = req.body.about;
  if(!about) {
    return res.status(400).json({ message: "About not found"});
  }
  const userId = req.userData.id;
  await user.updateAbout(userId, about);

  res.status(200).json({ message: "About add successfully"});
}

async function viewUser(req, res) {
  const paramUsername = req.params.username;
  console.log("view username: ", paramUsername);

  if(!paramUsername) {
    return res.status(400).json({ message: "Username not found."});
  }

  const row = await user.check(paramUsername);

  if(!row) {
    return res.status(400).json({ message: `Username ${paramUsername} invalid`});
  }

  const userData = {
    username: row.username , 
    first_name: row.first_name, 
    last_name: row.last_name, 
    about: row.about, 
    created_at: row.created_at,
    image_exists: row.image_exists,
    image_path: row.image_path
  }; 

  res.status(200).json(userData);
}

async function viewUserById(req, res) {
  const userId = req.body.userId;

  console.log("view username: ", userId);

  if(!userId) {
    return res.status(400).json({ message: "userId not found."});
  }

  const row = await user.checkById(userId);

  if(!row) {
    return res.status(400).json({ message: `UserId: ${userId} invalid`});
  }

  const userData = {
    username: row.username , 
    first_name: row.first_name, 
    last_name: row.last_name, 
    image_exists: row.image_exists,
    image_path: row.image_path
  }; 

  res.status(200).json(userData);
}

module.exports = { uploadAvtar, uploadAbout, viewUser, viewUserById};