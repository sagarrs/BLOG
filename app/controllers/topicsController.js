const express = require("express")
const router = express.Router()

const {Topic} = require("../models/topic")

router.get("/", (req, res) => {
    Topic.find()
        .then((topic) => {
            res.send(topic)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post("/", (req, res) => {
    const body = req.body
    const topic = new Topic(body)
    
    topic.save()
        .then((topic) => {
            res.send(topic)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get("/:id", (req, res) => {
    const id = req.params.id

    Topic.findById({_id: id})
        .then((topic) => {
            res.send(topic)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id

    Topic.findByIdAndDelete({_id: id})
        .then((topic) => {
            res.send({notice: "you have successfully deleted a topic"})
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put("/:id", (req, res) => {
    const id = req.params.id
    const body = req.body

    Topic.findByIdAndUpdate({_id: id}, { $set : body}, { new: true, runValidators: true})
        .then((topic) => {
            res.send(topic)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    topicRouter: router
}