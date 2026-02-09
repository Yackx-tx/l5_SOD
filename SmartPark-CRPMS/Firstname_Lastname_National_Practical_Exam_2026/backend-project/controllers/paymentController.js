const Payment = require('../models/Payment');
const ServiceRecord = require('../models/ServiceRecord');

exports.createPayment = async (req, res) => {
    try {
        const { serviceRecordId, amount } = req.body;
        const userId = req.session.userId;

        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const record = await ServiceRecord.findById(serviceRecordId);
        if (!record) return res.status(404).json({ error: 'Record not found' });

        if (record.paymentStatus === 'PAID') {
            return res.status(400).json({ error: 'Service is already fully paid' });
        }

        const newAmountPaid = record.amountPaid + Number(amount);

        // Prevent overpayment
        if (newAmountPaid > record.cost) {
            return res.status(400).json({ error: `Payment exceeds cost. Remaining balance: ${record.cost - record.amountPaid}` });
        }

        const payment = new Payment({
            serviceRecord: serviceRecordId,
            amount: Number(amount),
            receivedBy: userId
        });
        await payment.save();

        // Update Record
        record.amountPaid = newAmountPaid;
        record.paymentDate = new Date();
        if (record.amountPaid >= record.cost) {
            record.paymentStatus = 'PAID';
        } else {
            record.paymentStatus = 'PARTIAL';
        }
        await record.save();

        res.status(201).json(payment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('serviceRecord').populate('receivedBy');
        res.json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
