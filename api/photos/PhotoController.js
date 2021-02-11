const Photo = require("../models/Photo");
const keys = require("../config/secret-keys");
const FormData = require("form-data");
const fetch = require("node-fetch");

module.exports = {
  getPhotos: async (req, res) => {
    const photos = await Photo.find();
    res.json(photos);
  },
  addPhoto: async (req, res) => {
    let photo;
    const form = new FormData();
    form.append("Authorization", keys.photohost.token);
    form.append("fileToUpload", req.file.buffer, req.file.originalname);
    fetch(keys.photohost.host, {
      method: "POST",
      body: form
    }).then(res => res.json())
    .then(data => {
        photo = new Photo(data);
        photo.save();
        res.json(data)
    });
  }
};
