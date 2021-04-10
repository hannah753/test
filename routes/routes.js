const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const tokenHandlerMiddleWare = require("../middleware/tokenHandler");

router.get("/", postController.getAllPosts);
router.get("/post:id", postController.getSinglePost);
router.get("/post/edit:id", postController.updatePost);

// router.get("/create", tokenHandlerMiddleWare(), postController.showCreate);
// router.post("/create", tokenHandlerMiddleWare(), postController.createPost);

router.get("/delete:id", postController.deletePost);

module.exports=router;

