const { connectDb } = require("./connectDb");
const fs = require('fs')

async function insert(user) {
  const row = {username, password, email, first_name, last_name, dob} = user;
  const db = await connectDb();
  console.log("insert() db: ", db);
  console.log(db);
  const query = "insert into users (username, password, email, first_name, last_name, dob) values(?, ?, ?, ?, ?, ?)";
  await db.run(query, ...Object.values(row));
  await db.close()
}

// can make it global
async function show() {
  const db = await connectDb();
  const query = `select * from users`;
  const rows = await db.all(query);
  await db.close();
  return rows; 
}

async  function checkById(userId) {
  const db = await connectDb();
  const query = `select *
                from users 
                where id = ?`;

  const row = await db.get(query, [userId]);
  await db.close();
  return row;
}

// can make it 
async function check(username) {
  const db = await connectDb();
  const query = `select *
                from users 
                where username = ?`;

  const row = await db.get(query, [username]);
  await db.close();
  return row;
}

async function updateAbout(userId, about) {
  const db = await connectDb();
  const query = `update users
                 set about = ?
                 where id = ?`;
  await db.run(query, [about, userId]);
  await db.close()
}

async function updateToken(username, token) {
  const db = await connectDb();
  const query = `update users
                 set token = ?
                 where username = ?`;
  await db.run(query, [token, username]);
  await db.close()
}

async function removeToken(token) {
  const db = await connectDb();
  const query = `update users
                 set token = NULL
                 where token = ?`;
  await db.run(query, [token]);
  await db.close();
}

async function checkToken(token) {
  const db = await connectDb();
  const query = `select token 
                 from users
                 where token = ?`
  const row = await db.get(query, [token]);
  await db.close();
  return (row)? true: false;
}

async function updateAvtar(userId, fileName, filetype) {
  const dir = `./public/images/${userId}`;
  const image_extension = filetype.split('/').pop();
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true});
  }

  const source = `./uploads/${fileName}`;
  const destination = `${dir}/${userId}.${image_extension}`;

  fs.rename(source, destination, (err) => {
    if(err){
      console.error("Unable to transfer profile picture: ", err.message);
    }
    else{
      console.log("profile pic transfered successfully.");
    }
  });

  // database side work
  const db = await connectDb();
  const image_exists = 1;
  const image_path = destination.split('/').splice(2).join('/');

  const query = `update users
                 set image_exists = ?,
                 image_path = ?
                 where id = ?`;
  
  await db.run(query, [image_exists, image_path, userId]);
  db.close();
}

module.exports = { insert, show, checkById, check, updateAbout, updateToken, removeToken, checkToken, updateAvtar }