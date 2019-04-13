const express = require("express")
const router = express.Router()

const {Story} = require("../models/story")
const {User} = require("../models/user")
const {authenticateUser} = require("../middlewares/authenticate")

router.get("/", (req, res) => {
    Story.find()
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
    
     console.log(req.user)

    story.user = req.user._id

    story.save()
        .then((story) => {
            console.log("story")
            console.log(story)

            // storing stories id in user schema
            User.update({
                _id: req.user._id
            }, {
                $push: {
                    stories: story._id
                }
            }).exec(function(err, user){
                console.log("foo_bar is added to the list of your followers");
            })
            res.status("200").send(story)
        })
        .catch((err) => {
            console.log("err")
            console.log(err)
            res.status("404").send(err)
        })
})

router.get("/:id", (req, res) => {
    const id = req.params.id

    Story.find({_id: id})
        // .populate('user')
        .then((story) => {
            res.status("200").send(story)
        })
        .catch((err) => {
            res.status("404").send(err)
        })
})


router.delete("/:id", (req, res) => {
    const id = req.params.id

    Story.findByIdAndDelete({_id: id})
        .then((contact) => {
            res.status("200").send({notice: "story successfully deleted"})
        })
        .catch((err) => {
            res.status("404").send(err)
        })
})

router.put("/:id", (req, res) => {
    const id = req.params.id
    const body = req.body

    Story.findByIdAndUpdate({_id: id}, { $set : body}, { new: true, runValidators: true})
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