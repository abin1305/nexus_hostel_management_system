import React, { useContext, useState } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    FileText, 
    CheckCircle, 
    CreditCard, 
    Download, 
    Printer, 
    ShieldCheck, 
    AlertTriangle, 
    Check, 
    X, 
    Clock, 
    Utensils 
} from 'lucide-react';

const MonthlyBill = () => {
    const { 
        currentStudent, 
        getStudentBill, 
        messCuts, 
        payBill, 
        paymentDeadlineDay, 
        lateFinePerDay 
    } = useContext(MessContext);

    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI');
    const [upiId, setUpiId] = useState('student@upi');
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

    const bill = getStudentBill(currentStudent.id);

    // Filter approved 7+ day cuts for this student
    const approvedEligibleCuts = messCuts.filter(c => 
        c.studentId === currentStudent.id && 
        c.status === 'Approved' && 
        c.isEligibleForDiscount
    );

    const handleConfirmPayment = () => {
        payBill(currentStudent.id, selectedPaymentMethod);
        setIsPaymentModalOpen(false);
        setIsReceiptModalOpen(true);
    };

    const handlePrintReceipt = () => {
        window.print();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            Monthly Mess Invoice & Breakdown
                        </h2>
                        <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                            October 2026
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Itemized statement for {currentStudent.name} (Room {currentStudent.room} • {currentStudent.block}).
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {bill.isPaid ? (
                        <button
                            onClick={() => setIsReceiptModalOpen(true)}
                            className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-4 py-2.5 rounded-2xl flex items-center gap-2 hover:bg-emerald-100 transition-all"
                        >
                            <Download className="w-4 h-4" /> Download Paid Receipt
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsPaymentModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-2xl shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-105"
                        >
                            <CreditCard className="w-4 h-4" /> Pay Bill Now (₹{bill.netPayable.toLocaleString()})
                        </button>
                    )}
                </div>
            </div>

            {/* Payment Deadline & Late Fine Alert Card */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs ${
                bill.overdueDays > 0 
                    ? 'bg-rose-50 border-rose-200 text-rose-900' 
                    : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl text-white font-bold ${bill.overdueDays > 0 ? 'bg-rose-600' : 'bg-amber-500'}`}>
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-extrabold text-sm">
                            {bill.overdueDays > 0 
                                ? `⚠️ Payment Overdue! ${bill.overdueDays} Days Late` 
                                : `⏰ Payment Deadline: Pay Before 10th of Every Month`}
                        </h4>
                        <p className="mt-0.5 font-medium">
                            {bill.overdueDays > 0 
                                ? `As per hostel policy, a late fine of ₹${lateFinePerDay}/day (+₹${bill.lateFine}) has been added to your bill.` 
                                : `Pay before 10th October to avoid ₹${lateFinePerDay}/day late payment fine.`}
                        </p>
                    </div>
                </div>

                {bill.overdueDays > 0 && (
                    <span className="bg-rose-600 text-white font-black text-xs px-3 py-1.5 rounded-xl shrink-0">
                        Late Fine: +₹{bill.lateFine}
                    </span>
                )}
            </div>

            {/* Main Pure White Invoice Card */}
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-8 print:shadow-none print:border-none">
                {/* Invoice Header Details */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-100 pb-8">
                    <div>
                        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xl">
                            <Utensils className="w-6 h-6 text-blue-600" /> HostelMess<span className="text-blue-600">Pro</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Central University Boys Hostel Mess</p>
                        <p className="text-xs text-slate-500">{currentStudent.block}, Room {currentStudent.room} ({currentStudent.bed})</p>
                    </div>

                    <div className="text-left sm:text-right">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">INVOICE STATEMENT</span>
                        <span className="text-base font-extrabold text-slate-900 font-mono">INV-2026-10-0{currentStudent.room}</span>
                        <p className="text-xs text-slate-500 mt-1">Billing Cycle: Oct 01 - Oct 31, 2026</p>
                        <p className="text-xs font-semibold text-rose-600">Pay Due Date: Oct 10, 2026</p>
                    </div>
                </div>

                {/* Student Room Allocation Details Box */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                        <span className="text-slate-500 block">Resident Student</span>
                        <span className="font-bold text-slate-900 text-sm">{currentStudent.name}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 block">Room Allocation</span>
                        <span className="font-semibold text-slate-800">{currentStudent.block}, Room {currentStudent.room}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 block">Bed & Room Type</span>
                        <span className="font-semibold text-slate-800">{currentStudent.bed} ({currentStudent.roomType})</span>
                    </div>
                    <div>
                        <span className="text-slate-500 block">Room Rent Policy</span>
                        <span className="font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" /> ₹0.00 (No Rent Added)
                        </span>
                    </div>
                </div>

                {/* Itemized Line Items Table */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Line Items Breakdown</h3>
                    
                    <div className="border border-slate-200 rounded-2xl overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 text-xs font-bold border-b border-slate-200">
                                    <th className="py-3 px-4">Item Description</th>
                                    <th className="py-3 px-4">Calculation Basis</th>
                                    <th className="py-3 px-4 text-right">Amount (₹)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {/* Line Item 1: Base Fixed Monthly Fee */}
                                <tr className="hover:bg-slate-50/50">
                                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                                        Fixed Monthly Mess Subscription Fee
                                        <span className="block text-[11px] text-slate-500 font-normal">
                                            Standard monthly food subscription
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-slate-600">Fixed Monthly Rate</td>
                                    <td className="py-3.5 px-4 text-right font-extrabold text-slate-900">
                                        ₹{bill.baseMonthlyFee.toLocaleString()}.00
                                    </td>
                                </tr>

                                {/* Line Item 2: Room Rent (Strictly ₹0) */}
                                <tr className="bg-emerald-50/20 hover:bg-emerald-50/40">
                                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                                        Hostel Room Rent Charge
                                        <span className="block text-[11px] text-emerald-700 font-normal">
                                            ✔ Hostel Policy: Room Rent is 0. Only Mess Charges included.
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-emerald-700 font-medium">Waived / Free</td>
                                    <td className="py-3.5 px-4 text-right font-extrabold text-emerald-600">
                                        ₹0.00
                                    </td>
                                </tr>

                                {/* Line Item 3: Approved Mess Cuts Deduction */}
                                <tr className="hover:bg-slate-50/50">
                                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                                        Mess Cut Deductions (7+ Continuous Days)
                                        {approvedEligibleCuts.length > 0 ? (
                                            <div className="mt-1 space-y-1">
                                                {approvedEligibleCuts.map(cut => (
                                                    <span key={cut.id} className="block text-[11px] text-emerald-700">
                                                        • {cut.reason} ({cut.startDate} to {cut.endDate} = {cut.totalDays} days)
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="block text-[11px] text-slate-400 font-normal">
                                                No approved 7+ day continuous mess cuts for this month
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3.5 px-4 text-slate-600">
                                        {bill.approvedCutsCount} Eligible Cut(s)
                                    </td>
                                    <td className="py-3.5 px-4 text-right font-extrabold text-indigo-600">
                                        - ₹{bill.messCutDeduction.toLocaleString()}.00
                                    </td>
                                </tr>

                                {/* Line Item 4: Late Fine if overdue past 10th */}
                                {bill.lateFine > 0 && (
                                    <tr className="bg-rose-50/30 hover:bg-rose-50/50">
                                        <td className="py-3.5 px-4 font-semibold text-rose-900">
                                            Late Payment Fine (Past 10th Deadline)
                                            <span className="block text-[11px] text-rose-700 font-normal">
                                                Overdue by {bill.overdueDays} days @ ₹{lateFinePerDay}/day fine
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-rose-700 font-medium">
                                            {bill.overdueDays} Days Late
                                        </td>
                                        <td className="py-3.5 px-4 text-right font-extrabold text-rose-600">
                                            + ₹{bill.lateFine.toLocaleString()}.00
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Net Bill Total Footer Box */}
                <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">TOTAL NET PAYABLE AMOUNT</span>
                        <h4 className="text-3xl font-black mt-0.5">₹{bill.netPayable.toLocaleString()}.00</h4>
                        <p className="text-xs text-slate-400 mt-1">Includes ₹0 room rent. Deadline: 10th of month.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {bill.isPaid ? (
                            <span className="bg-emerald-500 text-white font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md">
                                <CheckCircle className="w-4 h-4" /> INVOICE PAID
                            </span>
                        ) : (
                            <button
                                onClick={() => setIsPaymentModalOpen(true)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105"
                            >
                                Pay Now (₹{bill.netPayable.toLocaleString()})
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {isPaymentModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6 border border-slate-200">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-blue-600" /> Digital Mess Bill Payment
                            </h3>
                            <button onClick={() => setIsPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-xs text-slate-500 block">Total Amount to Pay</span>
                            <span className="text-2xl font-black text-slate-900">₹{bill.netPayable.toLocaleString()}</span>
                            {bill.lateFine > 0 && (
                                <span className="text-xs text-rose-600 font-bold block">Includes ₹{bill.lateFine} late fine ({bill.overdueDays} days late past 10th)</span>
                            )}
                        </div>

                        {/* Payment Method Selector */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                                Select Payment Method
                            </label>
                            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                                {['UPI', 'Card', 'NetBanking'].map(method => (
                                    <button
                                        key={method}
                                        onClick={() => setSelectedPaymentMethod(method)}
                                        className={`py-2.5 rounded-xl border transition-all ${
                                            selectedPaymentMethod === method 
                                                ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold' 
                                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleConfirmPayment}
                            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all"
                        >
                            <Check className="w-4 h-4" /> Confirm Payment & Save to History
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonthlyBill;
