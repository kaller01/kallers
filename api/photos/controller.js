const Photo = require("../../models/Photo");
const keys = require("../../config/secret-keys");
const FormData = require("form-data");
const fetch = require("node-fetch");
const ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");

module.exports = {
  all: async (req, res) => {
    const photos = await Photo.find().populate("location","title").populate("collections","title").sort("-date");
    res.json(photos);
  },
  add: async (req, res) => {
    const form = new FormData();
    form.append("Authorization", keys.photohost.token);
    form.append("fileToUpload", req.file.buffer, req.file.originalname);
    fetch(keys.photohost.host, {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        res.json(data);
        const photo = new Photo(data);
        photo.save();
      });
  },
  masonry: async (req, res) => {
    const photos = await Photo.find({ show: { $ne: false } }).sort("-date");

    const sizes = [1, 3, 4, 6];
    const result = [];
    sizes.forEach((n) => {
      const heightMap = [];
      const masonry = [];
      for (let i = 0; i < n; i++) {
        heightMap[i] = 0;
        masonry[i] = [];
      }
      photos.forEach((photo) => {
        let i = heightMap.indexOf(Math.min(...heightMap));
        heightMap[i] += photo.height / photo.width;
        masonry[i].push(photo);
      });
      result.push(masonry);
    });

    res.json(result);
  },
  find: async (req, res) => {

    filter = {}

    if (req.query.collection) {
      filter.collections = req.query.collection;
    }
    if (req.query.location) {
      filter.location = req.query.location;
    }
    console.log(filter)

    let photo = await Photo.findOne({ ...{ filename: req.params.id }, ...filter })
      .populate({
        path: "location",
        populate: { path: "cover", select: "paths" },
      })
      .populate({
        path: "collections",
        populate: { path: "cover", select: "paths" },
      });
    if (photo) {

      filter.show = { $ne: false };
      filter.filename = { $ne: photo.filename }

      // Finds photo which has a date less than current file.
      // https://stackoverflow.com/questions/9153329/how-to-fetch-next-and-previous-item-of-the-current-one-with-mongoose
      let next = await Photo.findOne({ ...{ date: { $lt: photo.date } }, ...filter }).sort({
        date: -1,
      });
      // Finds photo which has a date grater than current photo.
      let prev = await Photo.findOne({ ...{ date: { $gt: photo.date } }, ...filter }).sort({
        date: 1,
      });
      photo = photo.toObject();
      //If next/prev isn't found, loop around.
      if (!next) next = await Photo.findOne(filter).sort({ date: 1 });
      photo.next = next.filename;
      if (!prev) prev = await Photo.findOne(filter).sort({ date: -1 });
      photo.prev = prev.filename;

      res.json(photo);
    } else {
      res.sendStatus(404)
    }

  },
  update: async (req, res) => {
    await Photo.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.sendStatus(200);
  },
  delete: async (req, res) => {
    await Photo.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  },
};
