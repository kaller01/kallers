const Post = require("../../models/Post")
const Photo = require("../../models/Photo")
const Location = require("../../models/Location")
const ObjectId = require("mongoose").Types.ObjectId;

const findPhotoFilenames = async (content) => {
  const filenames = content.match(/!PHOTO\((.*)\)/g).map(photo => photo.match(/!PHOTO\((.*)\)/)[1])
  if(!filenames){
    return Promise.resolve([])
  }
  return (await Photo.find({ filename: { $in: filenames } })).map(x => x._id);
}

const findLocations = async (content) => {
  const timelines = content.match(/!TIMELINE\{(.*)\}/g).map(x => x.match(/!TIMELINE\{(.*)\}/)[1]);
  if(!timelines) {
    return Promise.resolve([])
  }
  const locations = timelines.map(x => x.split(",")[0]);
  return (await Location.find({ link: { $in: locations } })).map(x => x._id)
}

module.exports = {
  all: async (req, res) => {
    const posts = await Post.find().populate("cover","paths").sort("-date");
    res.json(posts);
  },
  find: async (req, res) => {
    let post;
    if (ObjectId.isValid(req.params.id))
      post = await Post.findById(req.params.id).populate("cover","paths").populate("photos","paths");
    else
      post = await Post.findOne({ link: req.params.id }).populate("cover","paths").populate("photos","paths");
    res.json(post);
  },
  add: async (req, res) => {
    if (req.body.content) {
      req.body.photos = await findPhotoFilenames(req.body.content);
      req.body.locations = await findLocations(req.body.content);
    }
    const post = new Post(req.body);
    post.markModified('contents');
    await post.save();
    res.sendStatus(201);
  },
  update: async (req, res) => {
    if (req.body.content) {
      req.body.photos = await findPhotoFilenames(req.body.content);
      req.body.locations = await findLocations(req.body.content);
    }
    await Post.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.sendStatus(200);
  },
  delete: async (req, res) => {
    await Post.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  },
};
