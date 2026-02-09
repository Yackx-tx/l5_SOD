import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const Departments = () => {
    const [depts, setDepts] = useState([]);
    const [form, setForm] = useState({ code: '', name: '', grossSalary: '' });

    const fetchDepts = async () => {
        try {
            const res = await api.get('/department');
            setDepts(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchDepts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/department', form);
            setForm({ code: '', name: '', grossSalary: '' });
            fetchDepts();
        } catch (err) { alert('Error: ' + err.message); }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Navbar />
            <div className="container mx-auto p-6 space-y-8">
                <h2 className="text-3xl font-bold text-blue-900 border-b pb-2">Department Management</h2>

                {/* Form */}
                <div className="card max-w-lg mx-auto">
                    <h3 className="text-xl font-bold mb-4">Add Department</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Code</label>
                            <input type="text" className="input-field" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} required placeholder="e.g. IT" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Name</label>
                            <input type="text" className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="e.g. Information Technology" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Std. Gross Salary</label>
                            <input type="number" className="input-field" value={form.grossSalary} onChange={e => setForm({ ...form, grossSalary: e.target.value })} required placeholder="RWF" />
                        </div>
                        <button className="w-full btn-primary">Save Department</button>
                    </form>
                </div>

                {/* List */}
                <div className="card">
                    <h3 className="text-xl font-bold mb-4">Departments List</h3>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-blue-100 text-blue-900">
                                <th className="p-3">Code</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Standard Gross Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {depts.map(d => (
                                <tr key={d._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-bold">{d.code}</td>
                                    <td className="p-3">{d.name}</td>
                                    <td className="p-3 font-mono">{d.grossSalary.toLocaleString()} RWF</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Departments;
