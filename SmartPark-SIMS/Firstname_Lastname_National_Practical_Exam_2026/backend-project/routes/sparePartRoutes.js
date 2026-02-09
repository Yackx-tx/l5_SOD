const router = require('express').Router();
const controller = require('../controllers/sparePartController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, controller.getSpareParts);
router.post('/', auth, controller.createSparePart);

module.exports = router;
