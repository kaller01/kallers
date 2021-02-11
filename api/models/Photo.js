const mongoose = require("mongoose");

const PhotoSchema = mongoose.Schema({
    filename: String,
    paths: {
        original: String,
        preview: String,
        h400: String,
        w400: String,
        h1080: String,
        w1080: String
    }
})

module.exports = mongoose.model("photos", PhotoSchema)