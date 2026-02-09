const Payment = require('../models/Payment');

// Record a payment (Insert)
exports.createPayment = async (req, res) => {
    try {
        const payment = new Payment(req.body);
        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: 'Error recording payment', error: error.message });
    }
};

// Get all payments (Retrieve)
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate({
                path: 'serviceRecordId',
                populate: [
                    { path: 'carId' },
                    { path: 'packageId' }
                ]
            });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments', error: error.message });
    }
};

// Daily Report Logic
exports.getDailyReport = async (req, res) => {
    try {
        const dateStr = req.query.date || new Date().toISOString().split('T')[0];
        const start = new Date(dateStr);
        start.setHours(0, 0, 0, 0);
        const end = new Date(dateStr);
        end.setHours(23, 59, 59, 999);

        const dailyPayments = await Payment.find({
            paymentDate: { $gte: start, $lte: end }
        }).populate({
            path: 'serviceRecordId',
            populate: [
                { path: 'carId' },
                { path: 'packageId' }
            ]
        });

        const totalRevenue = dailyPayments.reduce((sum, p) => sum + p.amountPaid, 0);

        res.json({
            date: dateStr,
            totalRevenue,
            count: dailyPayments.length,
            reports: dailyPayments
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating report', error: error.message });
    }
};
