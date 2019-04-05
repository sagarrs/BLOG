const express = require("express")
const router = express.Router()
const {User} = require("../models/user")

// C.R.U.D Ops

// GET REQ ask n do

router.post("/users", (req, res) => {
    const body = req.body
    const user = new User(body)
    // console.log(user)

    user.save()
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