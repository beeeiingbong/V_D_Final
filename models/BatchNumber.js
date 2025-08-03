const mongoose = require('mongoose');

const batchNumberSchema = new mongoose.Schema({
    batchNumber: {
        type: String,
        required: true,
        unique: true
    }
}, { collection: 'BatchType', timestamps: true });

const BatchNumber = mongoose.model('BatchNumber', batchNumberSchema);

module.exports = BatchNumber;