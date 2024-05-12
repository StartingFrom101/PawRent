const mongoose = require('mongoose');

const bookingSchema =new mongoose.Schema({
    place: {type: mongoose.Schema.Types.ObjectId, required: true},
    placeTitle: String,
    owner: {type: mongoose.Schema.Types.ObjectId, required: true},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    name: String,
    phone: String,
    price: Number,
})

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel