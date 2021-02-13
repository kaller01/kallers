const mongoose = require("mongoose");

const PhotoSchema = mongoose.Schema({
    filename: String,
    title: String,
    description: String,
    tags: [
        String
    ],
    paths: {
        original: String,
        preview: String,
        h400: String,
        w400: String,
        h1080: String,
        w1080: String
    },
    date: Date,
    shutterspeed: String,
    aperture: String,
    width: Number,
    height: Number,
    lens: String
})

module.exports = mongoose.model("photos", PhotoSchema)