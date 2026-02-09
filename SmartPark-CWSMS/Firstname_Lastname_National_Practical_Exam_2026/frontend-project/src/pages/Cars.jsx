import { useState, useEffect } from 'react';
import api from '../api';
import { UserPlus, Car as CarIcon, Search } from 'lucide-react';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [formData, setFormData] = useState({
        plateNumber: '',
        carType: '',
        carSize: '',
        driverName: '',
        phoneNumber: ''
    });
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const res = await api.get('/cars');
            setCars(res.data);
        } catch (err) {
            console.error('Error fetching cars', err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/cars', formData);
            setFormData({
                plateNumber: '',
                carType: '',
                carSize: '',
                driverName: '',
                phoneNumber: ''
            });
            fetchCars();
            alert('Car registered successfully!');
        } catch (err) {
            alert(err.response?.data?.message || 'Error registering car');
        } finally {
            setLoading(false);
        }
    };

    const filteredCars = cars.filter(car =>
        car.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.driverName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Form Section */}
                <div className="lg:w-1/3">
                    <div className="card sticky top-24">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="p-2 bg-violet-100 text-violet-600 rounded-lg">
                                <UserPlus size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Register Car</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-group">
                                <label className="form-label">Plate Number</label>
                                <input
                                    type="text"
                                    name="plateNumber"
                                    placeholder="e.g., RAE 123 A"
                                    className="form-input"
                                    required
                                    value={formData.plateNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Car Type</label>
                                <select
                                    name="carType"
                                    className="form-input"
                                    required
                                    value={formData.carType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Truck">Truck</option>
                                    <option value="Bus">Bus</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Car Size</label>
                                <select
                                    name="carSize"
                                    className="form-input"
                                    required
                                    value={formData.carSize}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Size</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Driver Name</label>
                                <input
                                    type="text"
                                    name="driverName"
                                    placeholder="John Doe"
                                    className="form-input"
                                    required
                                    value={formData.driverName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="0788000000"
                                    className="form-input"
                                    required
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-2.5 mt-2"
                            >
                                {loading ? 'Registering...' : 'Register Car'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Table Section */}
                <div className="lg:w-2/3">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            Registered Cars
                        </h2>
                        <div className="relative w-64">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <Search size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search by plate or name..."
                                className="form-input pl-10 h-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Plate Number</th>
                                        <th>Details</th>
                                        <th>Driver</th>
                                        <th>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCars.length > 0 ? (
                                        filteredCars.map((car) => (
                                            <tr key={car._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="font-mono font-bold text-violet-700">{car.plateNumber}</td>
                                                <td>
                                                    <div className="text-sm font-medium text-slate-900">{car.carType}</div>
                                                    <div className="text-xs text-slate-500">{car.carSize}</div>
                                                </td>
                                                <td className="text-slate-700">{car.driverName}</td>
                                                <td className="text-slate-500">{car.phoneNumber}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-10 text-slate-400 italic">
                                                No cars found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cars;
