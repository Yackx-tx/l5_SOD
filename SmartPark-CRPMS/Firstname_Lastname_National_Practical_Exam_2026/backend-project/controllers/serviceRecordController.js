const ServiceRecord = require('../models/ServiceRecord');
const Service = require('../models/Service');

exports.createRecord = async (req, res) => {
    try {
        const { carId, serviceId } = req.body;
        const service = await Service.findById(serviceId);
        if (!service) return res.status(404).json({ error: 'Service not found' });

        const record = new ServiceRecord({
            car: carId,
            service: serviceId,
            cost: service.servicePrice,
            amountPaid: 0,
            paymentStatus: 'UNPAID'
        });
        await record.save();
        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRecords = async (req, res) => {
    try {
        const records = await ServiceRecord.find()
            .populate('car')
            .populate('service')
            .sort({ createdAt: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await ServiceRecord.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteRecord = async (req, res) => {
    try {
        await ServiceRecord.findByIdAndDelete(req.params.id);
        res.json({ message: 'Record deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
