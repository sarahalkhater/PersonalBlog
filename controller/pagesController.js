const Post = require('../models/postModel');

exports.getAboutPage = (req, res) => {
    res.render("about");
};

exports.getAddPage = (req, res) => {
    res.render("addPost");
};

exports.getEditPage = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('editPost', {
    post,
  });
};