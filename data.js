// Example: Insert sample documents into BookingNumber and Manufacturer models

const mongoose = require('mongoose');
const BookingNumber = require('./models/BookingNumber');
const Manufacturer = require('./models/Manufacturer');

async function insertSamples() {
    await mongoose.connect('mongodb+srv://Vaccination_anik:vaccinationDrive1234@anik.lgrmwz6.mongodb.net/VaccinationDrive');

    // Insert sample BookingNumber
    const booking = await BookingNumber.create({ bookingNumber: 1 });
    console.log('Inserted BookingNumber:', booking);

    // Insert sample Manufacturers
    const manufacturers = await Manufacturer.insertMany([
        { name: 'Abbott', count: 0 },
        { name: 'Pfizer', count: 0 }
    ]);
    console.log('Inserted Manufacturers:', manufacturers);

    await mongoose.disconnect();
}   

insertSamples().catch(console.error);