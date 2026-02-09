const Car = require('../models/Car');
const Package = require('../models/Package');
const ServiceRecord = require('../models/ServiceRecord');
const Payment = require('../models/Payment');

exports.getStats = async (req, res) => {
    try {
        const [carCount, packageCount, serviceCount, payments] = await Promise.all([
            Car.countDocuments(),
            Package.countDocuments(),
            ServiceRecord.countDocuments(),
            Payment.find()
        ]);

        const totalRevenue = payments.reduce((sum, p) => sum + p.amountPaid, 0);

        // Get revenue for the last 7 days for a simple chart/display
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentPayments = await Payment.find({
            paymentDate: { $gte: sevenDaysAgo }
        });

        // Simple recent activity
        const recentServices = await ServiceRecord.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('carId')
            .populate('packageId');

        res.json({
            stats: {
                totalCars: carCount,
                totalPackages: packageCount,
                totalServices: serviceCount,
                totalRevenue: totalRevenue
            },
            recentServices
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
    }
};
