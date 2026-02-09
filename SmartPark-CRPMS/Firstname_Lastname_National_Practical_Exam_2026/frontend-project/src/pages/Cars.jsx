import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Plus } from 'lucide-react';

export default function Cars() {
    const [cars, setCars] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        plateNumber: '', type: '', model: '', manufacturingYear: '', driverPhone: '', mechanicName: ''
    });

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const { data } = await api.get('/cars');
            setCars(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const alphanumeric = /^[a-zA-Z0-9 ]+$/;
        const plateRegex = /^[A-Z0-9 -]+$/;
        const phoneRegex = /^[0-9+ ]+$/;

        if (!plateRegex.test(formData.plateNumber)) return alert("Invalid Plate Number");
        if (!alphanumeric.test(formData.type)) return alert("Invalid Type (Alphanumeric only)");
        if (!alphanumeric.test(formData.model)) return alert("Invalid Model (Alphanumeric only)");
        if (!phoneRegex.test(formData.driverPhone)) return alert("Invalid Phone Number");
        if (!alphanumeric.test(formData.mechanicName)) return alert("Invalid Mechanic Name");

        try {
            await api.post('/cars', formData);
            fetchCars();
            setShowForm(false);
            setFormData({ plateNumber: '', type: '', model: '', manufacturingYear: '', driverPhone: '', mechanicName: '' });
        } catch (err) {
            alert(err.response?.data?.error || "Error adding car");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Car Management</h1>
                    <p className="text-gray-500 mt-1">Register and manage customer vehicles</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center space-x-2 shadow-lg shadow-primary/30"
                >
                    <Plus size={20} /> <span>Add New Car</span>
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-6 mb-8 animate-slideDown border-l-4 border-l-primary">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Register New Vehicle</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Plate Number (e.g. RAD 123 A)" className="input-field" value={formData.plateNumber} onChange={e => setFormData({ ...formData, plateNumber: e.target.value })} required />
                        <input placeholder="Type (e.g. SUV, Sedan)" className="input-field" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} required />
                        <input placeholder="Model (e.g. RAV4)" className="input-field" value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} required />
                        <input type="number" placeholder="Manufacturing Year" className="input-field" value={formData.manufacturingYear} onChange={e => setFormData({ ...formData, manufacturingYear: e.target.value })} required />
                        <input placeholder="Driver Phone" className="input-field" value={formData.driverPhone} onChange={e => setFormData({ ...formData, driverPhone: e.target.value })} required />
                        <input placeholder="Assigned Mechanic" className="input-field" value={formData.mechanicName} onChange={e => setFormData({ ...formData, mechanicName: e.target.value })} required />
                        <div className="col-span-1 md:col-span-2 flex justify-end space-x-2 mt-4">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                            <button type="submit" className="btn-primary">Save Car</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Plate Number</th>
                            <th className="p-4 font-semibold text-gray-600">Vehicle Info</th>
                            <th className="p-4 font-semibold text-gray-600">Owner Contact</th>
                            <th className="p-4 font-semibold text-gray-600">Mechanic</th>
                            <th className="p-4 font-semibold text-gray-600">Registered On</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {cars.map(car => (
                            <tr key={car._id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-primary font-mono">{car.plateNumber}</td>
                                <td className="p-4 text-gray-600">
                                    <span className="font-semibold">{car.model}</span> <span className="text-gray-400 text-sm">({car.manufacturingYear})</span>
                                    <div className="text-xs text-gray-400">{car.type}</div>
                                </td>
                                <td className="p-4 text-gray-600">{car.driverPhone}</td>
                                <td className="p-4 text-gray-600">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-sm">{car.mechanicName}</span>
                                </td>
                                <td className="p-4 text-gray-500 text-sm">{new Date(car.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        {cars.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-12 text-center text-gray-400">
                                    <div className="flex flex-col items-center">
                                        <p>No cars registered yet.</p>
                                        <button onClick={() => setShowForm(true)} className="text-primary hover:underline mt-2">Add your first car</button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
