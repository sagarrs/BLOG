const mongoose = require("mongoose")

const Schema = mongoose.Schema

const tagSchema = new Schema({
    tagName: {
        type: String
    },
    stories: [

    ]
})

const Tags = mongoose.model("Tags", tagSchema)

module.exports = {
    Tags
}