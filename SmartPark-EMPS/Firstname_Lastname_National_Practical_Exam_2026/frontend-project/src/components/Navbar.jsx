import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="bg-blue-800 text-white shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-xl font-bold flex items-center gap-2"><span>👔</span> EPMS - SmartPark</div>
                <div className="flex gap-6 items-center">
                    <Link to="/departments" className="hover:text-blue-200 font-medium transition">Departments</Link>
                    <Link to="/employees" className="hover:text-blue-200 font-medium transition">Employees</Link>
                    <Link to="/salary" className="hover:text-blue-200 font-medium transition">Payroll</Link>
                    <Link to="/reports" className="hover:text-blue-200 font-medium transition">Reports</Link>
                    <button onClick={handleLogout} className="bg-red-500 px-4 py-1.5 rounded font-bold hover:bg-red-600 transition shadow-sm text-sm">Logout</button>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
