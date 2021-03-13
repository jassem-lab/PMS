const mongoose = require('mongoose')

const SettingsSchema = new mongoose.Schema({
    portUserName: {
        type: String,
        default: "",
        require: true
    },
    portName: {
        type: String,
        default: "",
        require: true
    },
    portAbout: {
        type: String,
        default: "",
        require: true,
    },
    githubLink: {
        type: String,
        default: "",
        require: true
    },
    linkedinLink: {
        type: String,
        default: "",
        require: true
    },
    isSetup: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("settings", SettingsSchema, "settings")