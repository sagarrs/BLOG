const express = require("express")
const router = express.Router()

const {Story} = require("../models/story")
const {Tags} = require("../models/tags")
const {User} = require("../models/user")
const {authenticateUser} = require("../middlewares/authenticate")

router.get("/", authenticateUser, (req, res) => {
    Story.find({user: req.user._id})
        .then((story) => {
            res.status("200").send(story)
        })
        .catch((err) => {
            res.status("404").send(err)
        })
})

router.post("/", authenticateUser, (req, res) => {
    const body = req.body
    const story = new Story(body)
    // console.log(story)

    // this is refered from authentication middleware

    story.user = req.user._id

    story.save()
        .then((story) => {

            // storing story_id in Tags Schema
            let tagName = story.tagName.toString()
            Tags.update({
                tagName: tagName
            }, {
                $push: {
                    stories: story._id
                }
            }).exec(function(err, user){
                console.log("story id is added to the list of your Tags");
            })


            // storing stories id in User schema
            User.update({
                _id: req.user._id
            }, {
                $push: {
                    stories: story._id
                }
            }).exec(function(err, user){
                console.log("story id is added to the list of your users");
            })
            res.status("200").send(story)

        })
        .catch((err) => {
            res.status("404").send(err)
        })
})

router.get("/:id", authenticateUser, (req, res) => {
    const id = req.params.id

    Story.findOne({user: req.user._id, _id: id})
        // .populate('user')
        .then((story) => {
            if(story){
                res.status("200").send(story)   
            }else{
                res.send({})  
            }
        })
        .catch((err) => {
            res.status("404").send(err)
        })
})


router.delete("/:id", authenticateUser, (req, res) => {
    const id = req.params.id

    Story.findOneAndDelete({user: req.user._id, _id: id})
        .then((contact) => {
            res.status("200").send({notice: "story successfully deleted"})
        })
        .catch((err) => {
            res.status("404").send(err)
        })
})

router.put("/:id", authenticateUser, (req, res) => {
    const id = req.params.id
    const body = req.body

    Story.findOneAndUpdate({user: req.user._id, _id: id}, { $set : body}, { new: true, runValidators: true})
        .then((contact) => {
            res.status("200").send(contact)
        })
        .catch((err) => {
            res.status("404").send(err)
        })
})

module.exports = {
    storyRouter: router
}