const express = require('express');
const router = express.Router();
const Vaccination = require('../models/Vaccination');
const BookingNumber = require('../models/BookingNumber');
// const ImmunisationId = require('../models/ImmunisationId');
const Manufacturer = require('../models/Manufacturer');
const BatchNumber = require('../models/BatchNumber');

// @route   GET /
// @desc    Render the main page
router.get('/', (req, res) => {
  res.render('index');
});

// @route   POST /register
// @desc    Register a new vaccination
router.post('/register', async (req, res) => {
  try {
    const newVaccination = new Vaccination(req.body);
    await newVaccination.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering vaccination', error });
  }
});

// @route   GET /records
// @desc    Get all vaccination records
router.get('/records', async (req, res) => {
  try {
    const records = await Vaccination.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error });
  }
});

// @route   GET /search
// @desc    Search for a record
router.get('/search', async (req, res) => {
  console.log('Search query:', req.query);
  console.log('Search query bookingNo:', req.query.bookingNo);
  console.log('Search query name:', req.query.name);
  try {
    const { bookingNo, name } = req.query;
    let query;
    if (bookingNo) {
      console.log("inside the bookingNo condition");
      query = { bookingNo: bookingNo.toString() }; // Ensure bookingNo is treated as a string
    } else if (name) {
      query = { name: new RegExp(name, 'i') }; // Case-insensitive search
    }
    else if (!bookingNo && !name) {
      return res.status(400).json({ message: 'Please provide a booking number or name to search' });
    }
    else {
      query = { bookingNo: bookingNo.toString(), name: new RegExp(name, 'i') }
    }
    console.log('Search query:', query);
    const record = await Vaccination.findOne(query);
    if (record) {
      console.log('Record found:', record);
      res.json(record);
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error searching for record', error });
  }
});


// @route   POST /details
// @desc    Save vaccination details
router.put('/details', async (req, res) => {
  try {
    const { bookingNo, ...details } = req.body;
    const updatedRecord = await Vaccination.findOneAndUpdate(
      { bookingNo: bookingNo },
      { $set: details }
    );
    if (updatedRecord) {
      res.json({ message: 'Details saved successfully!', record: updatedRecord });
    } else {
      res.status(404).json({ message: 'Record not found to update' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error saving details', error });
  }
});

router.put('/booking-number', async (req, res) => {
  try {
    const bookingNumber = await BookingNumber.findOneAndUpdate(
      {},
      { $inc: { bookingNumber: 1 } });
    console.log('Updated booking number:', bookingNumber);
    res.json({ bookingNumber: bookingNumber.bookingNumber });
  } catch (error) {
    res.status(500).json({ message: 'Error generating booking number', error });
  }
});

router.get('/booking-number', async (req, res) => {
  try {
    const bookingNumber = await BookingNumber.findOne();
    if (bookingNumber) {
      res.json({ bookingNumber: bookingNumber.bookingNumber });
    } else {
      res.status(404).json({ message: 'Booking number not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking number', error });
  }
});

router.get('/manufacturers/:name', async (req, res) => {
  try {
    const { name } = req.params;
    console.log("name", name)
    const manufacturers = await Manufacturer.findOne({ name: name });
    res.json(manufacturers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching manufacturers', error });
  }
});

router.put('/manufacturers/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const manufacturer = await Manufacturer.findOneAndUpdate(
      { name: name },
      { $inc: { count: 1 } }
    );
    if (manufacturer) {
      res.json(manufacturer);
    } else {
      res.status(404).json({ message: 'Manufacturer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating manufacturer', error });
  }
});

router.post('/batch-number', async (req, res) => {
  try {
    const { batchNumber } = req.body;
    const newBatchNumber = new BatchNumber({ batchNumber });
    await newBatchNumber.save();
    res.status(201).json({ message: 'Batch number created successfully!', batchNumber: newBatchNumber });
  } catch (error) {
    res.status(400).json({ message: 'Error creating batch number', error });
  }
});

router.get('/batch-number/:batchNo', async (req, res) => {
  const { batchNo } = req.params;
  try {
    const batchNumbers = await BatchNumber.findOne({ batchNumber: batchNo });
    res.json(batchNumbers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching batch numbers', error });
  }
});

module.exports = router;