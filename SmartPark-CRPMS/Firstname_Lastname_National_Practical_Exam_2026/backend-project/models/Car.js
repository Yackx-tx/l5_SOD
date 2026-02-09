const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    plateNumber: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    model: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    driverPhone: { type: String, required: true },
    mechanicName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
