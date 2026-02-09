const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    serviceRecord: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceRecord', required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    receivedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);
