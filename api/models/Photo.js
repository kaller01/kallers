const mongoose = require("mongoose");

const PhotoSchema = mongoose.Schema({
    filename: String
})

module.exports = mongoose.model("photos", PhotoSchema)