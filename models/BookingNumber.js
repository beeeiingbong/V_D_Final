const mongoose = require('mongoose');

const bookingNumberSchema = new mongoose.Schema({
    bookingNumber: {
        type: Number,
        required: true,
        unique: true,
        default: 1 // 001 as a number is 1, formatting is handled in the UI
    },
},{timestamps: true,collection: 'BookingNumber'});

const BookingNumber = mongoose.model('BookingNumber', bookingNumberSchema);

module.exports = BookingNumber;