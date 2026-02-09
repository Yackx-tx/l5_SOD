import { useState, useEffect } from 'react';
import api from '../api';
import { ClipboardList, Plus, Edit2, Trash2, X, Check, Calendar } from 'lucide-react';

const ServiceRecords = () => {
    const [services, setServices] = useState([]);
    const [cars, setCars] = useState([]);
    const [packages, setPackages] = useState([]);
    const [formData, setFormData] = useState({
        carId: '',
        packageId: '',
        serviceDate: new Date().toISOString().split('T')[0]
    });
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [servicesRes, carsRes, packagesRes] = await Promise.all([
                api.get('/services'),
                api.get('/cars'),
                api.get('/packages')
            ]);
            setServices(servicesRes.data);
            setCars(carsRes.data);
            setPackages(packagesRes.data);
        } catch (err) {
            console.error('Error fetching data', err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                await api.put(`/services/${editingId}`, formData);
                alert('Service record updated!');
            } else {
                await api.post('/services', formData);
                alert('Service record created!');
            }
            resetForm();
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving record');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service) => {
        setEditingId(service._id);
        setFormData({
            carId: service.carId._id,
            packageId: service.packageId._id,
            serviceDate: new Date(service.serviceDate).toISOString().split('T')[0]
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this record?')) return;
        try {
            await api.delete(`/services/${id}`);
            fetchData();
        } catch (err) {
            alert('Error deleting record');
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            carId: '',
            packageId: '',
            serviceDate: new Date().toISOString().split('T')[0]
        });
        setShowForm(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Service Records</h2>
                    <p className="text-slate-500">Manage car wash activities</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus size={20} />
                        New Service
                    </button>
                )}
            </div>

            {showForm && (
                <div className="mb-10 card animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-800">
                            {editingId ? 'Edit Service Record' : 'Record New Service'}
                        </h3>
                        <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="form-group">
                            <label className="form-label">Select Car</label>
                            <select
                                name="carId"
                                className="form-input"
                                required
                                value={formData.carId}
                                onChange={handleChange}
                            >
                                <option value="">Select Plate Number</option>
                                {cars.map(car => (
                                    <option key={car._id} value={car._id}>
                                        {car.plateNumber} - {car.driverName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Select Package</label>
                            <select
                                name="packageId"
                                className="form-input"
                                required
                                value={formData.packageId}
                                onChange={handleChange}
                            >
                                <option value="">Select Package</option>
                                {packages.map(pkg => (
                                    <option key={pkg._id} value={pkg._id}>
                                        {pkg.packageName} ({pkg.packagePrice} RWF)
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Service Date</label>
                            <input
                                type="date"
                                name="serviceDate"
                                className="form-input"
                                required
                                value={formData.serviceDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="md:col-span-3 flex justify-end gap-3 mt-2">
                            <button type="button" onClick={resetForm} className="btn bg-slate-100 text-slate-600 hover:bg-slate-200">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary flex items-center gap-2 px-8"
                            >
                                {loading ? 'Saving...' : (editingId ? 'Update Record' : 'Create Record')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Vehicle</th>
                                <th>Package</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <tr key={service._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Calendar size={14} />
                                                {new Date(service.serviceDate).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold text-slate-800">{service.carId?.plateNumber}</div>
                                            <div className="text-xs text-slate-500 uppercase">{service.carId?.carType} • {service.carId?.carSize}</div>
                                        </td>
                                        <td>
                                            <div className="font-medium text-violet-600">{service.packageId?.packageName}</div>
                                            <div className="text-xs text-slate-500">{service.packageId?.packagePrice.toLocaleString()} RWF</div>
                                        </td>
                                        <td className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(service)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(service._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-12 text-slate-400">
                                        <ClipboardList size={40} className="mx-auto mb-4 opacity-20" />
                                        <p>No service records found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ServiceRecords;
