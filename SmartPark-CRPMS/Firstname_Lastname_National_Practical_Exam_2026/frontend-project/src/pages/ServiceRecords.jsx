import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Plus } from 'lucide-react';

export default function ServiceRecords() {
    const [records, setRecords] = useState([]);
    const [cars, setCars] = useState([]);
    const [services, setServices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ carId: '', serviceId: '' });

    useEffect(() => {
        fetchRecords();
        fetchDropdowns();
    }, []);

    const fetchRecords = async () => {
        try {
            const { data } = await api.get('/service-records');
            setRecords(data);
        } catch (e) { }
    };

    const fetchDropdowns = async () => {
        try {
            const [carsRes, servicesRes] = await Promise.all([
                api.get('/cars'),
                api.get('/services')
            ]);
            setCars(carsRes.data);
            setServices(servicesRes.data);
        } catch (e) { }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/service-records', formData);
            fetchRecords();
            setShowForm(false);
            setFormData({ carId: '', serviceId: '' });
        } catch (err) {
            alert(err.response?.data?.error || "Error creating record");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Service Records</h1>
                    <p className="text-gray-500 mt-1">Track ongoing and past repairs</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center space-x-2 shadow-lg shadow-primary/30"
                >
                    <Plus size={20} /> <span>New Service Record</span>
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-6 mb-8 animate-slideDown border-l-4 border-l-primary">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Create Service Record</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Select Vehicle</label>
                            <select className="input-field" value={formData.carId} onChange={e => setFormData({ ...formData, carId: e.target.value })} required>
                                <option value="">-- Select Car --</option>
                                {cars.map(c => <option key={c._id} value={c._id}>{c.plateNumber} (Model: {c.model})</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Select Service</label>
                            <select className="input-field" value={formData.serviceId} onChange={e => setFormData({ ...formData, serviceId: e.target.value })} required>
                                <option value="">-- Select Service --</option>
                                {services.map(s => <option key={s._id} value={s._id}>{s.serviceName} ({s.servicePrice.toLocaleString()} RWF)</option>)}
                            </select>
                        </div>
                        <div className="col-span-1 md:col-span-2 flex justify-end space-x-2 mt-4">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                            <button type="submit" className="btn-primary">Create Record</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Date</th>
                            <th className="p-4 font-semibold text-gray-600">Car</th>
                            <th className="p-4 font-semibold text-gray-600">Service</th>
                            <th className="p-4 font-semibold text-gray-600">Cost</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {records.map(r => (
                            <tr key={r._id} className="hover:bg-gray-50">
                                <td className="p-4 text-gray-600">{new Date(r.serviceDate).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <div className="font-semibold text-gray-800">{r.car?.plateNumber}</div>
                                    <div className="text-xs text-gray-500">{r.car?.model}</div>
                                </td>
                                <td className="p-4 text-gray-600">{r.service?.serviceName}</td>
                                <td className="p-4 font-mono font-medium">{r.cost.toLocaleString()} RWF</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${r.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' :
                                            r.paymentStatus === 'PARTIAL' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {r.paymentStatus}
                                    </span>
                                    {r.amountPaid > 0 && r.paymentStatus !== 'PAID' && (
                                        <div className="text-xs text-gray-500 mt-1">Paid: {r.amountPaid.toLocaleString()}</div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {records.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-gray-400">No records found</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
