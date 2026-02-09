import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Payments() {
    const [unpaidRecords, setUnpaidRecords] = useState([]);
    const [payments, setPayments] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [amount, setAmount] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [recordsRes, paymentsRes] = await Promise.all([
                api.get('/service-records'),
                api.get('/payments')
            ]);
            setUnpaidRecords(recordsRes.data.filter(r => r.paymentStatus !== 'PAID'));
            setPayments(paymentsRes.data.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)));
        } catch (e) { }
    };

    const handlePay = async (e) => {
        e.preventDefault();
        try {
            await api.post('/payments', {
                serviceRecordId: selectedRecord._id,
                amount: amount
            });
            fetchData();
            setSelectedRecord(null);
            setAmount('');
        } catch (err) {
            alert(err.response?.data?.error);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Pending Payments</h2>
                <div className="space-y-4">
                    {unpaidRecords.map(record => (
                        <div key={record._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
                            <div>
                                <div className="font-bold text-gray-800">{record.car?.plateNumber}</div>
                                <div className="text-sm text-gray-600">{record.service?.serviceName}</div>
                                <div className="text-xs text-red-500 mt-1 font-semibold">Due: {(record.cost - record.amountPaid).toLocaleString()} RWF</div>
                            </div>
                            <button
                                onClick={() => setSelectedRecord(record)}
                                className="bg-primary text-white hover:bg-secondary px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Pay
                            </button>
                        </div>
                    ))}
                    {unpaidRecords.length === 0 && <p className="text-gray-400 italic">No pending payments found.</p>}
                </div>
            </div>

            <div>
                {selectedRecord && (
                    <div className="glass-card p-6 mb-8 animate-slideDown border-l-4 border-l-accent sticky top-4 z-10">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Process Payment</h3>
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-600">Vehicle: <span className="font-semibold text-gray-800">{selectedRecord.car?.plateNumber}</span></p>
                            <p className="text-sm text-gray-600">Service: <span className="font-semibold text-gray-800">{selectedRecord.service?.serviceName}</span></p>
                            <p className="text-sm text-gray-600 mt-2">Total Cost: {selectedRecord.cost.toLocaleString()} RWF</p>
                            <p className="text-lg font-bold text-primary mt-1">Outstanding: {(selectedRecord.cost - selectedRecord.amountPaid).toLocaleString()} RWF</p>
                        </div>
                        <form onSubmit={handlePay} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Pay (RWF)</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    max={selectedRecord.cost - selectedRecord.amountPaid}
                                    placeholder="Enter amount"
                                    required
                                />
                            </div>
                            <div className="flex space-x-2">
                                <button type="button" onClick={() => setSelectedRecord(null)} className="flex-1 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 btn-primary">Confirm Payment</button>
                            </div>
                        </form>
                    </div>
                )}

                <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Recent Transactions</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-gray-600">Date</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Amount</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Received By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {payments.map(p => (
                                <tr key={p._id} className="hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-600">{new Date(p.paymentDate).toLocaleDateString()} {new Date(p.paymentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td className="p-3 text-sm font-bold text-green-600">+{p.amount.toLocaleString()}</td>
                                    <td className="p-3 text-sm text-gray-600">{p.receivedBy?.username}</td>
                                </tr>
                            ))}
                            {payments.length === 0 && <tr><td colSpan="3" className="p-4 text-center text-gray-400">No transactions history</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
