require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const mainRoutes = require('./routes/mainRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', mainRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('MongoDB Connected');
    // Seed Admin
    const User = require('./models/User');
    const bcrypt = require('bcrypt');
    const count = await User.countDocuments();
    if (count === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await new User({ username: 'admin', password: hashedPassword }).save();
        console.log('Admin seeded: admin / admin123');
    }
    // Seed Slots
    const ParkingSlot = require('./models/ParkingSlot');
    const sCount = await ParkingSlot.countDocuments();
    if (sCount === 0) {
        for (let i = 1; i <= 10; i++) {
            await new ParkingSlot({ slotNumber: `S-${i}`, slotStatus: 'Available' }).save();
        }
        console.log('10 Parking Slots seeded');
    }

}).catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
