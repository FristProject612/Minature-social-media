const { connectDb } = require('./connectDb');

async function checkLike(userId, postId) {
  const db = await connectDb();
  const query = `select * 
                 from likes
                 where userId = ? and postId = ?`;
  const row = db.get(query, [userId, postId]);
  db.close();
  return row;
}

async function likePost(userId, postId) {
  const db = await connectDb();
  const insertLike = `insert into likes(userId, postId)
                      values(?, ?)`;
  const incrementLikes = `update post
                          set likes = likes + 1`;

  await db.run(insertLike, [userId, postId]);
  await db.run(incrementLikes);
  db.close();
}

async function unlikePost(userId, postId) {
  const db = await connectDb();
  const deleteLike = `delete from likes
                 where userId = ? and postId = ?`;
  const decrementLikes = `update post
                          set likes = likes - 1
                          where postId = ?`;

  await db.run(deleteLike, [userId, postId]);
  await db.run(decrementLikes, [postId]);
}

// returns all posts liked by userId
async function userLikedPosts(userId) {
  const db = await connectDb();
  const query = `select *
                 from post 
                 where postId in (select postId
                 from likes
                 where userId = ?)`;
  const rows = await db.all(query, [userId]);

  return (rows.length === 0)? null : rows;
}

module.exports = { checkLike, likePost, unlikePost, userLikedPosts}