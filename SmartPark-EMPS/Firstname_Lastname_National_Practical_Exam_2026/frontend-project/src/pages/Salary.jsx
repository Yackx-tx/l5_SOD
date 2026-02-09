import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const Salary = () => {
    const [salaries, setSalaries] = useState([]);
    const [emps, setEmps] = useState([]);
    const [depts, setDepts] = useState([]);
    const [form, setForm] = useState({ employeeNumber: '', month: '', totalDeduction: '', grossSalary: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchData = async () => {
        const [sRes, eRes, dRes] = await Promise.all([api.get('/salary'), api.get('/employee'), api.get('/department')]);
        setSalaries(sRes.data);
        setEmps(eRes.data);
        setDepts(dRes.data);
    };

    useEffect(() => { fetchData(); }, []);

    // Auto-fill Gross Salary based on Dept when Employee selected
    const handleEmpChange = (e) => {
        const empNum = e.target.value;
        const emp = emps.find(em => em.employeeNumber === empNum);
        let gross = '';
        if (emp) {
            const dept = depts.find(d => d.code === emp.departmentCode);
            if (dept) gross = dept.grossSalary;
        }
        setForm({ ...form, employeeNumber: empNum, grossSalary: gross });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/salary/${editingId}`, form);
                setEditingId(null);
            } else {
                await api.post('/salary', form);
            }
            setForm({ employeeNumber: '', month: '', totalDeduction: '', grossSalary: '' });
            fetchData();
        } catch (err) { alert('Operation failed'); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this salary record?')) {
            await api.delete(`/salary/${id}`);
            fetchData();
        }
    };

    const handleEdit = (s) => {
        setEditingId(s._id);
        setForm({
            employeeNumber: s.employeeNumber,
            month: s.month,
            totalDeduction: s.totalDeduction,
            grossSalary: s.grossSalary
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Navbar />
            <div className="container mx-auto p-6 space-y-8">
                <h2 className="text-3xl font-bold text-blue-900 border-b pb-2">Payroll Processing</h2>

                <div className="card max-w-2xl mx-auto border-t-4 border-blue-600">
                    <h3 className="text-xl font-bold mb-4">{editingId ? 'Update Salary' : 'Process New Payment'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Employee</label>
                                <select className="input-field bg-white" value={form.employeeNumber} onChange={handleEmpChange} disabled={!!editingId} required>
                                    <option value="">Select Employee</option>
                                    {emps.map(e => <option key={e._id} value={e.employeeNumber}>{e.firstName} {e.lastName} ({e.employeeNumber})</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Payment Month</label>
                                <input type="month" className="input-field" value={form.month} onChange={e => setForm({ ...form, month: e.target.value })} required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Gross Salary (RWF)</label>
                                <input type="number" className="input-field bg-gray-100" value={form.grossSalary} readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Total Deduction (RWF)</label>
                                <input type="number" className="input-field" value={form.totalDeduction} onChange={e => setForm({ ...form, totalDeduction: e.target.value })} required />
                            </div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded flex justify-between items-center">
                            <span className="font-bold text-blue-900">Calculated Net Salary:</span>
                            <span className="text-xl font-bold text-blue-800">
                                {((form.grossSalary || 0) - (form.totalDeduction || 0)).toLocaleString()} RWF
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 btn-primary py-2">{editingId ? 'Update' : 'Process Payment'}</button>
                            {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ employeeNumber: '', month: '', totalDeduction: '', grossSalary: '' }); }} className="px-4 bg-gray-500 text-white rounded">Cancel</button>}

                        </div>
                    </form>
                </div>

                <div className="card">
                    <h3 className="text-xl font-bold mb-4">Salary Records</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-blue-800 text-white">
                                <tr>
                                    <th className="p-3">Month</th>
                                    <th className="p-3">Emp. No</th>
                                    <th className="p-3">Gross</th>
                                    <th className="p-3">Deduction</th>
                                    <th className="p-3">Net Salary</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salaries.map(s => (
                                    <tr key={s._id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium">{s.month}</td>
                                        <td className="p-3 text-sm">{s.employeeNumber}</td>
                                        <td className="p-3">{s.grossSalary.toLocaleString()}</td>
                                        <td className="p-3 text-red-600">-{s.totalDeduction.toLocaleString()}</td>
                                        <td className="p-3 font-bold text-green-700">{s.netSalary.toLocaleString()} RWF</td>
                                        <td className="p-3 flex justify-center gap-2">
                                            <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                                            <button onClick={() => handleDelete(s._id)} className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Salary;
