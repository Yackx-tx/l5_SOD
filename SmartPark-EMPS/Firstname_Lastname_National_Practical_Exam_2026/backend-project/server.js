require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authController = require('./controllers/authController');
const epmsRoutes = require('./routes/epmsRoutes');
const Department = require('./models/Department');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/login', authController.login);
app.use('/api', epmsRoutes);

// Database & Seeding
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/EPMS').then(async () => {
    console.log('MongoDB Connected');

    // Seed Admin
    const User = require('./models/User');
    const bcrypt = require('bcrypt');
    if (await User.countDocuments() === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await new User({ username: 'admin', password: hashedPassword }).save();
        console.log('Admin seeded');
    }

    // Seed Departments (As per prompt)
    if (await Department.countDocuments() === 0) {
        const depts = [
            { code: 'CW', name: 'Carwash', grossSalary: 300000 },
            { code: 'ST', name: 'Stock', grossSalary: 200000 },
            { code: 'MC', name: 'Mechanic', grossSalary: 450000 },
            { code: 'ADMS', name: 'Administration Staff', grossSalary: 600000 },
        ];
        await Department.insertMany(depts);
        console.log('Departments seeded');
    }
}).catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
