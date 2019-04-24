const express = require("express")
const router = express.Router()

const {User} = require("../models/user")
const {authenticateUser} = require("../middlewares/authenticate")

router.get("/", (req, res) => {
    User.find()
        .then((user) => {
            res.status("200").send(user)
        })
        .catch((err) => {
            res.status("404").send(err)
        })
})

router.get("/:id", (req, res) => {
    const id = req.params.id

    User.find({_id: id})
        .then((user) => {
            res.status("200").send(user)
        })
        .catch((err) => {
            res.status("404").send(err)
        })
})

router.post("/register", (req, res) => {
    const body = req.body

    const user = new User(body)
    user.save()
        .then((user) => {
            res.status("200").send(user)
        })
        .catch((err) => {
            res.status("401").send(err)
        })
})

router.post("/login", (req, res) => {
    const body = req.body

    User.findByCredentials(body.email, body.password)
        .then((user) => {
            // once we know that the email, pwd are correct we need to generate token
            // return is here coz to avoid nested promises
            return user.generateToken()
        })
        .then((token) => {
            // res.send(token)
            //  res.setHeader("x-auth", token).send({})
             res.send({token})
        })
        .catch((err) => {
            res.status("404").send(err)
        })
})

router.get("/account", authenticateUser, (req, res) => {
    const user = req.user
    res.status("200").send(user)
})

// logout functionality
router.delete("/logout", authenticateUser, (req, res) => {
    const {user, token} = req

    User.findByIdAndUpdate(user._id, {$pull: {tokens: {token: token}}})
        .then(() => {
            res.send({notice: "successfully loggedout"})
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    userRouter: router
}