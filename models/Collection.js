const mongoose = require("mongoose");

const CollectionSchema = mongoose.Schema({
  title: String,
  description: String,
  cover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "photos"
  },
});

module.exports = mongoose.model("collections", CollectionSchema);
