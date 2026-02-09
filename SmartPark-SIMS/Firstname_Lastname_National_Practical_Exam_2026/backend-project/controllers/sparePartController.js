const SparePart = require('../models/SparePart');

exports.createSparePart = async (req, res) => {
    try {
        const part = new SparePart(req.body);
        if (!part.totalPrice) part.totalPrice = part.quantity * part.unitPrice;
        await part.save();
        res.status(201).json(part);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getSpareParts = async (req, res) => {
    try {
        const parts = await SparePart.find();
        res.json(parts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
