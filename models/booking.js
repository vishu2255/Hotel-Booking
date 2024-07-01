const mongoose = require ("mongoose")

const bookingSchema = mongoose.Schema({
    room: {
        type: String, required: true
    },
    roomid: {
        type: String, required: true
    },
    roomNo: {
        type: Number, required: true
    },

    emailid: {
        type: String, required: true
    },
    fromdate:{
        type: String, required: true
    },
    todate:{
        type: String, required: true
    },
    totalamount: {
        type: Number, required: true
    },
    totalhours: {
        type: Number, required: true
    },
    status: {
        type: String, required: true, default: 'booked'
    }

},{
    timestamps: true
})

const bookingModel = mongoose.model('bookings', bookingSchema)

module.exports = bookingModel