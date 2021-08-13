const Photo = require("../../models/Photo");
const keys = require("../../config/secret-keys");
const FormData = require("form-data");
const fetch = require("node-fetch");
const ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose")

module.exports = {
  all: async (req, res) => {
    const photos = await Photo.find().sort("-date");
    res.json(photos);
  },
  add: async (req, res) => {
    const form = new FormData();
    form.append("Authorization", keys.photohost.token);
    form.append("fileToUpload", req.file.buffer, req.file.originalname);
    fetch(keys.photohost.host, {
      method: "POST",
      body: form
    })
      .then(res => res.json())
      .then(data => {
        res.json(data);
        const photo = new Photo(data);
        photo.save();
      });
  },
  find: async (req, res) => {
    let photo = await Photo.findOne({ filename: req.params.id }).populate({path : 'location',populate : {path : 'cover', select: "paths" }}).populate({path : 'collections',populate : {path : 'cover', select: "paths" }})
    // Finds photo which has a date less than current file.
    // https://stackoverflow.com/questions/9153329/how-to-fetch-next-and-previous-item-of-the-current-one-with-mongoose
    let next = await Photo.findOne({date: {$lt: photo.date}}).sort({date: -1});
    // Finds photo which has a date grater than current photo.
    let prev = await Photo.findOne({date: {$gt: photo.date}}).sort({date: 1});
    photo = photo.toObject()
    if(!next) next = await Photo.findOne().sort({date: 1})
    photo.next = next.filename
    if (!prev) prev = await Photo.findOne().sort({date: -1})
    photo.prev = prev.filename
    console.log(photo.prev,photo.filename,photo.next)
    res.json(photo);
  },
  update: async (req, res) => {
    await Photo.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.sendStatus(200);
  },
  delete: async (req, res) => {
    await Photo.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  }
};
