const router = require("express").Router();
const multer = require("multer")
const { uploadPost, showUserPosts, removePost, getPost, likeDislike, showUserLikesPosts } = require('../middleWares/postController');
const { authenticateUser } = require('../middleWares/userAuth');


const uploads = multer({ dest: './uploads'});
router.post('/upload', authenticateUser, uploads.single('post'), uploadPost);

// show all posts by username
router.get('/username/:username', showUserPosts);
// delete specific post
router.delete('/delete/:postId', authenticateUser, removePost);
// get a specific post with postID
router.get('/postId/:postId', getPost);
// like-dislike a post 
router.post('/like', authenticateUser, likeDislike);
// show all posts like by user
router.get('/likedposts', authenticateUser, showUserLikesPosts);

module.exports = router;