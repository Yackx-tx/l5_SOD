import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const Exit = () => {
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        api.get('/slot').then(res => setSlots(res.data.filter(s => s.slotStatus === 'Occupied')));
    }, []);

    const handlePreview = async () => {
        if (!selectedSlot) return;
        try {
            const res = await api.get(`/exit-preview/${selectedSlot}`);
            setPreview(res.data);
        } catch (err) {
            alert(err.response?.data?.error || 'Error fetching details');
        }
    };

    const handlePayment = async () => {
        if (!preview) return;
        try {
            await api.post('/payment', { recordId: preview.recordId, amountPaid: preview.amount });
            alert('Payment Successful & Exit Recorded');
            setPreview(null);
            setSelectedSlot('');
            api.get('/slot').then(res => setSlots(res.data.filter(s => s.slotStatus === 'Occupied')));
        } catch (err) {
            alert('Payment Failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6 text-red-800 border-b pb-2">🛑 Vehicle Exit & Payment</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Selection */}
                    <div className="card h-fit">
                        <label className="block mb-2 font-bold text-gray-700">Select Occupied Slot to Exit</label>
                        <div className="flex gap-2">
                            <select className="input bg-white" value={selectedSlot} onChange={e => setSelectedSlot(e.target.value)}>
                                <option value="">-- Select Slot --</option>
                                {slots.map(s => <option key={s._id} value={s.slotNumber}>{s.slotNumber}</option>)}
                            </select>
                            <button onClick={handlePreview} className="btn bg-gray-800 hover:bg-black text-white px-6">Calculate</button>
                        </div>
                    </div>

                    {/* Bill Preview */}
                    {preview && (
                        <div className="bg-white p-8 rounded-lg shadow-xl border-t-8 border-red-800">
                            <h3 className="text-2xl font-bold mb-6 border-b pb-2 text-red-800">🧾 Parking Invoice</h3>
                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between border-b pb-2"><span className="font-semibold text-gray-600">Plate Number:</span> <span className="font-mono font-bold">{preview.plateNumber}</span></div>
                                <div className="flex justify-between border-b pb-2"><span className="font-semibold text-gray-600">Entry Time:</span> <span>{new Date(preview.entryTime).toLocaleTimeString()}</span></div>
                                <div className="flex justify-between border-b pb-2"><span className="font-semibold text-gray-600">Exit Time:</span> <span>{new Date(preview.exitTime).toLocaleTimeString()}</span></div>
                                <div className="flex justify-between border-b pb-2"><span className="font-semibold text-gray-600">Duration:</span> <span>{preview.duration} Hour(s)</span></div>
                                <div className="flex justify-between pt-4"><span className="font-bold text-gray-800 text-xl">Total Amount:</span> <span className="font-bold text-red-700 text-2xl">{preview.amount.toLocaleString()} RWF</span></div>
                            </div>
                            <button onClick={handlePayment} className="w-full btn mt-8 text-lg py-3 shadow-lg">
                                Confirm Payment & Release Vehicle
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Exit;
