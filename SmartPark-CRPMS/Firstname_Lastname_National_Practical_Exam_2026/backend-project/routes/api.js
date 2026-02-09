const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const authController = require('../controllers/authController');
const carController = require('../controllers/carController');
const serviceController = require('../controllers/serviceController');
const serviceRecordController = require('../controllers/serviceRecordController');
const paymentController = require('../controllers/paymentController');
const reportController = require('../controllers/reportController');

// Auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/session', authController.checkSession);

// Cars (Protected)
router.post('/cars', auth, carController.createCar);
router.get('/cars', auth, carController.getCars);

// Services (Protected)
router.post('/services', auth, serviceController.createService);
router.get('/services', auth, serviceController.getServices);

// Service Records (Protected)
router.post('/service-records', auth, serviceRecordController.createRecord);
router.get('/service-records', auth, serviceRecordController.getRecords);
router.put('/service-records/:id', auth, serviceRecordController.updateRecord);
router.delete('/service-records/:id', auth, serviceRecordController.deleteRecord);

// Payments (Protected)
router.post('/payments', auth, paymentController.createPayment);
router.get('/payments', auth, paymentController.getPayments);

// Reports (Protected)
router.get('/reports/daily-payments', auth, reportController.getDailyPaymentReport);
router.get('/reports/service-bills', auth, reportController.getServiceBill);

module.exports = router;
