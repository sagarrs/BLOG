const mongoose = require("mongoose")

const Schema = mongoose.Schema

const storySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean
    },
    publishDate: {
        type: Date
    },
    previewImageUrl: {
        type: String
    },
    topic: {
        type: String
    },
    tags: [

    ],
    responses: [

    ],
    claps: [
        {
            user:{
                type: String
            },
            count: {
                maxlength: 5
            }
        }
    ]
})

const Story = mongoose.model("Story", storySchema)

module.exports = {
    Story
}