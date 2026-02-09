const mongoose = require('mongoose');

const parkingRecordSchema = new mongoose.Schema({
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    parkingSlot: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSlot', required: true },
    entryTime: { type: Date, required: true, default: Date.now },
    exitTime: { type: Date },
    duration: { type: Number }, // In hours
    status: { type: String, enum: ['Active', 'Completed'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('ParkingRecord', parkingRecordSchema);
