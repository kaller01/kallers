const app = require("express")();
const locations = require("./controller");

app
  .route("/")
  .get(locations.all)
  .post(locations.add);

app
  .route("/:id")
  .get(locations.find)
  .patch(locations.update)
  .delete(locations.delete);

module.exports = app;
