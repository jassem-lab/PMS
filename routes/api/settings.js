const express = require('express')
const router = express.Router();

const Settings = require('../../models/Settings')

router.get("/", (req, res) => {
    Settings.find({}, (err, data) => {
        if (err) res.send("something went wrong");
        res.json(data)
    })
})

router.post("/", (req, res) => {
    const settings = new Settings({
        portUserName: req.body.portUserName,
        portName: req.body.portName,
        portAbout: req.body.portfolioAbout,
        githubLink: req.body.githubLink,
        linkedinLink: req.body.linkedinLink,
        isSetup: true
    })
    settings.save()
})

router.put("/edit/:id", (req, res) => {
    Settings.findByIdAndUpdate({ _id: req.params.id },
        {
            portUserName: req.body.portUserName,
            portName: req.body.portName,
            portAbout: req.body.portAbout,
            githubLink: req.body.githubLink,
            linkedinLink: req.body.linkedinLink,
            isSetup: true,
        },
        (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.send(data)
            }
        }
    )
})

module.exports = router