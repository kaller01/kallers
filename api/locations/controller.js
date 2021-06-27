const Location = require("../../models/Location");
const Photo = require("../../models/Photo");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  all: async (req, res) => {
    const locations = await Location.find().populate("cover", "paths");
    res.json(locations);
  },
  find: async (req, res) => {
    let location;
    if (ObjectId.isValid(req.params.id))
      location = await Location.findById(req.params.id);
    else location = await Location.findOne({ title: req.params.id });
    const photos = await Photo.find({ location: location._id });
    location = location.toObject();
    location.photos = photos;
    res.json(location);
  },
  add: async (req, res) => {
    const location = new Location(req.body);
    await location.save();
    res.sendStatus(201);
  },
  update: async (req, res) => {
    await Location.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.sendStatus(200);
  },
  delete: async (req, res) => {
    await Photo.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  }
};
