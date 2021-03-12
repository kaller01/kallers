const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
  title: String,
  description: String,
  cover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "photos"
  }
});

module.exports = mongoose.model("locations", LocationSchema);
