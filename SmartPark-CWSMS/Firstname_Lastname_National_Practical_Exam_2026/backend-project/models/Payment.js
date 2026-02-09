const mongoose = require('mongoose');

// Payment schema definition
const paymentSchema = new mongoose.Schema({
    amountPaid: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    serviceRecordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceRecord',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
