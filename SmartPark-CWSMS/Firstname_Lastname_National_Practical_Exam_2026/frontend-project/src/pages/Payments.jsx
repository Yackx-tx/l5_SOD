import { useState, useEffect } from 'react';
import api from '../api';
import { CreditCard, Printer, FileText, CheckCircle } from 'lucide-react';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [services, setServices] = useState([]); // Services that haven't been paid yet
    const [formData, setFormData] = useState({
        serviceRecordId: '',
        amountPaid: '',
        paymentDate: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);
    const [showReceipt, setShowReceipt] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [paymentsRes, servicesRes] = await Promise.all([
                api.get('/payments'),
                api.get('/services')
            ]);

            // Filter services to show only those not in payments (simple logic for exam)
            const paidServiceIds = paymentsRes.data.map(p => p.serviceRecordId?._id);
            const unpaidServices = servicesRes.data.filter(s => !paidServiceIds.includes(s._id));

            setPayments(paymentsRes.data);
            setServices(unpaidServices);
        } catch (err) {
            console.error('Error fetching data', err);
        }
    };

    const handleServiceChange = (e) => {
        const serviceId = e.target.value;
        const selectedService = services.find(s => s._id === serviceId);
        setFormData({
            ...formData,
            serviceRecordId: serviceId,
            amountPaid: selectedService ? selectedService.packageId.packagePrice : ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/payments', formData);
            alert('Payment recorded successfully!');
            setFormData({
                serviceRecordId: '',
                amountPaid: '',
                paymentDate: new Date().toISOString().split('T')[0]
            });
            fetchData();
        } catch (err) {
            alert('Error recording payment');
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = (payment) => {
        setShowReceipt(payment);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="card sticky top-24">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                <CreditCard size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Process Payment</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-group">
                                <label className="form-label">Select Unpaid Service</label>
                                <select
                                    name="serviceRecordId"
                                    className="form-input"
                                    required
                                    value={formData.serviceRecordId}
                                    onChange={handleServiceChange}
                                >
                                    <option value="">Select Service Record</option>
                                    {services.map(s => (
                                        <option key={s._id} value={s._id}>
                                            {s.carId?.plateNumber} - {s.packageId?.packageName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Amount Paid (RWF)</label>
                                <input
                                    type="number"
                                    name="amountPaid"
                                    className="form-input bg-slate-50 font-bold"
                                    required
                                    readOnly
                                    value={formData.amountPaid}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Payment Date</label>
                                <input
                                    type="date"
                                    name="paymentDate"
                                    className="form-input"
                                    required
                                    value={formData.paymentDate}
                                    onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !formData.serviceRecordId}
                                className="w-full btn bg-emerald-600 text-white hover:bg-emerald-700 py-3 font-bold mt-2 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Processing...' : (
                                    <>
                                        <CheckCircle size={20} />
                                        Confirm Payment
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* History Section */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Payment History</h2>
                    <div className="space-y-4">
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <div key={payment._id} className="card flex flex-col md:flex-row justify-between items-center group transition-all hover:border-emerald-200">
                                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">{payment.serviceRecordId?.carId?.plateNumber}</div>
                                            <div className="text-xs text-slate-500">
                                                {payment.serviceRecordId?.packageId?.packageName} • {new Date(payment.paymentDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-lg font-black text-emerald-700">
                                            {payment.amountPaid?.toLocaleString()} <span className="text-xs font-normal">RWF</span>
                                        </div>
                                        <button
                                            onClick={() => handlePrint(payment)}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                                            title="Print Bill"
                                        >
                                            <Printer size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center bg-white rounded-xl border border-dashed border-slate-300 text-slate-400">
                                No payments recorded yet
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bill/Receipt Modal (Simple implementation) */}
            {showReceipt && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-8 border-t-8 border-violet-600">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-widest">SmartPark Bill</h2>
                            <p className="text-sm text-slate-500">Invoice #{showReceipt._id.slice(-6).toUpperCase()}</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                                <span className="text-slate-500">Date:</span>
                                <span className="font-bold">{new Date(showReceipt.paymentDate).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                                <span className="text-slate-500">Plate Number:</span>
                                <span className="font-bold">{showReceipt.serviceRecordId?.carId?.plateNumber}</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                                <span className="text-slate-500">Driver:</span>
                                <span className="font-bold">{showReceipt.serviceRecordId?.carId?.driverName}</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                                <span className="text-slate-500">Service:</span>
                                <span className="font-bold">{showReceipt.serviceRecordId?.packageId?.packageName}</span>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center mb-8">
                            <span className="font-bold text-slate-600">TOTAL PAID</span>
                            <span className="text-2xl font-black text-violet-700">{showReceipt.amountPaid?.toLocaleString()} RWF</span>
                        </div>

                        <div className="text-center space-y-4">
                            <p className="text-xs text-slate-400 italic">Thank you for choosing SmartPark!</p>
                            <div className="flex gap-2">
                                <button onClick={() => window.print()} className="flex-1 btn-primary py-2.5 flex items-center justify-center gap-2">
                                    <Printer size={18} /> Print
                                </button>
                                <button onClick={() => setShowReceipt(null)} className="flex-1 btn bg-slate-200 text-slate-800 py-2.5">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payments;
