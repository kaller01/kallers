const Photo = require("../models/Photo");

module.exports = {
    getPhotos: async (req,res) => {
        const photos = await Photo.find();
        res.json(photos);
    },
    addPhoto: async (req,res) => {
        const photo = new Photo(req.body);
        console.log(req.body)
        await photo.save();

        res.sendStatus(201);
    }
}