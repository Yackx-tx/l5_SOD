const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    employeeNumber: { type: String, ref: 'Employee', required: true },
    grossSalary: { type: Number, required: true },
    totalDeduction: { type: Number, required: true },
    netSalary: { type: Number, required: true }, // Logic: Gross - Deduction
    month: { type: String, required: true } // e.g., "2025-02"
}, { timestamps: true });

module.exports = mongoose.model('Salary', salarySchema);
