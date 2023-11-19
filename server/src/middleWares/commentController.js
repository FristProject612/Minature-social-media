const comment = require('../database/comments');
const { checkPost } = require('../database/post');

async function postExists(postId) {
  const row = await checkPost(postId);
  return row;
}

async function uploadComment(req, res) {
  const userId = req.userData.id;
  console.log("uploadComment body: ", req.body);
  const {postId, commentContent} = req.body;

  if(!postId || !commentContent) {
    return res.status(400).json({ message: "Either postId, or commentContent not send"});
  }

  const postExist = await postExists(postId);
  
  if(!postExist) {
    return res.status(400).json({ message: `post with postId ${postId} doesn't exists.`});
  }

  const commentData = {
    userId: userId,
    postId: postId,
    commentContent: commentContent
  };

  const commentId = await comment.addComment(commentData);
  res.status(200).json({ commentId: commentId, message: "comment added successfully."});
}

async function getLastComment(req, res) {
  const postId = req.body.postId;
  console.log("lastComment body: ", req.body);

  if(!postId) {
    return res.status(400).json({ message: "postId not provided"});
  }

  const postExist = postExists(postId);
  if(!postExist) {
    return res.status(400).json({ message: `post with postId ${postId} doesn't exists.`});
  }

  const row = await comment.showLastComment(postId);

  if(!row) {
    return res.status(200).josn({message: `There are no comment of postId: ${postId}`});
  }
  res.status(200).json(row);
}

async function getAllComments(req, res) {
  const postId = req.query.postId;
  console.log("getAllComment body: ", req.body);

  if(!postId) {
    return res.status(400).json({ message: "postId not provided"});
  }
  
  const postExist = postExists(postId);
  if(!postExist) {
    return res.status(400).json({ message: `post with postId ${postId} doesn't exists.`});
  }

  const rows = await comment.showAllComments(postId);
  res.status(200).json(rows); 
}

module.exports = { uploadComment, getLastComment, getAllComments };