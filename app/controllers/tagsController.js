const express = require("express")
const router = express.Router()
const {Tags} = require("../models/tags")

router.get("/", (req, res) => {
    Tags.find()
        .then((tag) => {
            res.send(tag)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post("/", (req, res) => {
    const body = req.body
    const tag = new Tags(body)

    tag.save()
        .then((tag) =>{
            console.log("---------this is tag controller ------")
            console.log(tag.tagName)
            res.send(tag)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get("/:id", (req, res) => {
    const id = req.params.id

    Tags.findById({_id: id})
        .then((tag) => {
            res.send(tag)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id

    Tags.findByIdAndDelete({_id: id})
        .then((tag) => {
            res.send({notice: "the tags are successfully deleted"})
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put("/:id", (req, res) => {
    const id = req.params.id
    const body = req.body

    Tags.findByIdAndUpdate({_id: id}, { $set : body}, { new: true, runValidators: true})
        .then((tag) => {
            res.send(tag)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    tagRouter: router
}