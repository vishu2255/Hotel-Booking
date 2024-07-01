import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Room from '../components/Room';
import moment from 'moment'
import { DatePicker } from 'antd';

function Home() {

  const [rooms, setrooms] = useState([])
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const { RangePicker } = DatePicker;

  const [checkIn, setCheckIn] = useState()
  const [checkOut, setCheckOut] = useState()
  const [duplicaterooms, setduplicaterooms] = useState([])

  const [searchkey, setSearchKey] = useState('')
  const [type, setType] = useState('all')
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = (await axios.get('/api/rooms/getallrooms')).data   //getting all the rooms from the server

        setrooms(data)
        setduplicaterooms(data)
        setLoading(false)

      } catch (error) {
        setError(true)
        console.log(error)
        setLoading(false)
      }
    }
    fetchData();

  }, [])

  function filterByDate(dates) {

    setCheckIn((dates[0]).format('DD-MM-YYYY'))
    setCheckOut((dates[1]).format('DD-MM-YYYY'))

    var tempRooms = []
    var availability = false
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            (!moment(moment((dates[0]).format('DD-MM-YYYY'))).isBetween(
              booking.fromdate,
              booking.todate
            ))
            &&
            !moment(moment((dates[1]).format("DD-MM-YYYY"))).isBetween(
              booking.fromdate,
              booking.todate
            ) && (!moment(moment((dates[0]).format('DD-MM-YYYY'))).isSame(
              booking.fromdate,
              booking.todate
            )) && (!moment(moment((dates[1]).format("DD-MM-YYYY"))).isSame(
              booking.fromdate,
              booking.todate
            ))) {
            if (
              moment((dates[0]).format('DD-MM-YYYY')) !== booking.fromdate &&
              moment((dates[0]).format('DD-MM-YYYY')) !== booking.todate &&
              moment((dates[1]).format('DD-MM-YYYY')) !== booking.fromdate &&
              moment((dates[1]).format('DD-MM-YYYY')) !== booking.todate
            ) {
              availability = true;
            }

          }

        }
      }
      if (availability === true || room.currentbookings.length === 0) {
        tempRooms.push(room)
      }
      setrooms(tempRooms)
    }
  }

  function filterBySearch() {
    const tempRooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(tempRooms)
  }

  function filterByType(e) {

    setType(e)
    if (e!== 'all') {
      const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() == e.toLowerCase())
      setrooms(temprooms)
    }
    else {
      setrooms(duplicaterooms)
    }
  }

  return (
    <div className='container'>
      <div className="row mt-5 bs" >
        <div className="col-md-3">
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input type="text" className="form-control" placeholder="search rooms"
            value={searchkey} onChange={(e) => { setSearchKey(e.target.value) }} onKeyUp={filterBySearch} />

        </div>

        <div className="col-md-3">
          <select className='form-control' value={type} onChange={(e) => { filterByType(e.target.value) }}>
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="Premium">Premium</option>
            <option value="Regular">Regular</option>
          </select>
        </div> 


      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (<h1>Loading...</h1>)
          : (
            rooms.map((room) => {
              return <div className="col-md-9 mt-2">
                <Room room={room} fromdate={checkIn} todate={checkOut} />
              </div>
            })
          )}
      </div>
    </div>
  )
}

export default Home