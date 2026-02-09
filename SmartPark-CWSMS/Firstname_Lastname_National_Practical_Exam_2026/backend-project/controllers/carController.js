const Car = require('../models/Car');

// Register a new car
exports.createCar = async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ message: 'Error registering car', error: error.message });
    }
};

// Get all cars
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cars', error: error.message });
    }
};
