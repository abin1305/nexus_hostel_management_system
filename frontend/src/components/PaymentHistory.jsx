import React, { useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    History, 
    CheckCircle2, 
    FileText, 
    Download, 
    Printer, 
    ShieldCheck, 
    AlertCircle, 
    CreditCard 
} from 'lucide-react';

const PaymentHistory = () => {
    const { 
        paymentHistory, 
        currentStudent, 
        userRole 
    } = useContext(MessContext);

    // Filter payment history for current student if student role
    const filteredPayments = userRole === 'student' 
        ? paymentHistory.filter(p => p.studentId === currentStudent.id) 
        : paymentHistory;

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            Mess Fee Payment History & Ledger
                        </h2>
                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                            Verified Ledger
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Historical transactions record including base monthly fee, 0 room rent policy, approved mess cuts, and late fine logs.
                    </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-center shrink-0">
                    <span className="text-[11px] font-semibold text-emerald-800 block">Total Completed Payments</span>
                    <span className="text-xl font-black text-emerald-600">{filteredPayments.length} Records</span>
                </div>
            </div>

            {/* Payment History Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                <th className="py-3.5 px-4">Student & Month</th>
                                <th className="py-3.5 px-4">Base Fee</th>
                                <th className="py-3.5 px-4">Room Rent</th>
                                <th className="py-3.5 px-4">Mess Cut Deduction</th>
                                <th className="py-3.5 px-4">Late Fine (Past 10th)</th>
                                <th className="py-3.5 px-4">Net Paid</th>
                                <th className="py-3.5 px-4">Payment Method & Ref</th>
                                <th className="py-3.5 px-4 text-center">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredPayments.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="py-8 text-center text-slate-400 font-medium">
                                        No historical payment records found.
                                    </td>
                                </tr>
                            ) : (
                                filteredPayments.map(p => (
                                    <tr key={p.id} className="hover:bg-slate-50/60 transition-all">
                                        <td className="py-4 px-4 space-y-0.5">
                                            <span className="font-extrabold text-slate-900 text-sm block">{p.studentName}</span>
                                            <span className="text-slate-500 font-medium block">{p.month}</span>
                                            <span className="text-[10px] text-slate-400 font-mono block">Paid on {p.paidAt}</span>
                                        </td>

                                        <td className="py-4 px-4 font-bold text-slate-800">
                                            ₹{p.baseMonthlyFee.toLocaleString()}
                                        </td>

                                        <td className="py-4 px-4 font-bold text-emerald-600">
                                            ₹0.00
                                        </td>

                                        <td className="py-4 px-4 font-semibold text-indigo-600">
                                            -₹{p.messCutDeduction.toLocaleString()}
                                        </td>

                                        <td className="py-4 px-4 font-semibold">
                                            {p.lateFine > 0 ? (
                                                <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                                                    +₹{p.lateFine} (Fine)
                                                </span>
                                            ) : (
                                                <span className="text-slate-400">₹0 (On Time)</span>
                                            )}
                                        </td>

                                        <td className="py-4 px-4 font-black text-slate-900 text-sm">
                                            ₹{p.netPaid.toLocaleString()}
                                        </td>

                                        <td className="py-4 px-4 space-y-0.5">
                                            <span className="font-bold text-slate-700 block">{p.paymentMethod}</span>
                                            <span className="font-mono text-[10px] text-slate-500 block">{p.transactionId}</span>
                                        </td>

                                        <td className="py-4 px-4 text-center">
                                            <button 
                                                onClick={() => window.print()} 
                                                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
                                                title="Print Receipt"
                                            >
                                                <Printer className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
