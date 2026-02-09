import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/entry');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-lg shadow-xl w-96 border-t-8 border-red-800">
                <h2 className="text-3xl font-bold mb-8 text-center text-red-800">SmartPark PSSMS Login</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center text-sm">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Username</label>
                        <input type="text" className="input" value={username} onChange={e => {
                            const val = e.target.value;
                            if (/^[a-zA-Z0-9]*$/.test(val)) setUsername(val);
                        }} required />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Password</label>
                        <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button className="w-full btn text-lg">Sign In</button>
                    <div className="text-xs text-center text-gray-400 mt-2">Default: admin / admin123</div>
                </form>
            </div>
        </div>
    );
};

export default Login;
