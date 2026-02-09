const mongoose = require('mongoose');

const serviceRecordSchema = new mongoose.Schema({
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    serviceDate: { type: Date, default: Date.now },
    cost: { type: Number, required: true }, // Store snapshot of price to avoid issues if price changes
    amountPaid: { type: Number, default: 0 },
    paymentStatus: {
        type: String,
        enum: ['UNPAID', 'PARTIAL', 'PAID'],
        default: 'UNPAID'
    },
    paymentDate: { type: Date } // Date of last update/payment
}, { timestamps: true });

module.exports = mongoose.model('ServiceRecord', serviceRecordSchema);
