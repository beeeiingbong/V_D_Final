const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['Abbott', 'Pfizer'],
        required: true,
        unique: true
    },
    count: {
        type: Number,
        default: 0
    }
}, { collection: 'Manufacturer', timestamps: true });

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;