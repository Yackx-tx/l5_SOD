const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Package = require('./models/Package');
const Car = require('./models/Car');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data (Optional, but good for fresh seed)
        await User.deleteMany({});
        await Package.deleteMany({});
        // await Car.deleteMany({}); // Uncomment if you want to clear cars too

        // 1. Create Default Admin
        const admin = new User({
            username: 'admin',
            password: 'password123' // Will be hashed by model pre-save hook
        });
        await admin.save();
        console.log('✅ Admin user created: admin / password123');

        // 2. Create Default Packages
        const packages = [
            {
                packageName: 'Basic Wash',
                packageDescription: 'Exterior hand wash and tire shine',
                packagePrice: 5000
            },
            {
                packageName: 'Interior Clean',
                packageDescription: 'Vacuuming, dashboard wipe, and window cleaning',
                packagePrice: 7000
            },
            {
                packageName: 'Full Service',
                packageDescription: 'Exterior wash + Interior clean + Waxing',
                packagePrice: 15000
            }
        ];
        await Package.insertMany(packages);
        console.log('✅ Default packages seeded');

        console.log('🚀 Database seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
