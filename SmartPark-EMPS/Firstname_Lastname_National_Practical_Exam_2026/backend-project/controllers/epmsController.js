const Department = require('../models/Department');
const Employee = require('../models/Employee');
const Salary = require('../models/Salary');

// --- Departments ---
exports.createDepartment = async (req, res) => {
    try {
        const dept = new Department(req.body);
        await dept.save();
        res.status(201).json(dept);
    } catch (err) { res.status(400).json({ error: err.message }); }
};
exports.getDepartments = async (req, res) => {
    const depts = await Department.find();
    res.json(depts);
};

// --- Employees ---
exports.createEmployee = async (req, res) => {
    try {
        const emp = new Employee(req.body);
        await emp.save();
        res.status(201).json(emp);
    } catch (err) { res.status(400).json({ error: err.message }); }
};
exports.getEmployees = async (req, res) => {
    const emps = await Employee.find();
    res.json(emps);
};

// --- Salary (CRUD) ---
exports.createSalary = async (req, res) => {
    try {
        const { employeeNumber, month, totalDeduction, grossSalary } = req.body;

        // Auto calculate Net
        const netSalary = grossSalary - totalDeduction;

        const salary = new Salary({
            employeeNumber,
            grossSalary,
            totalDeduction,
            netSalary,
            month
        });
        await salary.save();
        res.status(201).json(salary);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.getSalaries = async (req, res) => {
    const salaries = await Salary.find();
    res.json(salaries);
};

exports.updateSalary = async (req, res) => {
    try {
        const { totalDeduction, grossSalary } = req.body;
        const netSalary = grossSalary - totalDeduction;
        const salary = await Salary.findByIdAndUpdate(req.params.id, { ...req.body, netSalary }, { new: true });
        res.json(salary);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteSalary = async (req, res) => {
    await Salary.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
};

// --- Reports ---
exports.getPayrollReport = async (req, res) => {
    try {
        // Aggregate to join Employee and Salary
        const report = await Salary.aggregate([
            {
                $lookup: {
                    from: 'employees',
                    localField: 'employeeNumber',
                    foreignField: 'employeeNumber',
                    as: 'employee'
                }
            },
            { $unwind: '$employee' },
            {
                $lookup: {
                    from: 'departments',
                    localField: 'employee.departmentCode',
                    foreignField: 'code',
                    as: 'dept'
                }
            },
            { $unwind: '$dept' },
            {
                $project: {
                    firstName: '$employee.firstName',
                    lastName: '$employee.lastName',
                    position: '$employee.position',
                    department: '$dept.name',
                    netSalary: '$netSalary',
                    month: '$month'
                }
            }
        ]);
        res.json(report);
    } catch (err) { res.status(500).json({ error: err.message }); }
};
