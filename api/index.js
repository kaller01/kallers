const bodyParser = require("body-parser");
const app = require("express")();
const cors = require("cors");
const photosRoute = require("./photos/routes");
const locationsRoute = require("./locations/routes");
const collectionsRoute = require("./collections/routes")
const authRoute = require("./auth/routes")
const morgan = require("morgan");
require("../config/mongoose-setup");

app.use(morgan());
app.use(cors());
app.use(bodyParser.json());
app.all("/getJSON", (req, res) => {
  res.json({ data: "data" });
});

app.use("/photos", photosRoute);
app.use("/locations", locationsRoute);
app.use("/collections", collectionsRoute);
app.use("/auth", authRoute)

module.exports = app;
