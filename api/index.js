const bodyParser = require("body-parser");
const app = require("express")();
const photosRoute = require("./photos/routes");
const morgan = require("morgan");
require("./config/mongoose-setup");

app.use(morgan())
app.use(bodyParser.json());
app.all("/getJSON", (req, res) => {
  res.json({ data: "data" });
});

app.use("/photos", photosRoute);

module.exports = app;
