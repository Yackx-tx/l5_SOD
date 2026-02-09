import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const Reports = () => {
    const [report, setReport] = useState([]);

    useEffect(() => {
        api.get('/reports/payroll').then(res => setReport(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Navbar />
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold text-blue-900 border-b pb-2 mb-6">Generated Monthly Reports</h2>

                <div className="card overflow-hidden">
                    <h3 className="text-xl font-bold mb-4">Monthly Employee Payroll</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="p-3">Month</th>
                                    <th className="p-3">First Name</th>
                                    <th className="p-3">Last Name</th>
                                    <th className="p-3">Position</th>
                                    <th className="p-3">Department</th>
                                    <th className="p-3 text-right">Net Salary</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {report.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="p-3 font-semibold text-gray-600">{item.month}</td>
                                        <td className="p-3">{item.firstName}</td>
                                        <td className="p-3">{item.lastName}</td>
                                        <td className="p-3 text-sm">{item.position}</td>
                                        <td className="p-3 text-sm">{item.department}</td>
                                        <td className="p-3 font-bold text-right text-green-700">{item.netSalary.toLocaleString()} RWF</td>
                                    </tr>
                                ))}
                                {report.length === 0 && <tr><td colSpan="6" className="p-6 text-center text-gray-500">No payroll data available.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Reports;
