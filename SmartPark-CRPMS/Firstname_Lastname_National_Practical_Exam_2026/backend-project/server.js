require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const Service = require('./models/Service');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Vite Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api', apiRoutes);

// Database Connection & Seeding
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/CRPMS')
    .then(async () => {
        console.log('Connected to MongoDB');

        // Seed Services & User
        try {
            const count = await Service.countDocuments();
            if (count === 0) {
                const services = [
                    { serviceCode: 'ENG-REP', serviceName: 'Engine repair', servicePrice: 150000, serviceDescription: 'Engine repair' },
                    { serviceCode: 'TRANS-REP', serviceName: 'Transmission repair', servicePrice: 80000, serviceDescription: 'Transmission repair' },
                    { serviceCode: 'OIL-CHG', serviceName: 'Oil change', servicePrice: 60000, serviceDescription: 'Oil change' },
                    { serviceCode: 'CHAIN-REP', serviceName: 'Chain replacement', servicePrice: 40000, serviceDescription: 'Chain replacement' },
                    { serviceCode: 'DISC-REP', serviceName: 'Disc replacement', servicePrice: 400000, serviceDescription: 'Disc replacement' },
                    { serviceCode: 'WHEEL-ALN', serviceName: 'Wheel alignment', servicePrice: 5000, serviceDescription: 'Wheel alignment' },
                ];
                await Service.insertMany(services);
                console.log('Services Seeded Successfully');
            }

            // Seed Admin User
            const User = require('./models/User');
            const userCount = await User.countDocuments();
            if (userCount === 0) {
                const admin = new User({
                    username: 'admin',
                    password: 'password123',
                    fullName: 'System Administrator'
                });
                await admin.save();
                console.log('Admin User Seeded: admin / password123');
            }

        } catch (error) {
            console.error('Seeding error:', error);
        }

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));
