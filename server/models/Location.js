const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
  title: String,
  link: String,
  description: String,
  cover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "photos",
  },
  rating: Number,
  album: String,
  youtube: [String],
});

module.exports = mongoose.model("locations", LocationSchema);
