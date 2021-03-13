const express = require('express')
const router = express.Router();
const app = express();
const fileUpload = require('express-fileupload')
const path = require("path")

app.use(fileUpload)

router.post("/", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No file upladed" })
    }

    const file = req.files.file

    file.mv(path.join(__dirname, `../../client/public/uploads/${file.name}`), err => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    })
})

module.exports = router;