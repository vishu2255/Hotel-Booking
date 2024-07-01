import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Divider, Space, Tag } from 'antd';
import moment from 'moment';

const { TabPane } = Tabs;
function BookingDetails() {
    return (
        <div className='ml-3 mt-3'>
            <Tabs
                defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <AllBookings />
                </TabPane>
            </Tabs>

        </div>
    )
}

export default BookingDetails;


export function AllBookings() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const sortRooms = (data) => {
        return data.sort(function (a, b) {
            if (a.fromdate < b.fromdate) {
                return -1;
            }
            if (a.fromdate > b.fromdate) {
                return 1;
            }
            if(a.todate < b.todate){
                return -1;
            }
            if(a.todate > b.todate){
                return 1;
            }
            return 0;
        })
    }

    useEffect(() => {
        async function fetchData() {

            try {
                setLoading(true)
                const {data} = (await axios.post('/api/bookings/getbookingsby'))
                const newData = sortRooms(data)
                console.log(data)
                setBookings(newData)
                setLoading(false)

            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(error)
            }
        }
        fetchData()

    }, [])

    async function cancelBooking(bookingid, roomid) {

        try {
            setLoading(true)
            const result = (await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })).data
            console.log(result)
            setLoading(false)
            Swal.fire('Success', 'Your booking has been cancelled', 'success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire('Oops..', 'Something went wrong', error)
        }

        

    }
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {loading && (<h1>Loading...</h1>)}
                    {bookings && (bookings.map(booking => {
                        return <div className='bs'>
                            <h1><b>{booking.room}</b></h1>
                            <h3>Booking Id: {booking._id}</h3>
                            <h3><b>Room Number:</b> {booking.roomNo}</h3>
                            <h3><b>Email:</b> {booking.emailid}</h3>
                            <h3><b>CheckIn:</b> {booking.fromdate}</h3>
                            <h3><b>CheckOut:</b> {booking.todate}</h3>
                            {booking.status !== 'cancelled' &&(<h3><b>Due Amount:</b> {booking.totalamount}</h3>)}
                            {booking.status === 'cancelled' &&(<h3><b>Refund Amount:</b> {booking.totalamount/2}</h3>)}
                            <h3><b>Status:</b> {booking.status === 'cancelled' ? (<Tag color="red">CANCELLED</Tag>):(<Tag color="green">CONFIRMED</Tag>)}</h3>

                            {booking.status !== 'cancelled' && (<div className="text-right">
                                <button class='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.roomid) }}>CANCEL BOOKING</button>
                            </div>)}
                        </div>
                    }))}

                </div>
            </div>
        </div>
    )
}

