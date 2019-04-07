const express = require("express")
const router = express.Router()

const {Story} = require("../models/story")
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
    console.log(story)

    story.user = req.user._id

    story.save()
        .then((story) => {
            res.status("200").send(story)
        })
        .catch((err) => {
            res.status("404").send(err)
        })
})

module.exports = {
    storyRouter: router
}