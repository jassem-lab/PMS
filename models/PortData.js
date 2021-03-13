const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    title:{
        type: String,
        default: "",
        require: true
    },
    image:{
        type: String,
        default: "",
        require: true
    },
    altTag: {
        type: String,
        default: "",
        require: true
    },
    description:{
        type: String,
        default: "",
        require: true
    },
    deployedLink:{
        type: String,
        default: "",
        require: true
    },
    repoLink:{
        type: String,
        default: "",
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model("portdata", PortfolioSchema, "portdata")