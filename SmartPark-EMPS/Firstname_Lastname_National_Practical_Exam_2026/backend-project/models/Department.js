const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    grossSalary: { type: Number, required: true } // Standard Gross Salary for dept
});

module.exports = mongoose.model('Department', departmentSchema);
