const Post = require("../models/postModel");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort("-dateCreated");
  res.render("index", {
    posts,
  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post,
  });
};

exports.createPost = async (req, res) => {
    console.log("req");
    console.log(req);
    console.log("res");
    console.log(res);
    
  await Post.create(req.body);
  res.redirect("/index");
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();
  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect("/");
};
