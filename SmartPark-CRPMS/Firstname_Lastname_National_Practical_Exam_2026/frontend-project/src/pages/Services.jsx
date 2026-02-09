import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Plus } from 'lucide-react';

export default function Services() {
    const [services, setServices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        serviceCode: '', serviceName: '', servicePrice: '', serviceDescription: ''
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data } = await api.get('/services');
            setServices(data.sort((a, b) => a.serviceCode.localeCompare(b.serviceCode)));
        } catch (err) { }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const codeRegex = /^[A-Z0-9-]+$/;
        const nameRegex = /^[a-zA-Z0-9 ]+$/;

        if (!codeRegex.test(formData.serviceCode)) return alert("Invalid Service Code (Uppercase, numbers, hyphens only)");
        if (!nameRegex.test(formData.serviceName)) return alert("Invalid Service Name");

        try {
            await api.post('/services', formData);
            fetchServices();
            setShowForm(false);
            setFormData({ serviceCode: '', serviceName: '', servicePrice: '', serviceDescription: '' });
        } catch (err) {
            alert(err.response?.data?.error || "Error adding service");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Services Catalog</h1>
                    <p className="text-gray-500 mt-1">Manage workshop services and pricing</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center space-x-2 shadow-lg shadow-primary/30"
                >
                    <Plus size={20} /> <span>Add New Service</span>
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-6 mb-8 animate-slideDown border-l-4 border-l-primary">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Service</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Service Code (e.g. OIL-CHG)" className="input-field" value={formData.serviceCode} onChange={e => setFormData({ ...formData, serviceCode: e.target.value })} required />
                        <input placeholder="Service Name" className="input-field" value={formData.serviceName} onChange={e => setFormData({ ...formData, serviceName: e.target.value })} required />
                        <input type="number" placeholder="Price (RWF)" className="input-field" value={formData.servicePrice} onChange={e => setFormData({ ...formData, servicePrice: e.target.value })} required />
                        <input placeholder="Description" className="input-field" value={formData.serviceDescription} onChange={e => setFormData({ ...formData, serviceDescription: e.target.value })} />
                        <div className="col-span-1 md:col-span-2 flex justify-end space-x-2 mt-4">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                            <button type="submit" className="btn-primary">Save Service</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <div key={service._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">{service.serviceCode}</span>
                            <span className="text-lg font-bold text-gray-800">{service.servicePrice.toLocaleString()} RWF</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.serviceName}</h3>
                        <p className="text-gray-500 text-sm">{service.serviceDescription}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
