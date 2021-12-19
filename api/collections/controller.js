const Photo = require("../../models/Photo");
const Collection = require("../../models/Collection");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  all: async (req, res) => {
    const collections = await Collection.find().populate("cover", "paths");
    res.json(collections);
  },
  find: async (req, res) => {
    let collection;
    if (ObjectId.isValid(req.params.id))
      collection = await Collection.findById(req.params.id).populate(
        "cover",
        "paths"
      );
    else
      collection = await Collection.findOne({ link: req.params.id }).populate(
        "cover",
        "paths"
      );
    const photos = await Photo.find({ collections: collection._id });
    collection = collection.toObject();
    collection.photos = photos;
    res.json(collection);
  },
  add: async (req, res) => {
    const collection = new Collection(req.body);
    await collection.save();
    res.sendStatus(201);
  },
  update: async (req, res) => {
    await Collection.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.sendStatus(200);
  },
  delete: async (req, res) => {
    await Collection.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  },
};
