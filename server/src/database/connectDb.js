const { AsyncDatabase } = require("promised-sqlite3");
const fs = require('fs');

const path = './db.db';

const schema = {
  users: `CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    dob DATE NOT NULL,
    image_exists INTEGER DEFAULT 0,
    image_path TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    token TEXT,
    about TEXT)`,

  post: `CREATE TABLE post (
    postId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER not null,
    post_title TEXT,
    post_content TEXT not null,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    post_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    image_exists INTEGER DEFAULT 0,
    image_path TEXT,
    FOREIGN KEY(userId) REFERENCES users(id))`,

  comment: `CREATE TABLE comment (
    commentId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER not null,
    postId INTEGER not null,
    comment_content TEXT not null,
    comment_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES post(postId))`,

  friend: `CREATE TABLE friend (
    friendId INTEGER PRIMARY KEY AUTOINCREMENT,
    req_sender INTEGER not null,
    req_receiver INTEGER not null,
    status INTEGER not null,
    FOREIGN KEY (req_sender) REFERENCES users(id),
    FOREIGN KEY (req_receiver) REFERENCES users(id))`,

  message: `CREATE TABLE message (
    messageId INTEGER PRIMARY KEY AUTOINCREMENT,
    friendId INTEGER not null,
    message_sender INTEGER not null,
    message_content TEXT not null,
    chat_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (friendId) REFERENCES friend(friendId),
    FOREIGN KEY (message_sender) REFERENCES users(id))`,
  
  likes: `CREATE TABLE likes (
    userId INTEGER not null,
    postId INTEGER not null,
    likedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES post(postId),
    CONSTRAINT likes_pk PRIMARY KEY(userId, postId))`
};

async function open() {
  console.log("file exists",fs.existsSync(path));
  if(!fs.existsSync(path)){
    const db = await AsyncDatabase.open(path);

      await db.exec(`PRAGMA foreign_keys = ON;`);
      await db.run(schema.users);
      await db.run(schema.post);
      await db.run(schema.comment);
      await db.run(schema.friend);
      await db.run(schema.message);
      await db.run(schema.likes);
      console.log("database created successfully");
      return db;
    }

  else{
    const db = await AsyncDatabase.open(path);
    // every time connection closes, the fk check turns off
    await db.exec(`PRAGMA foreign_keys = ON;`);
    console.log("database connected successfully");
    return db;
  }
}

// this is irrelevant
async function connectDb() {
  const db = await open();
  return db;
}

module.exports = { connectDb };