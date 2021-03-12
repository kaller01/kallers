const Location = require("../../models/Location");
const Photo = require("../../models/Photo");

module.exports = {
  all: async (req, res) => {
    const locations = await Location.find();
    res.json(locations);
  },
  find: async (req, res) => {
    let location = await Location.findById(req.params.id);
    const photos = await Photo.find({ location: req.params.id });
    location = location.toObject();
    location.photos = photos;
    res.json(location);
  },
  add: async (req, res) => {
    const location = new Location(req.body);
    await location.save();
    res.sendStatus(201);
  }
};
