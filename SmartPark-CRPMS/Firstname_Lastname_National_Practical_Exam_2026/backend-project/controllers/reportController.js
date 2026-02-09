const Payment = require('../models/Payment');
const ServiceRecord = require('../models/ServiceRecord');

// Aggregation for Daily Service Payment Report
exports.getDailyPaymentReport = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const report = await Payment.aggregate([
            {
                $match: {
                    paymentDate: { $gte: startOfDay, $lte: endOfDay }
                }
            },
            {
                $lookup: {
                    from: 'servicerecords',
                    localField: 'serviceRecord',
                    foreignField: '_id',
                    as: 'record'
                }
            },
            { $unwind: '$record' },
            {
                $lookup: {
                    from: 'cars',
                    localField: 'record.car',
                    foreignField: '_id',
                    as: 'car'
                }
            },
            { $unwind: '$car' },
            {
                $lookup: {
                    from: 'services',
                    localField: 'record.service',
                    foreignField: '_id',
                    as: 'service'
                }
            },
            { $unwind: '$service' },
            {
                $project: {
                    _id: 1,
                    plateNumber: '$car.plateNumber',
                    serviceName: '$service.serviceName',
                    serviceDate: '$record.serviceDate',
                    amountPaid: '$amount',
                    paymentDate: '$paymentDate'
                }
            }
        ]);
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Aggregation for Service Bill (Can be specific to a car or general)
// Let's filter by query param if provided, else all history
exports.getServiceBill = async (req, res) => {
    try {
        const matchStage = {};
        // If we want to filter by specific service record or car, we can add logic here
        // For now, return all formatted for bills

        const report = await ServiceRecord.aggregate([
            {
                $lookup: {
                    from: 'cars',
                    localField: 'car',
                    foreignField: '_id',
                    as: 'car'
                }
            },
            { $unwind: '$car' },
            {
                $lookup: {
                    from: 'services',
                    localField: 'service',
                    foreignField: '_id',
                    as: 'service'
                }
            },
            { $unwind: '$service' },
            {
                $project: {
                    _id: 1,
                    plateNumber: '$car.plateNumber',
                    serviceName: '$service.serviceName',
                    serviceDate: '$serviceDate',
                    servicePrice: '$cost',
                    amountPaid: '$amountPaid',
                    paymentStatus: '$paymentStatus',
                    paymentDate: '$paymentDate'
                }
            }
        ]);
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
