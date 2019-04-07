const express = require("express")
const router = express.Router()

const {Story} = require("../models/story")
const {User} = require("../models/user")

router.get("/", (req, res) => {
    Story.find()
        .then((story) => {
            res.status("200").send(story)
        })
        .catch((err) => {
            res.status("404").send(err)
        })
})

router.post("/", (req, res) => {
    const body = req.body
    const story = new Story(body)

    console.log(story)

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