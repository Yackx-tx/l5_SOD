import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const Employees = () => {
    const [emps, setEmps] = useState([]);
    const [depts, setDepts] = useState([]);
    const [form, setForm] = useState({
        employeeNumber: '', firstName: '', lastName: '', address: '', position: '',
        telephone: '', gender: 'Male', hiredDate: '', departmentCode: ''
    });

    const fetchData = async () => {
        const [eRes, dRes] = await Promise.all([api.get('/employee'), api.get('/department')]);
        setEmps(eRes.data);
        setDepts(dRes.data);
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/employee', form);
            setForm({ employeeNumber: '', firstName: '', lastName: '', address: '', position: '', telephone: '', gender: 'Male', hiredDate: '', departmentCode: '' });
            fetchData();
        } catch (err) { alert('Error creating employee. Ensure ID is unique.'); }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Navbar />
            <div className="container mx-auto p-6 space-y-8">
                <h2 className="text-3xl font-bold text-blue-900 border-b pb-2">Employee Registration</h2>

                <div className="card">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div><label className="block text-sm font-bold mb-1">Emp. Number</label><input type="text" className="input-field" value={form.employeeNumber} onChange={e => setForm({ ...form, employeeNumber: e.target.value })} required /></div>
                        <div><label className="block text-sm font-bold mb-1">First Name</label><input type="text" className="input-field" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required /></div>
                        <div><label className="block text-sm font-bold mb-1">Last Name</label><input type="text" className="input-field" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} required /></div>
                        <div><label className="block text-sm font-bold mb-1">Department</label>
                            <select className="input-field bg-white" value={form.departmentCode} onChange={e => setForm({ ...form, departmentCode: e.target.value })} required>
                                <option value="">Select Dept</option>
                                {depts.map(d => <option key={d._id} value={d.code}>{d.name}</option>)}
                            </select>
                        </div>
                        <div><label className="block text-sm font-bold mb-1">Position</label><input type="text" className="input-field" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} required /></div>
                        <div><label className="block text-sm font-bold mb-1">Gender</label>
                            <select className="input-field bg-white" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div><label className="block text-sm font-bold mb-1">Phone</label><input type="text" className="input-field" value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} required /></div>
                        <div><label className="block text-sm font-bold mb-1">Address</label><input type="text" className="input-field" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required /></div>
                        <div><label className="block text-sm font-bold mb-1">Hired Date</label><input type="date" className="input-field" value={form.hiredDate} onChange={e => setForm({ ...form, hiredDate: e.target.value })} required /></div>

                        <div className="md:col-span-3">
                            <button className="w-full btn-primary py-3">Register Employee</button>
                        </div>
                    </form>
                </div>

                <div className="card overflow-auto">
                    <h3 className="text-xl font-bold mb-4">Employee Directory</h3>
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-blue-100 text-blue-900">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Dept</th>
                                <th className="p-3">Position</th>
                                <th className="p-3">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emps.map(e => (
                                <tr key={e._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-mono text-sm">{e.employeeNumber}</td>
                                    <td className="p-3 font-semibold">{e.firstName} {e.lastName}</td>
                                    <td className="p-3"><span className="bg-gray-200 px-2 py-1 rounded text-xs font-bold">{e.departmentCode}</span></td>
                                    <td className="p-3 text-sm">{e.position}</td>
                                    <td className="p-3 text-sm">{e.telephone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Employees;
