import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="bg-red-800 text-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-xl font-bold flex items-center gap-2"><span>🚘</span> SmartPark PSSMS</div>
                <div className="flex gap-6 items-center">
                    <Link to="/slots" className="hover:text-red-200 font-medium">Slots</Link>
                    <Link to="/entry" className="hover:text-red-200 font-medium">Entry</Link>
                    <Link to="/exit" className="hover:text-red-200 font-medium">Exit</Link>
                    <Link to="/reports" className="hover:text-red-200 font-medium">Reports</Link>
                    <button onClick={handleLogout} className="bg-white text-red-800 px-4 py-1.5 rounded font-bold hover:bg-gray-100 transition shadow-sm">Logout</button>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
