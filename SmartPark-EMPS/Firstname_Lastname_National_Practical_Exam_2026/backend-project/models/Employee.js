const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeNumber: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String },
    position: { type: String },
    telephone: { type: String },
    gender: { type: String, enum: ['Male', 'Female'] },
    hiredDate: { type: Date },
    departmentCode: { type: String, ref: 'Department', required: true } // Linking via Code for simplicity as per prompt attributes
});

module.exports = mongoose.model('Employee', employeeSchema);
