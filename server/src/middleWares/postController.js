const post = require('../database/post');
const like = require('../database/likes');
const { check }= require('../database/user')

async function uploadPost(req, res) {

  const {postTitle, postContent} = req.body;
  console.log("req.body: ", req.body);
  const userId = req.userData.id;
  const fileName= req.file && req.file.filename;
  const fileType = req.file && req.file.mimetype;

  if(!postContent) {
    return res.status(400).json({ message: "postContent not found" });
  }

  if(fileType && fileType !== 'image/png' && fileType !== 'image/jpg' && fileType !== 'image/jpeg') {
    return res.status(400).json({ message: "Incorrect post image type"});
  }

  try{
    const postData = {
      userId: userId,
      postTitle: postTitle || null,
      postContent: postContent,
      fileName: fileName || null,
      fileType: fileType || null
    }

    const index = await post.addPost(postData);
    res.status(201).json(index);
  }
  catch(e) {
    console.error("Error in postController.uploadPost: ", e.message);
    res.status(500).json({ message: e.message });
  }
}

// path /:username/
async function showUserPosts(req, res) {
  const username = req.params.username;
  console.log("url params: ", req.params);
  if(!username) {
    return res.status(400).json({ message: "username not found"});
  }
  
  try{
    const userData = await check(username);

    if(!userData) {
      return res.status(400).json({ message: "username incorrect."});
    }

    const userId = userData.id;
    const userPosts = await post.getUserPosts(userId) 
    res.status(200).json(userPosts);
  }
  catch(e) {
    console.error("Error at postController.showUserPosts: ", e.message);
    res.status(500).json({ message: e.message});
  }
}

async function removePost(req, res) {
  const userId = req.userData.id;
  const postId = Number(req.params.postId);
  console.log("remove post res.params: ", req.params);

  try {
    if(!postId) {
      return res.status(400).json({message: "postId not present."});
    }

    await post.deletePost(userId, postId);
    res.status(200).json({message: "Post is deleted if you are owner of the post"});
  }
  catch(e) {
    console.error("error in postController.removePost: ", e.message);
    return res.status(500).json({message: e.error});
  }
}

async function getPost(req, res) {
  const postId = Number(req.params.postId);
  console.log("postId", postId);
  console.log("get post res.params: ", req.params);

  if(!postId) {
      return res.status(400).json({message: "postId not present."});
  }

  try {
    const row = await post.checkPost(postId);
    if(!row) {
      return res.status(404).json({ message: `The required postId ${postId} don't exist.`});
    }

    res.status(200).json(row);
  }
  catch(e) {
    console.error("error from postController.getPost: ", e.message);
    res.status(500).json({ message: e.message});
  }
}

async function showAllPosts(req, res) {
  const userId = req.userData.id;
  const rows = await post.getAllPosts(userId);

  if(!rows){
    return res.status(200).json({ message: "No post in database."});
  }

  res.status(200).json(rows)
}

async function likeDislike(req, res) {
  const userId = req.userData.id;
  const postId = req.body.postId;

  if(!postId) {
    return res.status(400).json({ message: "Post id to like on not provided"});
  }

  try {
    const row = await like.checkLike(userId, postId);
    console.log(row);
    if(!row){
      await like.likePost(userId, postId);
      return res.status(200).json({ message: `postId: ${postId} is liked by userId ${userId}` });
    }

    await like.unlikePost(userId, postId);
    res.status(200).json({ message: `postId: ${postId} now not liked by userId: ${userId}`});
  }
  catch(e) {
    console.error("Error in postController.likeDislike: ", e.message);
    res.status(500).json({ message: e.message});
  }
}

async function showUserLikesPosts(req, res) {
  const userId = req.userData.id;

  try {
    const rows = await like.userLikedPosts(userId);

    if(!rows) {
      return res.status(200).json({ message: `No post liked by userId ${userId}`});
    }

    res.status(200).json(rows);
  }
  catch(e) {
    console.error("Error in postcontroller.showUserLikesPosts: ", e.message);
    res.status(500).json({message: e.message});
  }

}

module.exports = { uploadPost, showUserPosts, removePost, getPost, likeDislike, showUserLikesPosts, showAllPosts};