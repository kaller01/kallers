const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: String,
  link: String,
  date: Date,
  content: String,
  locations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "locations",
    },
  ],
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "photos",
    },
  ]
});

module.exports = mongoose.model("posts", PostSchema);
