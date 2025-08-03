const mongoose = require('mongoose');

const immunisationIdSchema = new mongoose.Schema({
    ImmuId: {
        type: String,
        required: true,
        unique: true
    }
}, { collection: 'ImmunisationId', timestamps: true });

const ImmunisationId = mongoose.model('ImmunisationId', immunisationIdSchema);

module.exports = ImmunisationId;