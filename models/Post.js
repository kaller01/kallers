const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
  title: String,
  link: String,
  date: Date,
  contents: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model("posts", LocationSchema);
