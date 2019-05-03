const mongoose = require("mongoose")
const {responseSchema} = require("../models/response")
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
        ref: 'User'
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
    topicName: {
        type: String
    },
    tagName: [

    ],
    responses: [responseSchema],
    claps: [
        {
            user:{
                type: String
            },
            count: {
                type: String,
                maxlength: 5
            }
        }
    ]
})

// storySchema.post("save", function(next){
//     const story = this
    
//     console.log("this is post save")
//     console.log(story._id)

//     User.update({
//         _id: story.user
//     }, {
//         $push: {
//             stories: story._id
//         }
//     }).exec(function(err, user){
//         console.log("stories added");
//     })

// })

const Story = mongoose.model("Story", storySchema)

module.exports = {
    Story
}