import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const Reports = () => {
    const [statusReport, setStatusReport] = useState([]);
    const [dailyOut, setDailyOut] = useState([]);

    useEffect(() => {
        api.get('/stock/reports/status').then(res => setStatusReport(res.data));
        api.get('/stock/reports/daily-out').then(res => setDailyOut(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Navbar />
            <div className="container mx-auto p-6 space-y-8">
                <h2 className="text-3xl font-bold text-green-900 border-l-4 border-green-900 pl-4 mb-8">System Reports</h2>

                {/* Daily Stock Status */}
                <div className="card shadow-lg mb-8">
                    <h3 className="text-xl font-bold mb-6 text-green-900 flex items-center gap-2">
                        <span>📋</span> Daily Stock Status Report
                    </h3>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-left">
                            <thead className="bg-green-100 text-green-900">
                                <tr>
                                    <th className="p-4 font-semibold border-b-2 border-green-200">Spare Part Name</th>
                                    <th className="p-4 font-semibold border-b-2 border-green-200">Total Stored (Historical)</th>
                                    <th className="p-4 font-semibold border-b-2 border-green-200">Total Stock Out</th>
                                    <th className="p-4 font-semibold border-b-2 border-green-200">Remaining Quantity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {statusReport.map(item => (
                                    <tr key={item._id} className="hover:bg-gray-50">
                                        <td className="p-4 font-medium text-gray-800">{item.name}</td>
                                        <td className="p-4 text-gray-600">{item.calculatedTotalStored}</td>
                                        <td className="p-4 text-red-600 font-medium">{item.totalStockOut}</td>
                                        <td className="p-4 font-bold text-green-700 bg-green-50">{item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Daily Stock Out Report */}
                <div className="card shadow-lg">
                    <h3 className="text-xl font-bold mb-6 text-red-800 flex items-center gap-2">
                        <span>📉</span> Daily Stock Out Report (Today)
                    </h3>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-left">
                            <thead className="bg-red-50 text-red-900">
                                <tr>
                                    <th className="p-4 font-semibold border-b-2 border-red-200">Spare Part Name</th>
                                    <th className="p-4 font-semibold border-b-2 border-red-200">Qty Out</th>
                                    <th className="p-4 font-semibold border-b-2 border-red-200">Unit Price</th>
                                    <th className="p-4 font-semibold border-b-2 border-red-200">Total Price</th>
                                    <th className="p-4 font-semibold border-b-2 border-red-200">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {dailyOut.map(item => (
                                    <tr key={item._id} className="hover:bg-gray-50">
                                        <td className="p-4 font-medium text-gray-800">{item.sparePart?.name}</td>
                                        <td className="p-4 text-gray-800">{item.quantity}</td>
                                        <td className="p-4 text-gray-600">{item.unitPrice.toLocaleString()}</td>
                                        <td className="p-4 font-semibold">{item.totalPrice.toLocaleString()}</td>
                                        <td className="p-4 text-sm text-gray-500">{new Date(item.date).toLocaleTimeString()}</td>
                                    </tr>
                                ))}
                                {dailyOut.length === 0 && <tr><td colSpan="5" className="p-6 text-center text-gray-400 italic">No stock out transactions recorded today</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
