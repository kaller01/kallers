const Photo = require("../models/Photo");
const keys = require("../config/secret-keys");
const FormData = require("form-data");
const fetch = require("node-fetch");

module.exports = {
  getPhotos: async (req, res) => {
    const photos = await Photo.find().sort("-date");
    res.json(photos);
  },
  addPhoto: async (req, res) => {
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
        // data.date = new Date(data.date);

        const photo = new Photo(data);
        photo.save();
      });
  },
  updatePhoto: async (req, res) => {
    await Photo.findOneAndUpdate({_id: req.params.id}, req.body);
    res.sendStatus(200)
  },
  deletePhoto: async (req,res) => {
    await Photo.deleteOne({_id: req.params.id});
    res.sendStatus(200)
  }
};
