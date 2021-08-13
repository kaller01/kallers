const app = require("express")();
const auth = require("./controller");

app
  .route("/")
  .get(auth.add)
  .post(auth.add);

module.exports = app;
