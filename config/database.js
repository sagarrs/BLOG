const mongoose = require("mongoose")

mongoose.Promise = global.Promise

const CONNECTION_URI = "mongodb://localhost:27017/blog"

mongoose.connect(CONNECTION_URI, {useNewUrlParser: true})
    .then(() => {
        console.log("connected to DB")
    })
    .catch(() => {
        console.log("something went wrong")
    })

module.exports = {
    mongoose
}