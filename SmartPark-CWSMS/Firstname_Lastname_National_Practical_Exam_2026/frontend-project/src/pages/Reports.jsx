import { useState, useEffect } from 'react';
import api from '../api';
import { BarChart, TrendingUp, Users, Calendar, Download } from 'lucide-react';

const Reports = () => {
    const [report, setReport] = useState(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchReport();
    }, [date]);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/reports/daily?date=${date}`);
            setReport(res.data);
        } catch (err) {
            console.error('Error fetching report', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Sales Reports</h2>
                    <p className="text-slate-500">Analyze daily car wash performance</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                    <Calendar className="text-slate-400 ml-2" size={18} />
                    <input
                        type="date"
                        className="form-input border-none focus:ring-0 w-auto"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>

            {report && (
                <div className="space-y-8 animate-in fade-in duration-500">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card bg-violet-600 text-white border-none shadow-violet-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-violet-100 text-sm font-medium mb-1">Total Revenue</p>
                                    <h3 className="text-3xl font-black">{report.totalRevenue.toLocaleString()} RWF</h3>
                                </div>
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <TrendingUp size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-slate-500 text-sm font-medium mb-1">Cars Washed</p>
                                    <h3 className="text-3xl font-black text-slate-800">{report.count}</h3>
                                </div>
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Users size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-slate-500 text-sm font-medium mb-1">Average / Car</p>
                                    <h3 className="text-3xl font-black text-slate-800">
                                        {report.count > 0 ? (report.totalRevenue / report.count).toLocaleString() : 0} RWF
                                    </h3>
                                </div>
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <BarChart size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Report Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800">Detailed Daily Log</h3>
                            <button
                                onClick={() => window.print()}
                                className="flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-700"
                            >
                                <Download size={16} /> Export PDF
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Vehicle</th>
                                        <th>Package</th>
                                        <th className="text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {report.reports.length > 0 ? (
                                        report.reports.map((p) => (
                                            <tr key={p._id}>
                                                <td className="text-slate-500 font-mono text-xs">
                                                    {new Date(p.paymentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </td>
                                                <td>
                                                    <div className="font-bold text-slate-700">{p.serviceRecordId?.carId?.plateNumber}</div>
                                                    <div className="text-xs text-slate-400 capitalize">{p.serviceRecordId?.carId?.driverName}</div>
                                                </td>
                                                <td>
                                                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                                                        {p.serviceRecordId?.packageId?.packageName}
                                                    </span>
                                                </td>
                                                <td className="text-right font-bold text-slate-900">
                                                    {p.amountPaid.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-20 text-slate-400">
                                                No transactions found for this date
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reports;
