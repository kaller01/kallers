const mongoose = require("mongoose");

const PhotoSchema = mongoose.Schema({
  filename: String,
  title: String,
  description: String,
  paths: {
    original: String,
    preview: String,
    h400: String,
    w400: String,
    h1080: String,
    w1080: String,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "locations",
  },
  collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "collections",
    },
  ],
  date: Date,
  shutterspeed: String,
  aperture: String,
  width: Number,
  height: Number,
  lens: String,
  show: {
    type: Boolean,
    default: true,
  },
  prints: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("photos", PhotoSchema);
