const mongoose = require('mongoose');

const VaccinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  bookingNo: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  batchNo: String,
  vaccineManufacturer: String,
  vaccineName: String,
  vaccineVenue: String,
  nextDueDate: String,
  immunisationId: String
},{timestamps: true,collection: 'Vaccination'});

module.exports = mongoose.model('Vaccination', VaccinationSchema);