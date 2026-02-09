const express = require('express');
const router = express.Router();
const controller = require('../controllers/epmsController');

// Auth middleware (Simple check)
const auth = require('../middleware/authMiddleware');

router.post('/department', auth, controller.createDepartment);
router.get('/department', auth, controller.getDepartments);

router.post('/employee', auth, controller.createEmployee);
router.get('/employee', auth, controller.getEmployees);

router.post('/salary', auth, controller.createSalary);
router.get('/salary', auth, controller.getSalaries);
router.put('/salary/:id', auth, controller.updateSalary);
router.delete('/salary/:id', auth, controller.deleteSalary);

router.get('/reports/payroll', auth, controller.getPayrollReport);

module.exports = router;
