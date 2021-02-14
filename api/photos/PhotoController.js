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
  editPhoto: async (req, res) => {
    
  },
  deletePhoto: async (req,res) => {
    await Photo.deleteOne({filename: req.params.filename});
    res.json({filename: req.params.filename});
  }
};
