const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const carController = require('../controllers/carController');
const packageController = require('../controllers/packageController');
const serviceController = require('../controllers/serviceController');
const paymentController = require('../controllers/paymentController');
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

// Auth Routes
router.post('/login', authController.login);
router.post('/register', authController.register); // Seed route

// Dashboard Stats
router.get('/dashboard/stats', authMiddleware, dashboardController.getStats);

// Car Routes (Protected)
router.post('/cars', authMiddleware, carController.createCar);
router.get('/cars', authMiddleware, carController.getAllCars);
// Package Routes (Protected)
router.post('/packages', authMiddleware, packageController.createPackage);
router.get('/packages', authMiddleware, packageController.getAllPackages);

// Service Routes (Protected)
router.post('/services', authMiddleware, serviceController.createService);
router.get('/services', authMiddleware, serviceController.getAllServices);
router.put('/services/:id', authMiddleware, serviceController.updateService);
router.delete('/services/:id', authMiddleware, serviceController.deleteService);

// Payment Routes (Protected)
router.post('/payments', authMiddleware, paymentController.createPayment);
router.get('/payments', authMiddleware, paymentController.getAllPayments);
router.get('/reports/daily', authMiddleware, paymentController.getDailyReport);

module.exports = router;
