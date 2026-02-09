const ParkingSlot = require('../models/ParkingSlot');
const Car = require('../models/Car');
const ParkingRecord = require('../models/ParkingRecord');
const Payment = require('../models/Payment');

// --- Slot Management ---
exports.getSlots = async (req, res) => {
    try {
        const slots = await ParkingSlot.find();
        res.json(slots);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createSlot = async (req, res) => {
    try {
        const slot = new ParkingSlot(req.body);
        await slot.save();
        res.status(201).json(slot);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// --- Car Entry ---
exports.recordEntry = async (req, res) => {
    const { plateNumber, driverName, phoneNumber, slotNumber } = req.body;
    try {
        let car = await Car.findOne({ plateNumber });
        if (!car) {
            car = new Car({ plateNumber, driverName, phoneNumber });
            await car.save();
        }

        const slot = await ParkingSlot.findOne({ slotNumber });
        if (!slot) return res.status(404).json({ error: 'Slot not found' });
        if (slot.slotStatus === 'Occupied') return res.status(400).json({ error: 'Slot is occupied' });

        const record = new ParkingRecord({ car: car._id, parkingSlot: slot._id });
        await record.save();

        slot.slotStatus = 'Occupied';
        await slot.save();

        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- Exit Calculation ---
exports.previewExit = async (req, res) => {
    try {
        const slot = await ParkingSlot.findOne({ slotNumber: req.params.slotNumber });
        if (!slot || slot.slotStatus !== 'Occupied') return res.status(400).json({ error: 'Slot not occupied or not found' });

        const record = await ParkingRecord.findOne({ parkingSlot: slot._id, status: 'Active' }).populate('car');
        if (!record) return res.status(404).json({ error: 'Active record not found' });

        const exitTime = new Date();
        const durationMs = exitTime - new Date(record.entryTime);
        const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));

        let chargeableHours = durationHours;
        if (chargeableHours < 1) chargeableHours = 1;

        const amount = chargeableHours * 500;

        res.json({
            recordId: record._id,
            plateNumber: record.car.plateNumber,
            entryTime: record.entryTime,
            exitTime: exitTime,
            duration: durationHours,
            amount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- Process Payment ---
exports.processPayment = async (req, res) => {
    const { recordId, amountPaid } = req.body;
    try {
        const record = await ParkingRecord.findById(recordId);
        if (!record) return res.status(404).json({ error: 'Record not found' });
        if (record.status === 'Completed') return res.status(400).json({ error: 'Already paid' });

        const exitTime = new Date();
        const durationMs = exitTime - new Date(record.entryTime);
        const durationHours = durationMs / (1000 * 60 * 60);

        record.exitTime = exitTime;
        record.duration = durationHours;
        record.status = 'Completed';
        await record.save();

        const payment = new Payment({ parkingRecord: recordId, amountPaid });
        await payment.save();

        await ParkingSlot.findByIdAndUpdate(record.parkingSlot, { slotStatus: 'Available' });

        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- Reports ---
exports.getDailyReport = async (req, res) => {
    try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const report = await Payment.aggregate([
            { $match: { paymentDate: { $gte: start, $lte: end } } },
            {
                $lookup: { from: 'parkingrecords', localField: 'parkingRecord', foreignField: '_id', as: 'record' }
            },
            { $unwind: '$record' },
            {
                $lookup: { from: 'cars', localField: 'record.car', foreignField: '_id', as: 'car' }
            },
            { $unwind: '$car' },
            {
                $project: {
                    plateNumber: '$car.plateNumber',
                    entryTime: '$record.entryTime',
                    exitTime: '$record.exitTime',
                    duration: '$record.duration',
                    amountPaid: '$amountPaid'
                }
            }
        ]);
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
