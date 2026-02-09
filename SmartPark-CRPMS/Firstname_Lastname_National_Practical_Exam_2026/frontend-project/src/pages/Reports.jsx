import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Reports() {
    const [dailyReport, setDailyReport] = useState([]);
    const [bills, setBills] = useState([]);
    const [tab, setTab] = useState('daily');

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const [dailyRes, billsRes] = await Promise.all([
                api.get('/reports/daily-payments'),
                api.get('/reports/service-bills')
            ]);
            setDailyReport(dailyRes.data);
            setBills(billsRes.data);
        } catch (e) { }
    };

    return (
        <div>
            <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-2">
                <button
                    onClick={() => setTab('daily')}
                    className={`pb-2 px-4 font-medium transition-colors ${tab === 'daily' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Daily Service Payment Report
                </button>
                <button
                    onClick={() => setTab('bills')}
                    className={`pb-2 px-4 font-medium transition-colors ${tab === 'bills' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Service Bills
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {tab === 'daily' ? (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600">Plate Number</th>
                                <th className="p-4 font-semibold text-gray-600">Service Name</th>
                                <th className="p-4 font-semibold text-gray-600">Service Date</th>
                                <th className="p-4 font-semibold text-gray-600">Amount Paid</th>
                                <th className="p-4 font-semibold text-gray-600">Payment Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {dailyReport.map((r, i) => (
                                <tr key={i} className="hover:bg-gray-50 text-sm">
                                    <td className="p-4 font-medium text-gray-800">{r.plateNumber}</td>
                                    <td className="p-4 text-gray-600">{r.serviceName}</td>
                                    <td className="p-4 text-gray-500">{new Date(r.serviceDate).toLocaleDateString()}</td>
                                    <td className="p-4 font-bold text-green-600">{r.amountPaid?.toLocaleString()} RWF</td>
                                    <td className="p-4 text-gray-500">{new Date(r.paymentDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {dailyReport.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-gray-400">No payments today</td></tr>}
                        </tbody>
                    </table>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600">Plate Number</th>
                                <th className="p-4 font-semibold text-gray-600">Service</th>
                                <th className="p-4 font-semibold text-gray-600">Date</th>
                                <th className="p-4 font-semibold text-gray-600">Price</th>
                                <th className="p-4 font-semibold text-gray-600">Paid</th>
                                <th className="p-4 font-semibold text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bills.map((r, i) => (
                                <tr key={i} className="hover:bg-gray-50 text-sm">
                                    <td className="p-4 font-medium text-gray-800">{r.plateNumber}</td>
                                    <td className="p-4 text-gray-600">{r.serviceName}</td>
                                    <td className="p-4 text-gray-500">{new Date(r.serviceDate).toLocaleDateString()}</td>
                                    <td className="p-4 font-mono text-gray-600">{r.servicePrice?.toLocaleString()}</td>
                                    <td className="p-4 font-mono text-gray-600">{r.amountPaid?.toLocaleString()}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${r.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' :
                                                r.paymentStatus === 'PARTIAL' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {r.paymentStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {bills.length === 0 && <tr><td colSpan="6" className="p-8 text-center text-gray-400">No bills generated</td></tr>}
                        </tbody>
                    </table>
                )}
            </div>
            {tab === 'daily' && dailyReport.length > 0 && (
                <div className="mt-4 text-right">
                    <button onClick={() => window.print()} className="bg-primary text-white hover:bg-secondary px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Print Report
                    </button>
                </div>
            )}
        </div>
    );
}
