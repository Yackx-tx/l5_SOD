const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceCode: { type: String, required: true, unique: true },
    serviceName: { type: String, required: true },
    servicePrice: { type: Number, required: true },
    serviceDescription: { type: String }
});

module.exports = mongoose.model('Service', serviceSchema);
