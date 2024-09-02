const { model } = require("mongoose");
const Post = require("../models/PostModel");
const { makeTree } = require("../utils/makeTree");

exports.actionPost = async (req, res) => {
  try {
    const {
      id,
      title,
      content,
      categoryId,
      campaignId,
      parentId,
      posterId,
      num,
      file,
      vote,
      updateId,
    } = req.body;
    const post = await Post.findOne({ id: id, delete: false });
    if (
      (updateId && post && post._id != updateId) || // Equal Date Check
      (!updateId && post && post.delete)
    )
      return res.status(400).json({ message: "Already exist" });
    if (updateId) {
      const uPost = await Post.findByIdAndUpdate(updateId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!uPost)
        res.status(400).json({ message: `No post with id: ${updateId}` });
      else
        res.status(202).json({
          message: `Post with id: ${updateId} updated successfully.`,
          result: uPost,
        });
    } else {
      const nPost = new Post(req.body);
      await nPost.save((err) => {
        if (err) throw err;
        else
          res.status(201).json({
            message: "Create a new post successfully.",
            result: nPost,
          });
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { view } = req.query;
    let query = {};
    if (view !== "all") query.delete = false;
    const Posts = await Post.find(query).sort({ order: 1 });
    const result = makeTree(Posts);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.update({ _id: id }, { del: true });
    res.status(203).json({
      message: `Post with id: ${id} deleted successfully.`,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.votePost = async (req, res) => {
  try {
    const user = req.body.userId;
    console.log(user);
    // await PostModel.update({ _id: id }, { $push: { vote: user } });
    const post = await PostModel.findByIdAndUpdate(req.body.postId, {
      $set: {
        "vote.$.user": user,
      },
    });
    res.status(202).send({ message: "Vote successfully.", post: post });
  } catch (err) {
    res.status(500).send({ message: "error" });
  }
};
