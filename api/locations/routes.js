const app = require("express")();
const locations = require("./controller");
const auth = require("../auth/controller")

app
  .route("/")
  .get(locations.all)
  .post(auth.verify,locations.add);

app
  .route("/:id")
  .get(locations.find)
  .patch(auth.verify,locations.update)
  .delete(auth.verify,locations.delete);

module.exports = app;
