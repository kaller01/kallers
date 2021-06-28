const app = require("express")();
const photos = require("./controller");
const multer = require("multer");
const upload = multer();

app
  .route("/")
  .get(photos.all)
  .post(upload.single("photo"), photos.add);
app
  .route("/:id")
  .get(photos.find)
  .delete(photos.delete)
  .patch(photos.update);

module.exports = app;
