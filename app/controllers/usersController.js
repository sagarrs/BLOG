const express = require("express")
const router = express.Router()

const {User} = require("../models/user")
const {Story} = require("../models/story")
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


// bookmark private route
router.post("/bookmark/register", authenticateUser, (req, res) => {
    const body = req.body

    console.log("---------this is users controller bookmark private route -----------")

    console.log(req.user._id)
    console.log(req.body.bookmarks)

    User.update({
        _id: req.user._id
    }, {
        $push: {
            bookmarks: req.body.bookmarks
        }
    }).exec(function(err, user){
        console.log("story id is added to the list of your users");
    })
})

// follower - following private route
router.post("/follow/register", authenticateUser, (req, res) => {
    const body = req.body

    console.log("---------this is users controller follow private route -----------")

    console.log(req.user._id)
    console.log(req.body.following)

    User.update({
        _id: req.user._id // updates user who follows
        // _id: req.body.following // updates user who gets followed bu abv user
    }, {
        $push: {
            following: req.body.following
            // followers: req.user._id
        }
    }).exec(function(err, user){
        console.log("useer id is added to the list of your following");
    })


    User.update({
        _id: req.body.following
    }, {
        $push: {
            followers: req.user._id
        }
    }).exec(function(err, user){
        console.log("story id is added to the list of your users");
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