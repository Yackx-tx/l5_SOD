const Package = require('../models/Package');

// Create a new package
exports.createPackage = async (req, res) => {
    try {
        const pkg = new Package(req.body);
        await pkg.save();
        res.status(201).json(pkg);
    } catch (error) {
        res.status(400).json({ message: 'Error creating package', error: error.message });
    }
};

// Get all packages
exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching packages', error: error.message });
    }
};
