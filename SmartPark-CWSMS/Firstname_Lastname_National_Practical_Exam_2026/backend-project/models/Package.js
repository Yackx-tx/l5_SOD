const mongoose = require('mongoose');

// Service Package schema definition
const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true,
        unique: true
    },
    packageDescription: {
        type: String,
        required: true
    },
    packagePrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
