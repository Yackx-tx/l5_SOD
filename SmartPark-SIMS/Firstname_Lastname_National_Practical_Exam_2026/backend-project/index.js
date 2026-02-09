require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const sparePartRoutes = require('./routes/sparePartRoutes');
const stockRoutes = require('./routes/stockRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/spare-parts', sparePartRoutes);
app.use('/api/stock', stockRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('MongoDB Connected');
    // Seed User
    const User = require('./models/User');
    const bcrypt = require('bcrypt');
    const count = await User.countDocuments();
    if (count === 0) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        const admin = new User({ username: 'admin', password: hashedPassword, role: 'Admin' });
        await admin.save();
        console.log('Default Admin User Created: admin / password123');
    }
}).catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
