const { connectDb } = require('./connectDb');

async function addComment(commentData) {
  const {userId, postId, commentContent} = commentData;
  const db = await connectDb();

  const insertComment = `insert into comment(userId, postId, comment_content)
                         values(?, ?, ?)`;
  const incrementComments = `update post
                             set comments = comments + 1
                             where postId = ?`;
  
  await db.run(insertComment, [userId, postId, commentContent]);
  await db.run(incrementComments, [postId]);
  await db.close()
}

async function showLastComment(postId) {
  const db = await connectDb();
  const query = `select userId, username, image_exists as avtar_exists, image_path as avtar_path, first_name, last_name, postId, commentId, comment_content, comment_time
                 from comment inner join users on comment.userId = users.id
                 where postId = ? 
                 order by commentId desc
                 limit 1`;

  const row = await db.get(query, [postId]);
  await db.close();
  return row;
}

async function showAllComments(postId) {
  const db = await connectDb();
  const query = `select userId, username, image_exists as avtar_exists, image_path as avtar_path, first_name, last_name , postId, commentId, comment_content, comment_time
                 from comment inner join users on comment.userId = users.id
                 where postId = ?
                 order by commentId desc`;

  const rows = await db.all(query, [postId]);
  await db.close();

  return (rows.length === 0) ? null : rows;
}

module.exports = { addComment, showLastComment, showAllComments};