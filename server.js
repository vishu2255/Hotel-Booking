const express = require("express");

const app = express();

const dbConfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const bookingsRoute = require('./routes/bookingsRoute')
app.use(express.json());
app.use('/api/rooms', roomsRoute)
app.use('/api/bookings', bookingsRoute)
const port = process.env.PORT || 8800;

app.listen(port, () => console.log(`Server running on port ${port}`));