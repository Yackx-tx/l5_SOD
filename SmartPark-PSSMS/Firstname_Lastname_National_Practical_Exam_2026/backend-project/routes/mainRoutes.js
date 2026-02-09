const express = require('express');
const router = express.Router();
const controller = require('../controllers/parkingController');
const auth = require('../middleware/authMiddleware');

router.get('/slot', auth, controller.getSlots);
router.post('/slot', auth, controller.createSlot);

router.post('/entry', auth, controller.recordEntry);

router.get('/exit-preview/:slotNumber', auth, controller.previewExit);
router.post('/payment', auth, controller.processPayment);

router.get('/reports/daily', auth, controller.getDailyReport);

module.exports = router;
