const Post = require("../../models/Post")
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  all: async (req, res) => {
    const posts = await Post.find().sort("-date");
    res.json(posts);
  },
  find: async (req, res) => {
    let post;
    if (ObjectId.isValid(req.params.id))
      post = await Post.findById(req.params.id);
    else
      post = await Collection.findOne({ link: req.params.id });
    res.json(post);
  },
  add: async (req, res) => {
    const post = new Post(req.body);
    post.markModified('contents');
    await post.save();
    res.sendStatus(201);
  },
  update: async (req, res) => {
    await Post.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.sendStatus(200);
  },
  delete: async (req, res) => {
    await Post.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  },
};
