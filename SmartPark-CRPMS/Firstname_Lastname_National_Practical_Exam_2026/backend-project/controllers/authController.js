const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1d',
    });
};

exports.register = async (req, res) => {
    try {
        const { username, password, fullName } = req.body;
        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ error: 'User already exists' });

        const user = new User({ username, password, fullName });
        await user.save();

        // Auto login
        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        });

        res.status(201).json({ message: 'User created', user: { username: user.username, fullName: user.fullName, _id: user._id } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        });

        res.json({ message: 'Logged in', user: { username: user.username, fullName: user.fullName, _id: user._id } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
};

exports.checkSession = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ error: 'Not authenticated' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(401).json({ error: 'User not found' });

        res.json({ user });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
