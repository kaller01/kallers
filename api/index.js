const bodyParser = require("body-parser");
const app = require("express")();
const cors = require("cors");
const morgan = require("morgan");
require("../config/mongoose-setup");

app.use(morgan());
app.use(cors());
app.use(bodyParser.json());

app.use("/photos", require("./photos/routes"));
app.use("/locations", require("./locations/routes"));
app.use("/collections", require("./collections/routes"));
app.use("/posts", require("./posts/routes"))
app.use("/auth", require("./auth/routes"))

module.exports = app;
