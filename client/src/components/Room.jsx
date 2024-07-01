import React from 'react'
import { Modal, Button, Carousel } from 'react-bootstrap'
import { useState } from 'react';
import {Link} from 'react-router-dom'

function Room({ room , fromdate, todate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className='image' />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <h3>{room.description}</h3>
        <p><b>Room Number: </b>{room.roomNo}</p>
        <p><b>Max Count : </b> {room.maxcount}</p>
        <p><b>Type : </b>{room.type}</p>

        <div style={{ float: 'right' }}>

          {(fromdate && todate)&&(
            <Link to ={`/book/${room._id}/${fromdate}/${todate}`}>
            <button className="btn btn-primary">Book Now</button>
            </Link>
          )}
          
        </div>
      </div>
      <div style={{ float: 'left' }}>
        <button className="btn btn-primary" onClick={handleShow}>Peek Rooms</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map(url=>{
              return <Carousel.Item>
              <img
                className="d-block w-100"
                src={url}
              />
            </Carousel.Item>
            })}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Room