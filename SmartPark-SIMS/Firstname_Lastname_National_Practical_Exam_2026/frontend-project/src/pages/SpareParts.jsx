import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const SpareParts = () => {
    const [parts, setParts] = useState([]);
    const [newPart, setNewPart] = useState({ name: '', category: '', unitPrice: '' });

    const fetchParts = async () => {
        try {
            const res = await api.get('/spare-parts');
            setParts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchParts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/spare-parts', newPart);
            setNewPart({ name: '', category: '', unitPrice: '' });
            fetchParts();
        } catch (err) {
            alert('Error creating part');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Navbar />
            <div className="container mx-auto p-6 space-y-8">
                <header className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-green-900 border-l-4 border-green-900 pl-4">Spare Parts Management</h2>
                </header>

                {/* Add Part Form */}
                <div className="card max-w-4xl mx-auto">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Register New Spare Part</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <div className="md:col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Part Name</label>
                            <input type="text" className="input-field" placeholder="e.g. Brake Pad" value={newPart.name} onChange={e => {
                                const val = e.target.value;
                                if (/^[a-zA-Z0-9 ]*$/.test(val)) setNewPart({ ...newPart, name: val });
                            }} required />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                            <input type="text" className="input-field" placeholder="e.g. Brakes" value={newPart.category} onChange={e => {
                                const val = e.target.value;
                                if (/^[a-zA-Z0-9 ]*$/.test(val)) setNewPart({ ...newPart, category: val });
                            }} required />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Unit Price (RWF)</label>
                            <input type="number" className="input-field" placeholder="0" value={newPart.unitPrice} onChange={e => {
                                const val = e.target.value;
                                if (/^[0-9]*$/.test(val)) setNewPart({ ...newPart, unitPrice: val });
                            }} required />
                        </div>
                        <div className="md:col-span-1">
                            <button className="w-full btn-primary h-[42px]">Add Part</button>
                        </div>
                    </form>
                </div>

                {/* List */}
                <div className="card overflow-hidden">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Inventory List</h3>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-green-900 text-white">
                                    <th className="p-4 font-semibold">Name</th>
                                    <th className="p-4 font-semibold">Category</th>
                                    <th className="p-4 font-semibold">Quantity In Stock</th>
                                    <th className="p-4 font-semibold">Unit Price (RWF)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {parts.map((part, index) => (
                                    <tr key={part._id} className={`hover:bg-green-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                        <td className="p-4 font-medium text-gray-800">{part.name}</td>
                                        <td className="p-4 text-gray-600"><span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full text-xs font-bold uppercase">{part.category}</span></td>
                                        <td className="p-4 font-bold text-green-700 text-lg">{part.quantity}</td>
                                        <td className="p-4 text-gray-700">{part.unitPrice.toLocaleString()}</td>
                                    </tr>
                                ))}
                                {parts.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-gray-500">No spare parts found. Add one above.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpareParts;
