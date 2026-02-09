import { useState, useEffect } from 'react';
import api from '../api';
import {
    LayoutDashboard,
    Car,
    Package,
    ClipboardList,
    TrendingUp,
    Clock,
    ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await api.get('/dashboard/stats');
                setData(res.data);
            } catch (err) {
                console.error('Error fetching dashboard stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const stats = [
        {
            label: 'Total Cars',
            count: data?.stats.totalCars || 0,
            icon: <Car size={24} />,
            color: 'bg-blue-50 text-blue-600',
            link: '/cars'
        },
        {
            label: 'Active Packages',
            count: data?.stats.totalPackages || 0,
            icon: <Package size={24} />,
            color: 'bg-amber-50 text-amber-600',
            link: '/packages'
        },
        {
            label: 'Service Records',
            count: data?.stats.totalServices || 0,
            icon: <ClipboardList size={24} />,
            color: 'bg-emerald-50 text-emerald-600',
            link: '/services'
        },
        {
            label: 'Total Revenue',
            count: `${(data?.stats.totalRevenue || 0).toLocaleString()} RWF`,
            icon: <TrendingUp size={24} />,
            color: 'bg-violet-50 text-violet-600',
            link: '/reports'
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                    <LayoutDashboard className="text-emerald-800" size={32} />
                    System Overview
                </h1>
                <p className="text-slate-500 mt-1">Manage and monitor SmartPark car wash operations.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, idx) => (
                    <Link key={idx} to={stat.link} className="card hover:border-emerald-200 hover:shadow-glow transition-all group">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-slate-900">{stat.count}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <div className="card h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Clock size={20} className="text-emerald-700" />
                                Recent Service Activities
                            </h2>
                            <Link to="/services" className="text-sm text-emerald-700 font-semibold hover:underline flex items-center gap-1">
                                View All <ChevronRight size={16} />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="bg-transparent border-slate-100">Date</th>
                                        <th className="bg-transparent border-slate-100">Vehicle</th>
                                        <th className="bg-transparent border-slate-100">Package</th>
                                        <th className="bg-transparent border-slate-100 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.recentServices.length > 0 ? (
                                        data.recentServices.map((service) => (
                                            <tr key={service._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="py-4 text-sm text-slate-500">
                                                    {new Date(service.serviceDate).toLocaleDateString()}
                                                </td>
                                                <td className="py-4">
                                                    <span className="font-bold text-slate-800">{service.carId?.plateNumber}</span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-sm px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md font-medium border border-emerald-100">
                                                        {service.packageId?.packageName}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Completed
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="py-8 text-center text-slate-400 italic">No recent services recorded</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / System Info */}
                <div className="lg:col-span-1">
                    <div className="card bg-emerald-900 border-none text-white h-full relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <QuickActionLink to="/cars" label="Register New Car" />
                                <QuickActionLink to="/services" label="Record New Wash" />
                                <QuickActionLink to="/payments" label="Collect Payment" />
                                <QuickActionLink to="/reports" label="Daily Sales Report" />
                            </div>
                        </div>
                        {/* Decorative circle */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-800 rounded-full opacity-50 blur-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuickActionLink = ({ to, label }) => (
    <Link to={to} className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group">
        <span className="font-medium">{label}</span>
        <ChevronRight size={18} className="text-white/50 group-hover:text-white transition-opacity" />
    </Link>
);

export default Dashboard;
