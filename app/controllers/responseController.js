const express = require("express")
const router = express.Router()
const {Response} = require("../models/response")
const {Story} = require("../models/story")
const {authenticateUser} = require("../middlewares/authenticate")

// CRUD routes

router.get("/", (req, res) => {
    Response.find()
        .then((response) => {
            res.status("200").send(response)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.post("/", authenticateUser, (req, res) => {

    const response = new Response({
        user: req.user._id,
        body: req.body.data
    })

    console.log("--------this is response controller---------------")
    console.log(req.user._id)
    console.log(req.body.data)

    response.save()
        .then((response) => {
            res.status("200").send(response)
        })
        .catch((err) => {
            res.status("401").send(err)
        })
})

// router.post("/", (req, res) => {
//     res.send("hi")
//     Story.findById(user.id // from auth user)
// })

module.exports = {
    responseRouter : router
}

// router.post to story here directly no need of moodels