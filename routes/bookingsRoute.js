const express = require('express')
const router = express.Router();
const Booking = require("../models/booking")
const Room = require("../models/room")
const moment = require('moment')

router.post('/bookroom', async (req, res) => {
    const {
        room,
        emailid,
        fromdate,
        todate,
        totalamount,
        totalhours
    } = req.body;

    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            roomNo: room.roomNo,
            emailid,
            fromdate: fromdate,
            todate: todate,
            totalamount,
            totalhours
        })

        const booking = await newbooking.save()
        const roomtemp = await Room.findOne({ _id: room._id })
        roomtemp.currentbookings.push({
            bookingid: booking._id,
            roomNo: room.roomNo,
            fromdate: fromdate,
            todate: todate,
            emailid: emailid,
            status: booking.status
        })

        await roomtemp.save()

        res.send("Room Booked Successfully")
    } catch (error) {
        return res.status(400).json({ error })
    }
});

router.post("/getbookingsby", async(req, res) =>{
    
    try{
        const bookings = await Booking.find({})
        res.send(bookings)
    } catch(error){
        return res.status(400).json({error})
    }
});

router.post("/cancelbooking", async(req, res) =>{
    const {bookingid, roomid} = await req.body

    try {
        const bookingItem = await Booking.findOne({_id : bookingid})
        bookingItem.status = 'cancelled'
        await bookingItem.save()

        const room = await Room.findOne({_id : roomid})
        
        const bookings = room.currentbookings

        const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)
        room.currentbookings = temp

        await room.save()

        res.send("The booking has been cancelled")
    } catch (error) {
        return res.status(400).json({error})
    }
})

module.exports = router;