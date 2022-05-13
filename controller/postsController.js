const postModel = require("../models/postModel");

exports.getAllPosts = async (req, res) => {
    const data = await postModel.find({}).lean().sort("-dateCreated");
    res.render("index", {
        posts: data
    });

    // postModel.find({}).lean()
    //     // execute query
    //     .exec(function (error, body) {          
    //         res.render("index", { posts: body });
    //     });
};

exports.getPost = async (req, res) => {
    const post = await postModel.findById(req.params.id).lean();    
    res.render("post", {
        post
    });
};

exports.createPost = async (req, res) => {
    await postModel.create(req.body);
    res.redirect("/");
};

exports.updatePost = async (req, res) => {
    const post = await postModel.findOne({ _id: req.params.id });
    post.title = req.body.title;
    post.userName = req.body.userName;
    post.detail = req.body.detail;
    post.dateUpdated = Date.now;
    post.save();
    res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
    await postModel.findByIdAndRemove(req.params.id);
    res.redirect("/");
};
