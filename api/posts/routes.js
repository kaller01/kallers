const app = require("express")();
const posts = require("./controller");
const auth = require("../auth/controller")

app
  .route("/")
  .get(posts.all)
  .post(auth.verify, posts.add);

app
  .route("/:id")
  .get(posts.find)
  .patch(auth.verify, posts.update)
  .delete(auth.verify, posts.delete);

module.exports = app;
