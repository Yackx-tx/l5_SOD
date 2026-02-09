import { useState, useEffect } from 'react';
import api from '../api';
import { Package as PackageIcon, PlusCircle, Tag } from 'lucide-react';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [formData, setFormData] = useState({
        packageName: '',
        packageDescription: '',
        packagePrice: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const res = await api.get('/packages');
            setPackages(res.data);
        } catch (err) {
            console.error('Error fetching packages', err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/packages', formData);
            setFormData({
                packageName: '',
                packageDescription: '',
                packagePrice: ''
            });
            fetchPackages();
            alert('Package added successfully!');
        } catch (err) {
            alert(err.response?.data?.message || 'Error adding package');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Form Section */}
                <div className="lg:w-1/3">
                    <div className="card sticky top-24">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                <PlusCircle size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Add Package</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-group">
                                <label className="form-label">Package Name</label>
                                <input
                                    type="text"
                                    name="packageName"
                                    placeholder="e.g., Premium Wash"
                                    className="form-input"
                                    required
                                    value={formData.packageName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="packageDescription"
                                    placeholder="Brief details about the service"
                                    className="form-input resize-none"
                                    rows="3"
                                    required
                                    value={formData.packageDescription}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Price (RWF)</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                        <Tag size={16} />
                                    </span>
                                    <input
                                        type="number"
                                        name="packagePrice"
                                        placeholder="0"
                                        className="form-input pl-10"
                                        required
                                        value={formData.packagePrice}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn bg-indigo-600 text-white hover:bg-indigo-700 py-2.5 mt-2"
                            >
                                {loading ? 'Adding...' : 'Add Package'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="lg:w-2/3">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">Available Packages</h2>
                        <p className="text-slate-500">Manage your car wash service packages</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {packages.length > 0 ? (
                            packages.map((pkg) => (
                                <div key={pkg._id} className="card hover:border-indigo-200 hover:shadow-md transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            <PackageIcon size={24} />
                                        </div>
                                        <div className="text-xl font-bold text-slate-900">
                                            {pkg.packagePrice.toLocaleString()} <span className="text-sm font-normal text-slate-500">RWF</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">{pkg.packageName}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                        {pkg.packageDescription}
                                    </p>
                                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                                        <span>Added on {new Date(pkg.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 py-20 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <PackageIcon size={48} className="mx-auto text-slate-300 mb-4" />
                                <p className="text-slate-400 italic">No packages available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Packages;
