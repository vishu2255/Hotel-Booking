const mongoose = require("mongoose");

var mongoURL = "mongodb+srv://Kinjal:n4tjQOKPDS9oZbRs@roombook.oevriuy.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURL , {useUnifiedTopology: true, useNewUrlParser: true})

var connection = mongoose.connection

connection.on('error', ()=>{
    console.log('Mongo DB connection failed')
})

connection.on('connected', ()=>{
    console.log('Mongo DB connection successful')
})

module.exports = mongoose