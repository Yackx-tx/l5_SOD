const router = require('express').Router();
const controller = require('../controllers/stockController');
const auth = require('../middleware/authMiddleware');

router.post('/in', auth, controller.stockIn);
router.post('/out', auth, controller.stockOut);
router.get('/out', auth, controller.getStockOuts);
router.put('/out/:id', auth, controller.updateStockOut);
router.delete('/out/:id', auth, controller.deleteStockOut);

router.get('/reports/status', auth, controller.getDailyStatusReport);
router.get('/reports/daily-out', auth, controller.getDailyStockOutReport);

module.exports = router;
