const express = require("express")
const router = express.Router()

const {User} = require("../models/user")

router.post("/register", (req, res) => {
    const body = req.body

    const user = new User(body)

    user.save()
        .then((user) => {
            res.status("404").send(user)
        })
        .catch((err) => {
            res.status("401").send(err)
        })
})

router.post("/login", (req, res) => {
    const body = req.body

    User.findByCredentials(body.email, body.password)
        .then((user) => {
            res.status("200").send(user)
        })
        .catch((err) => {
            res.status("404").send(err)
        })
})

module.exports = {
    userRouter: router
}