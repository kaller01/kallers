const app = require('express')()
const controller = require("./PhotoController")
const multer = require("multer");
const upload = multer();


app.route("/").get(controller.getPhotos).post(upload.single('photo'), controller.addPhoto);
app.route("/:filename").delete(controller.deletePhoto)


module.exports = app