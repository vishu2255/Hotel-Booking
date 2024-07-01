import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import "../"
import moment from 'moment';
import Swal from 'sweetalert2'

function Booking() {
    const { roomid } = useParams();
    const { fromdate} = useParams();
    const { todate} = useParams();

    const fromDay = moment(fromdate , 'DD-MM-YYYY')
    const toDay = moment(todate, 'DD-MM-YYYY')
    const totalDays = moment.duration(toDay.diff(fromDay)).asDays();
    const totalHours = totalDays*24;


    const [room, setroom] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [totalAmount, setTotalAmount] = useState()

    const [data, setData] = useState({
        email: ""
      });


    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const data = (await axios.post('/api/rooms/getroombyid', { roomid: roomid })).data   //getting all the rooms from the server
                setTotalAmount(data.rentperhour*totalHours)
                setroom(data)
                setLoading(false)

            } catch (error) {
                setLoading(false)
                setError(true)
                console.log(error)
            }
        }
        fetchData();

    }, [])

    async function bookRoom(){
        const bookingDetails ={
            room,
            roomNo: room.roomNo,
            emailid: data.email,
            fromdate,
            todate,
            totalamount: totalAmount,
            totalhours: totalHours
             
        }
        try{
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)
            Swal.fire('Congratulations', 'Room Booked Successfully!', 'success').then(result=>{
                window.location.href = '/bookings'
            } )
        }
        catch(error){
            console.log(error)
            Swal.fire('Oops...', 'Something went wrong!', 'error')
        }
    }

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
      };

    return (
        <div className='m-5'>
            {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error</h1>) : (<div>

                <div className="row justify-content-center mt-5 bs">
                    <div className="col-md-6">
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg' />
                    </div>

                    <div className="col-md-6">
                        <div>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <div className='input_txt'>
                                    <p>Room Number :<b>{room.roomNo}</b> </p>
                                    <p>Email  : 
                                        <input 
                                        type="text" 
                                        id="form-control"
                                        name='email' 
                                        placeholder="Email"
                                        value={data.email}
                                        onChange={handleChange} 
                                        required/></p>
                                </div>

                                <p>From Date: {fromdate}</p>
                                <p>To Date: {todate}</p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>
                        </div>

                        <div>
                            <h1>Amount</h1>
                            <hr />
                            <p>Total hours : <b>{totalHours}</b></p>
                            <p>Rent per hour: <b>{room.rentperhour}</b></p>
                            <p>Total Amount: <b>{totalAmount}</b></p>
                        </div>

                        <div style={{ float: 'right' }}>
                            <button className='btn btn-primary' onClick={bookRoom}>Book Confirm</button>
                        </div>


                    </div>

                </div>

            </div>)}
        </div>

    )


}

export default Booking;