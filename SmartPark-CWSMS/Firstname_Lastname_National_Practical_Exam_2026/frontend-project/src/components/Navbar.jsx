import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
    LogOut,
    Car,
    Package,
    ClipboardList,
    CreditCard,
    BarChart2,
    LayoutDashboard,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-emerald-950 text-white sticky top-0 z-50 shadow-xl shadow-emerald-900/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="bg-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-emerald-900/20">
                                <Car className="h-7 w-7 text-emerald-900" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black tracking-tight leading-none">SmartPark</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-400">Management System</span>
                            </div>
                        </Link>

                        <div className="hidden lg:ml-10 lg:flex lg:space-x-1">
                            <NavLink to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" active={isActive('/')} />
                            <NavLink to="/cars" icon={<Car size={18} />} label="Cars" active={isActive('/cars')} />
                            <NavLink to="/packages" icon={<Package size={18} />} label="Packages" active={isActive('/packages')} />
                            <NavLink to="/services" icon={<ClipboardList size={18} />} label="Services" active={isActive('/services')} />
                            <NavLink to="/payments" icon={<CreditCard size={18} />} label="Payments" active={isActive('/payments')} />
                            <NavLink to="/reports" icon={<BarChart2 size={18} />} label="Reports" active={isActive('/reports')} />
                        </div>
                    </div>

                    <div className="hidden lg:flex lg:items-center lg:space-x-6">
                        <div className="flex items-center space-x-3 border-l border-emerald-800/50 pl-6">
                            <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-emerald-200 border-2 border-emerald-700">
                                {user.username[0].toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white capitalize">{user.username}</span>
                                <span className="text-[10px] text-emerald-400 font-medium">Receptionist</span>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-emerald-800 hover:bg-emerald-700 p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 text-emerald-100"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex lg:hidden items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-900/50"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="lg:hidden bg-emerald-900 border-t border-emerald-800/50 p-4 space-y-2 animate-in slide-in-from-top-4 duration-200">
                    <MobileNavLink to="/" label="Dashboard" onClick={() => setIsMenuOpen(false)} />
                    <MobileNavLink to="/cars" label="Cars" onClick={() => setIsMenuOpen(false)} />
                    <MobileNavLink to="/packages" label="Packages" onClick={() => setIsMenuOpen(false)} />
                    <MobileNavLink to="/services" label="Services" onClick={() => setIsMenuOpen(false)} />
                    <MobileNavLink to="/payments" label="Payments" onClick={() => setIsMenuOpen(false)} />
                    <MobileNavLink to="/reports" label="Reports" onClick={() => setIsMenuOpen(false)} />
                    <button
                        onClick={handleLogout}
                        className="w-full text-left p-4 text-emerald-200 font-bold hover:bg-red-500/20 rounded-xl transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </nav>
    );
};

const NavLink = ({ to, icon, label, active }) => (
    <Link
        to={to}
        className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${active
                ? 'bg-white text-emerald-950 shadow-lg shadow-emerald-900/50'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-900/50'
            }`}
    >
        {icon}
        <span>{label}</span>
    </Link>
);

const MobileNavLink = ({ to, label, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="block p-4 rounded-xl text-emerald-100 font-bold hover:bg-emerald-800 transition-colors"
    >
        {label}
    </Link>
);

export default Navbar;
