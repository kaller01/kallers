const app = require('express')()
const controller = require("./PhotoController")

app.route("/").get(controller.getPhotos).post(controller.addPhoto);


//mongodb+srv://root:<password>@cluster0.00lht.mongodb.net/<dbname>?retryWrites=true&w=majority
module.exports = app