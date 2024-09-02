const router = require("express").Router();
const PostController = require("../controller/PostController");

router
  //create Post
  .post("/create", PostController.actionPost)
  //Get All Post
  .get("/get", PostController.getPosts)
  //Vote Post
  .put("/vote/", PostController.votePost)
  //delete Post
  .delete("/delete/:id", PostController.deletePost);

module.exports = router;
