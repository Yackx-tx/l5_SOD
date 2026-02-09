const ServiceRecord = require('../models/ServiceRecord');

// Create service record (Insert)
exports.createService = async (req, res) => {
    try {
        const service = new ServiceRecord(req.body);
        await service.save();
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ message: 'Error creating service record', error: error.message });
    }
};

// Get all service records with populated data (Retrieve)
exports.getAllServices = async (req, res) => {
    try {
        const services = await ServiceRecord.find()
            .populate('carId')
            .populate('packageId');
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service records', error: error.message });
    }
};

// Update service record (Update)
exports.updateService = async (req, res) => {
    try {
        const service = await ServiceRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!service) return res.status(404).json({ message: 'Service record not found' });
        res.json(service);
    } catch (error) {
        res.status(400).json({ message: 'Error updating service record', error: error.message });
    }
};

// Delete service record (Delete)
exports.deleteService = async (req, res) => {
    try {
        const service = await ServiceRecord.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service record not found' });
        res.json({ message: 'Service record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service record', error: error.message });
    }
};
