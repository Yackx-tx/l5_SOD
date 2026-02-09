import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const StockOut = () => {
    const [parts, setParts] = useState([]);
    const [stockOuts, setStockOuts] = useState([]);
    const [form, setForm] = useState({ sparePartId: '', quantity: '', unitPrice: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchData = async () => {
        const [pRes, sRes] = await Promise.all([api.get('/spare-parts'), api.get('/stock/out')]);
        setParts(pRes.data);
        setStockOuts(sRes.data);
        if (!form.sparePartId && pRes.data.length > 0) {
            setForm(f => ({ ...f, sparePartId: pRes.data[0]._id, unitPrice: pRes.data[0].unitPrice }));
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/stock/out/${editingId}`, form);
                setEditingId(null);
            } else {
                await api.post('/stock/out', form);
            }
            setForm({ ...form, quantity: '' });
            fetchData();
        } catch (err) {
            alert(err.response?.data?.error || 'Operation failed');
        }
    };

    const handleEdit = (record) => {
        setEditingId(record._id);
        setForm({
            sparePartId: record.sparePart?._id || record.sparePart,
            quantity: record.quantity,
            unitPrice: record.unitPrice
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this record? This will return items to stock.')) return;
        try {
            await api.delete(`/stock/out/${id}`);
            fetchData();
        } catch (err) {
            alert('Delete failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Navbar />
            <div className="container mx-auto p-6 space-y-8">
                <h2 className="text-3xl font-bold text-green-900 border-l-4 border-green-900 pl-4">Stock Out (Usage/Sales)</h2>

                {/* Form */}
                <div className="card max-w-4xl mx-auto border-t-4 border-t-red-700">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{editingId ? 'Edit Transaction' : 'Record New Transaction'}</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Spare Part</label>
                            <select className="input-field bg-white" value={form.sparePartId} disabled={!!editingId} onChange={e => {
                                const part = parts.find(p => p._id === e.target.value);
                                setForm({ ...form, sparePartId: e.target.value, unitPrice: part ? part.unitPrice : '' });
                            }}>
                                {parts.map(p => <option key={p._id} value={p._id}>{p.name} (Available: {p.quantity})</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity</label>
                            <input type="number" className="input-field" value={form.quantity} onChange={e => {
                                const val = e.target.value;
                                if (/^[0-9]*$/.test(val)) setForm({ ...form, quantity: val });
                            }} required min="1" placeholder="Qty" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Unit Price</label>
                            <input type="number" className="input-field" value={form.unitPrice} onChange={e => {
                                const val = e.target.value;
                                if (/^[0-9]*$/.test(val)) setForm({ ...form, unitPrice: val });
                            }} required placeholder="Price" />
                        </div>

                        <div className="md:col-span-4 flex gap-3">
                            <button className="flex-1 bg-red-600 text-white py-2 rounded font-semibold shadow hover:bg-red-700 transition">
                                {editingId ? 'Update Record' : 'Record Stock Out'}
                            </button>
                            {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ ...form, quantity: '' }); }} className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">Cancel</button>}
                        </div>
                    </form>
                </div>

                {/* List */}
                <div className="card overflow-hidden">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Stock Out History</h3>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-left">
                            <thead className="bg-red-800 text-white">
                                <tr>
                                    <th className="p-4 font-semibold">Date</th>
                                    <th className="p-4 font-semibold">Part Detail</th>
                                    <th className="p-4 font-semibold">Quantity</th>
                                    <th className="p-4 font-semibold">Unit Price</th>
                                    <th className="p-4 font-semibold">Total</th>
                                    <th className="p-4 font-semibold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {stockOuts.map(s => (
                                    <tr key={s._id} className="hover:bg-red-50 transition">
                                        <td className="p-4 text-gray-600">{new Date(s.date).toLocaleDateString()}</td>
                                        <td className="p-4 font-medium text-gray-800">{s.sparePart?.name}</td>
                                        <td className="p-4 font-bold text-red-600">-{s.quantity}</td>
                                        <td className="p-4">{s.unitPrice.toLocaleString()}</td>
                                        <td className="p-4 font-semibold">{s.totalPrice.toLocaleString()}</td>
                                        <td className="p-4 flex justify-center gap-3">
                                            <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                                            <button onClick={() => handleDelete(s._id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockOut;
