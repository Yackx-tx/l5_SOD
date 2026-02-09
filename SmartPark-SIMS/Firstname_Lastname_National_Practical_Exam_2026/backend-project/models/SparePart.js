const mongoose = require('mongoose');

const sparePartSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    quantity: { type: Number, default: 0 }, // Tracks current available stock
    unitPrice: { type: Number, required: true }, // Current standard unit price (or cost price reference)
    totalPrice: { type: Number } // Optional: value of current stock? Or just informational. Prompt says "Purchased... total price". I'll keep it simple.
}, { timestamps: true });

module.exports = mongoose.model('SparePart', sparePartSchema);
