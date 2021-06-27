const app = require("express")();
const collections = require("./controller");

app
  .route("/")
  .get(collections.all)
  .post(collections.add);

app
  .route("/:id")
  .get(collections.find)
  .patch(collections.update)
  .delete(collections.delete);

module.exports = app;
