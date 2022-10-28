const express = require('express');
const router = express.Router();
const auth = require("../utils/auth")
const multer = require("multer")
const upload = multer()

const postController = require('../controllers/postController');

router.get('/', postController.readPost);
router.post('/',upload.single("file"), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch("/like-post/:id", postController.likePost)
router.patch("/unlike-post/:id", postController.unlikePost)

//Comment
router.patch("/comment-post/:id", postController.commentPost)
router.patch("/edit-post/:id", postController.editCommentPost)
router.patch("/delete-comment-post/:id", postController.deleteCommentPost)



module.exports = router
 
