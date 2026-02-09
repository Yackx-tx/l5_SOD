import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const StockIn = () => {
    const [parts, setParts] = useState([]);
    const [form, setForm] = useState({ sparePartId: '', quantity: '', unitPrice: '' });

    useEffect(() => {
        api.get('/spare-parts').then(res => {
            setParts(res.data);
            if (res.data.length > 0) setForm(f => ({ ...f, sparePartId: res.data[0]._id, unitPrice: res.data[0].unitPrice }));
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/stock/in', form);
            alert('Stock In Successful');
            setForm({ ...form, quantity: '' });
        } catch (err) {
            alert(err.response?.data?.error || 'Error adding stock');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Navbar />
            <div className="container mx-auto p-6 max-w-3xl">
                <h2 className="text-3xl font-bold text-green-900 mb-6 border-l-4 border-green-900 pl-4">Stock In (Purchase)</h2>

                <div className="card">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Purchase Entry Form</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Spare Part</label>
                            <div className="relative">
                                <select className="input-field appearance-none bg-white" value={form.sparePartId} onChange={e => {
                                    const part = parts.find(p => p._id === e.target.value);
                                    setForm({ ...form, sparePartId: e.target.value, unitPrice: part ? part.unitPrice : '' });
                                }}>
                                    {parts.map(p => <option key={p._id} value={p._id}>{p.name} (Current Stock: {p.quantity})</option>)}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity Purchased</label>
                                <input type="number" className="input-field" value={form.quantity} onChange={e => {
                                    const val = e.target.value;
                                    if (/^[0-9]*$/.test(val)) setForm({ ...form, quantity: val });
                                }} required min="1" placeholder="Enter quantity" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit Cost (RWF)</label>
                                <input type="number" className="input-field" value={form.unitPrice} onChange={e => {
                                    const val = e.target.value;
                                    if (/^[0-9]*$/.test(val)) setForm({ ...form, unitPrice: val });
                                }} required placeholder="Enter unit cost" />
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <div className="flex justify-between items-center bg-green-50 p-4 rounded mb-4">
                                <span className="font-semibold text-green-900">Total Purchase Value:</span>
                                <span className="text-xl font-bold text-green-900">
                                    {((form.quantity || 0) * (form.unitPrice || 0)).toLocaleString()} RWF
                                </span>
                            </div>
                            <button className="w-full btn-primary py-3 text-lg shadow-lg">Confirm Stock In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StockIn;
