const app = require("express")();
const photos = require("./controller");
const auth = require("../auth/controller")
const multer = require("multer");
const upload = multer();

app
  .route("/")
  .get(photos.all)
  .post(auth.verify, upload.single("photo"),photos.add);
app
  .route("/:id")
  .get(photos.find)
  .delete(auth.verify,photos.delete)
  .patch(auth.verify,photos.update);

module.exports = app;
