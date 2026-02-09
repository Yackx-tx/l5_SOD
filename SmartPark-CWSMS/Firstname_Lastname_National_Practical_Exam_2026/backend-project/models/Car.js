const mongoose = require('mongoose');

// Car schema definition
const carSchema = new mongoose.Schema({
    plateNumber: {
        type: String,
        required: true,
        unique: true
    },
    carType: {
        type: String, // e.g., Sedan, SUV, Truck
        required: true
    },
    carSize: {
        type: String, // e.g., Small, Medium, Large
        required: true
    },
    driverName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
