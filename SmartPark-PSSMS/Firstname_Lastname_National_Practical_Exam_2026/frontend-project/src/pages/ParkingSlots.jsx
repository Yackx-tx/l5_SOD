import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const ParkingSlots = () => {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        api.get('/slot').then(res => setSlots(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-8 text-red-800 border-b pb-2">🅿️ Parking Slots Status</h2>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {slots.map(slot => (
                        <div key={slot._id} className={`p-6 rounded-lg shadow-md border-2 text-center transition transform hover:scale-105 ${slot.slotStatus === 'Available' ? 'bg-white border-green-500' : 'bg-red-50 border-red-500'}`}>
                            <div className="text-2xl font-extrabold mb-3 text-gray-800">{slot.slotNumber}</div>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${slot.slotStatus === 'Available' ? 'bg-green-500 text-white' : 'bg-red-600 text-white'}`}>
                                {slot.slotStatus}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ParkingSlots;
