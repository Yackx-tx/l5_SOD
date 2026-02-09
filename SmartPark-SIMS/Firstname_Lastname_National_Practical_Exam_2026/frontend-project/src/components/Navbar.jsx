import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const isActive = (path) => location.pathname === path ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-800 hover:text-white';

    return (
        <nav className="bg-green-900 text-white shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold tracking-wide flex items-center gap-2">
                    SmartPark SIMS
                </div>
                <div className="flex space-x-6 items-center">
                    <Link to="/dashboard" className={`px-3 py-2 rounded transition ${isActive('/dashboard')}`}>Spare Parts Management</Link>
                    <Link to="/stock-in" className={`px-3 py-2 rounded transition ${isActive('/stock-in')}`}>Stock In</Link>
                    <Link to="/stock-out" className={`px-3 py-2 rounded transition ${isActive('/stock-out')}`}>Stock Out</Link>
                    <Link to="/reports" className={`px-3 py-2 rounded transition ${isActive('/reports')}`}>Reports</Link>
                    <button onClick={handleLogout} className="bg-white text-green-900 px-4 py-2 rounded font-bold hover:bg-gray-100 transition shadow">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
