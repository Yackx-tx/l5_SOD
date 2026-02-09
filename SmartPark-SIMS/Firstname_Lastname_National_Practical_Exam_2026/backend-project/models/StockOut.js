const mongoose = require('mongoose');

const stockOutSchema = new mongoose.Schema({
    sparePart: { type: mongoose.Schema.Types.ObjectId, ref: 'SparePart', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('StockOut', stockOutSchema);
