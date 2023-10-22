const { AsyncDatabase } = require("promised-sqlite3");
const fs = require('fs');

const path = './db.db';

const schema = {
  users:`CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  dob DATE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  token TEXT,
  about TEXT)`,

  post: `CREATE TABLE Post (
    postId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER not null,
    post_title TEXT,
    post_content TEXT not null,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    post_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    post_image BLOB,
    FOREIGN KEY(userId) REFERENCES User(userId))`,

  comment: `CREATE TABLE Comment (
    commentId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER not null,
    postId INTEGER not null,
    comment_content TEXT not null,
    comment_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(userId),
    FOREIGN KEY (postId) REFERENCES Post(postId))`,

  friend: `CREATE TABLE Friend (
    friendId INTEGER PRIMARY KEY AUTOINCREMENT,
    userOne INTEGER not null,
    userTwo INTEGER not null,
    status INTEGER not null,
    FOREIGN KEY (userTwo) REFERENCES User(userId),
    FOREIGN KEY (userOne) REFERENCES User(userId))`,

  message: `CREATE TABLE Message (
    messageId INTEGER PRIMARY KEY AUTOINCREMENT,
    friendId INTEGER not null,
    message_content TEXT not null,
    chat_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (friendId) REFERENCES Friend(friendId))` };

// This must be called exactly once 
async function open() {
  console.log("file exits",fs.existsSync(path));
  if(!fs.existsSync(path)){
    const db = await AsyncDatabase.open(path);


      await db.run(schema.users);
      await db.run(schema.post);
      await db.run(schema.comment);
      await db.run(schema.friend);
      await db.run(schema.message);
      console.log("database created successfully");
      return db;
    }

  else{
    const db = await AsyncDatabase.open(path);
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