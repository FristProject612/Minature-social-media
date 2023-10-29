const router = require("express").Router();
const { uploadComment, getLastComment, getAllComments } = require('../middleWares/commentController');
const { authenticateUser } = require('../middleWares/userAuth');

router.post('/upload', authenticateUser, uploadComment);
router.get('/last', getLastComment);
router.get('/all', getAllComments);

module.exports = router;