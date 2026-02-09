import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const Reports = () => {
    const [report, setReport] = useState([]);

    useEffect(() => {
        api.get('/reports/daily').then(res => setReport(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6 text-red-800 border-b pb-2">📊 Daily Revenue Report</h2>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-red-800">
                    <table className="w-full text-left">
                        <thead className="bg-red-50 text-red-900 border-b-2 border-red-100">
                            <tr>
                                <th className="p-4 font-semibold">Plate Number</th>
                                <th className="p-4 font-semibold">Entry Time</th>
                                <th className="p-4 font-semibold">Exit Time</th>
                                <th className="p-4 font-semibold">Duration</th>
                                <th className="p-4 font-semibold">Amount Paid</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {report.map((item, idx) => (
                                <tr key={idx} className="hover:bg-red-50 transition">
                                    <td className="p-4 font-medium text-gray-800">{item.plateNumber}</td>
                                    <td className="p-4 text-gray-600">{new Date(item.entryTime).toLocaleTimeString()}</td>
                                    <td className="p-4 text-gray-600">{new Date(item.exitTime).toLocaleTimeString()}</td>
                                    <td className="p-4 text-gray-600">{item.duration} Hrs</td>
                                    <td className="p-4 font-bold text-red-700">{item.amountPaid.toLocaleString()} RWF</td>
                                </tr>
                            ))}
                            {report.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-gray-500 italic">No payments recorded today.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reports;
