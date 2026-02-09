const StockIn = require('../models/StockIn');
const StockOut = require('../models/StockOut');
const SparePart = require('../models/SparePart');

// Stock In
exports.stockIn = async (req, res) => {
    try {
        const { sparePartId, quantity, unitPrice, date } = req.body;
        if (!sparePartId || quantity <= 0 || unitPrice < 0) return res.status(400).json({ error: 'Invalid data' });

        const totalPrice = quantity * unitPrice;
        const stockIn = new StockIn({ sparePart: sparePartId, quantity, unitPrice, totalPrice, date: date || new Date() });
        await stockIn.save();

        await SparePart.findByIdAndUpdate(sparePartId, { $inc: { quantity: quantity } });
        res.status(201).json(stockIn);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Stock Out
exports.stockOut = async (req, res) => {
    try {
        const { sparePartId, quantity, unitPrice, date } = req.body;
        const part = await SparePart.findById(sparePartId);
        if (!part) return res.status(404).json({ error: 'Part not found' });
        if (part.quantity < quantity) return res.status(400).json({ error: 'Insufficient stock' });

        const totalPrice = quantity * unitPrice;
        const stockOut = new StockOut({ sparePart: sparePartId, quantity, unitPrice, totalPrice, date: date || new Date() });
        await stockOut.save();

        await SparePart.findByIdAndUpdate(sparePartId, { $inc: { quantity: -quantity } });
        res.status(201).json(stockOut);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get Stock Outs
exports.getStockOuts = async (req, res) => {
    try {
        const stockOuts = await StockOut.find().populate('sparePart').sort({ date: -1 });
        res.json(stockOuts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Stock Out
exports.updateStockOut = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, unitPrice, date } = req.body;
        const oldStockOut = await StockOut.findById(id);
        if (!oldStockOut) return res.status(404).json({ error: 'Record not found' });

        const diff = oldStockOut.quantity - quantity;

        // Check stock if we are taking more
        if (diff < 0) {
            const part = await SparePart.findById(oldStockOut.sparePart);
            if (part.quantity + diff < 0) return res.status(400).json({ error: 'Insufficient stock for update' });
        }

        await SparePart.findByIdAndUpdate(oldStockOut.sparePart, { $inc: { quantity: diff } });

        oldStockOut.quantity = quantity;
        oldStockOut.unitPrice = unitPrice;
        oldStockOut.totalPrice = quantity * unitPrice;
        oldStockOut.date = date;
        await oldStockOut.save();

        res.json(oldStockOut);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Stock Out
exports.deleteStockOut = async (req, res) => {
    try {
        const { id } = req.params;
        const stockOut = await StockOut.findByIdAndDelete(id);
        if (!stockOut) return res.status(404).json({ error: 'Record not found' });

        await SparePart.findByIdAndUpdate(stockOut.sparePart, { $inc: { quantity: stockOut.quantity } });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Reports
exports.getDailyStatusReport = async (req, res) => {
    try {
        // Aggregate to get total In/Out
        const report = await SparePart.aggregate([
            {
                $lookup: {
                    from: 'stockins',
                    localField: '_id',
                    foreignField: 'sparePart',
                    as: 'stockIns'
                }
            },
            {
                $lookup: {
                    from: 'stockouts',
                    localField: '_id',
                    foreignField: 'sparePart',
                    as: 'stockOuts'
                }
            },
            {
                $project: {
                    name: 1,
                    quantity: 1, // Remaining
                    totalStockIn: { $sum: '$stockIns.quantity' },
                    totalStockOut: { $sum: '$stockOuts.quantity' },
                    // initial stock? if current quantity includes initial, then strict StockIn sum might differ.
                    // But 'Total Stored' usually means everything that ever came in.
                    // Let's assume initial quantity is a 'StockIn' implicitly or explicitly.
                    // If SparePart creation sets quantity, it's not in StockIn collection unless we enforce it.
                    // To be safe, TotalStored = Remaining + TotalStockOut. 
                    // This is mathematically correct regardless of how it got there.
                }
            },
            {
                $addFields: {
                    calculatedTotalStored: { $add: ['$quantity', '$totalStockOut'] }
                }
            }
        ]);
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDailyStockOutReport = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const stockOuts = await StockOut.find({
            date: { $gte: startOfDay, $lte: endOfDay }
        }).populate('sparePart');

        res.json(stockOuts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
