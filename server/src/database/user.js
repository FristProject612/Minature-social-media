const { connectDb } = require("./connectDb")

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

async function updateAbout(username, about) {
  const db = await connectDb();
  const query = `update users
                 set about = ?
                 where username = ?`;
  await db.run(query, [about, username]);
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
  return (row)? true: false;
}

module.exports = { insert, show, check, updateAbout, updateToken, removeToken, checkToken }