const app = require("express")();
const collections = require("./controller");
const auth = require("../auth/controller")

app
  .route("/")
  .get(collections.all)
  .post(auth.verify,collections.add);

app
  .route("/:id")
  .get(collections.find)
  .patch(auth.verify,collections.update)
  .delete(auth.verify,collections.delete);

module.exports = app;
