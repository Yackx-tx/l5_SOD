import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, Wrench, FileText, DollarSign, PieChart, LogOut } from 'lucide-react';

export default function Sidebar() {
    const { logout, user } = useAuth();

    const navItems = [
        { path: '/', label: 'Cars', icon: Car },
        { path: '/services', label: 'Services', icon: Wrench },
        { path: '/records', label: 'Service Records', icon: FileText },
        { path: '/payments', label: 'Payments', icon: DollarSign },
        { path: '/reports', label: 'Reports', icon: PieChart },
    ];

    return (
        <div className="h-screen w-64 bg-primary text-white flex flex-col fixed shadow-2xl z-50">
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-bold tracking-tight">SmartPark</h1>
                <p className="text-xs text-accent mt-1 opacity-80">CRPMS v1.0</p>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
                <div className="mb-6 px-2">
                    <p className="text-xs text-gray-400 uppercase font-semibold">Menu</p>
                </div>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/5'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="p-6 border-t border-white/10 bg-black/20">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold border border-accent/20">
                        {user?.username?.[0]?.toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">{user?.fullName}</p>
                        <p className="text-xs text-gray-400 truncate">@{user?.username}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded-lg transition-colors border border-red-500/20"
                >
                    <LogOut size={16} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
