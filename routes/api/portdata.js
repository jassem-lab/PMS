const express = require('express');
const router = express.Router();

const PortData = require('../../models/PortData')

router.get("/", (req, res) => {
    PortData.find({}, (err, data) => {
        if (err) {
            res.send("something went wrong");
        } else {
            res.json(data)
        }
    })
})

router.get("/:id", (req, res) => {
    PortData.findById(req.params.id, (err, data) => {
        if (err) {
            res.send("something went wrong")
        } else {
            res.json(data)
        }
    })
})

router.post("/new", (req, res) => {
    const newPortData = new PortData({
        title: req.body.title,
        image: req.body.imageName,
        altTag: req.body.altTag,
        description: req.body.description,
        deployedLink: req.body.deployedLink,
        repoLink: req.body.repoLink
    })
    newPortData.save()
})

router.put("/edit/:id", (req, res) => {
    PortData.findByIdAndUpdate({ _id: req.params.id },
        {
            title: req.body.title,
            image: req.body.imageName,
            altTag: req.body.altTag,
            description: req.body.description,
            deployedLink: req.body.deployedLink,
            repoLink: req.body.repoLink
        },
        (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data)
            }
        }
    )
})

router.delete('/delete/:id', (req, res) => {
    PortData.findByIdAndDelete({ _id: req.params.id }, err => {
        if (err) {
            res.send("Error Deleting Project")
        } else {
            res.send("Project Deleted")
        }
    })
})

module.exports = router