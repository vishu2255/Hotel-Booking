const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    roomNo :{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    maxcount: {
        type: Number,
        required: true
    },
    rentperhour: {
        type: Number,
        required: true
    },
    imageurls: [],
    currentbookings: [],
    type :{
        type: String,
        required: true
    }

},{
    timestamps: true,        //For created and updated properties
})

const roomModel = mongoose.model('rooms', roomSchema)

module.exports = roomModel