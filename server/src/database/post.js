const { connectDb } = require('./connectDb');
const fs = require('fs');

async function addPost(postData) {
  const db = await connectDb();
  const {userId, postTitle, postContent, fileName, fileType} = postData;
  
  const query = `insert into post(userId, post_title, post_content)
                 values(?, ?, ?)`
  
  const table = await db.run(query, [userId, postTitle, postContent]);
  const postId = table.lastID;
  await db.close()
  
  if(fileName && fileType){
      const imageData = {
          userId: userId,
          postId: postId,
          fileName: fileName,
          fileType: fileType
      }
      
      await addPostImage(imageData);
  }
  return {postId: postId};
}

async function addPostImage(imageData) {
  const {fileName, fileType, userId, postId} = imageData;
  const dir = `./public/images/${userId}/posts`;
  const image_extension = fileType.split('/').pop();
  
  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }

  const source = `./uploads/${fileName}`;
  const destination = `${dir}/${postId}.${image_extension}`;

  fs.rename(source, destination, (err) => {
    if(err) {
      console.error("Error! Unable to transfer post picture: ", err.message);
    }
    else {
      console.log("Post picture transferred successfully.");
    }
  
  });

  // database update
  const db = await connectDb();
  const image_exists = 1;
  const image_path = destination.split('/').splice(2).join('/');
  const query = `update post
                 set image_exists = ?,
                 image_path = ?
                 where postId = ?`;
  await db.run(query, [image_exists, image_path, postId]);
  await db.close();
}

async function getUserPosts(userId) {
  const db = await connectDb();
  const query = `select * 
                 from post
                 where userId = ?`;

  const userPosts = await db.all(query, [userId]);
  

  await db.close();
  return userPosts;
}

async function deletePost (userId, postId) {
  await deletePostImage(userId, postId);
  const db = await connectDb();
  const query = `delete from post
                 where userId = ? and postId = ?`;
  await db.run(query, [userId, postId]);
  await db.close();
} 

async function deletePostImage(userId, postId) {
  const db = await connectDb();
  query = `select image_exists, image_path
           from post
           where userId = ? and postId = ?`;

  const row = await db.get(query, [userId, postId]);
  const image_exists = row && row.image_exists;
  const image_path = row && row.image_path;
  await db.close();
  
  const filePath = './public/' + image_path;

  if(image_exists){
    fs.unlink(filePath, (err) => {
      if(err){
        console.error("Error in deletePostImage: ", err.message);
      }
    });
  }
}

async function checkPost(postId) {
  const db = await connectDb();
  const query = `select postId, userId, post_title, post_content, likes, comments, post.image_exists as image_exists, post.image_path as image_path, post_time, username, users.image_exists as avtar_exists, users.image_path as avtar_path
                 from post inner join users on post.userId = users.id
                 where postId = ?`;
  const row = await db.get(query, [postId]);
  await db.close();
  return row;
}

async function getAllPosts() {
  const db = await connectDb();
  const query = `select postId, userId, post_title, post_content, likes, comments, post.image_exists as image_exists, post.image_path as image_path, post_time, username, users.image_exists as avtar_exists, users.image_path as avtar_path
                 from post inner join users on post.userId = users.id 
                 order by postId desc`;

  const rows = await db.all(query);
  await db.close();

  return rows;
}



module.exports = { addPost, getUserPosts, deletePost, checkPost, getAllPosts };