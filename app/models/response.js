const mongoose = require("mongoose")

const Schema = mongoose.Schema

const responseSchema = new Schema({
    user: {

    },
    body: {

    },
    createdAt: {
        type: Date
    }
})

const Response = mongoose.model("Response", responseSchema)

module.exports = {
    Response
}