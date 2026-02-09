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
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md border-t-8 border-green-900">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-green-900">SmartPark Login</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center border border-red-200">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^[a-zA-Z0-9]*$/.test(val)) setUsername(val);
                            }}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="w-full btn-primary py-3 text-lg">Sign In</button>
                </form>
                <p className="mt-6 text-center text-gray-500 text-sm"> &copy; 2026 SmartPark Rwanda</p>
            </div>
        </div>
    );
};

export default Login;
