import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';

const Entry = () => {
    const [slots, setSlots] = useState([]);
    const [form, setForm] = useState({ plateNumber: '', driverName: '', phoneNumber: '', slotNumber: '' });
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/slot').then(res => setSlots(res.data.filter(s => s.slotStatus === 'Available')));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/entry', form);
            alert('Vehicle Entry Recorded!');
            navigate('/slots');
        } catch (err) {
            alert(err.response?.data?.error || 'Entry failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6 flex justify-center">
                <div className="w-full max-w-lg card">
                    <h2 className="text-2xl font-bold mb-6 text-red-800">🚗 Vehicle Entry Form</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block mb-1 font-semibold text-gray-700">Car Plate Number</label>
                            <input type="text" className="input uppercase font-mono tracking-wider" value={form.plateNumber} onChange={e => {
                                const val = e.target.value.toUpperCase();
                                if (/^[A-Z0-9 ]*$/.test(val)) setForm({ ...form, plateNumber: val });
                            }} required placeholder="RAC 123 A" />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold text-gray-700">Driver Name</label>
                            <input type="text" className="input" value={form.driverName} onChange={e => {
                                const val = e.target.value;
                                if (/^[a-zA-Z ]*$/.test(val)) setForm({ ...form, driverName: val });
                            }} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold text-gray-700">Phone Number</label>
                            <input type="text" className="input" value={form.phoneNumber} onChange={e => {
                                const val = e.target.value;
                                if (/^[0-9+ ]*$/.test(val)) setForm({ ...form, phoneNumber: val });
                            }} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold text-gray-700">Select Parking Slot</label>
                            <select className="input bg-white" value={form.slotNumber} onChange={e => setForm({ ...form, slotNumber: e.target.value })} required>
                                <option value="">-- Choose Slot --</option>
                                {slots.map(s => <option key={s._id} value={s.slotNumber}>{s.slotNumber}</option>)}
                            </select>
                        </div>
                        <button className="w-full btn mt-4 text-lg">Confirm Entry</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Entry;
