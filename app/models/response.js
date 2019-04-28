const mongoose = require("mongoose")

const Schema = mongoose.Schema

const responseSchema = new Schema({
    user: {
        type: String
    },
    body: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Response = mongoose.model("Response", responseSchema)

module.exports = {
    Response
}