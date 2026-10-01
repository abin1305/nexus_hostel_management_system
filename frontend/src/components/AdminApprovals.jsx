import React, { useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    CheckCircle2, 
    XCircle, 
    Clock, 
    ShieldCheck, 
    AlertTriangle, 
    User, 
    Calendar, 
    Check, 
    X 
} from 'lucide-react';

const AdminApprovals = () => {
    const { 
        messCuts, 
        updateMessCutStatus, 
        minContinuousDays, 
        monthlyFee 
    } = useContext(MessContext);

    const pendingCuts = messCuts.filter(c => c.status === 'Pending');
    const processedCuts = messCuts.filter(c => c.status !== 'Pending');

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                            Mess Cut Approvals Dashboard
                        </h2>
                        <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                            Hostel Warden Portal
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                        Review pending leave applications. The system automatically calculates 7-day continuous rule discount eligibility.
                    </p>
                </div>

                <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 text-center shrink-0">
                    <span className="text-[11px] font-semibold text-slate-400 block">Pending Applications</span>
                    <span className="text-2xl font-black text-amber-400">{pendingCuts.length}</span>
                </div>
            </div>

            {/* Pending Requests Section */}
            <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-500" /> Pending Requests Awaiting Action ({pendingCuts.length})
                </h3>

                {pendingCuts.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-xs">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                        <h4 className="text-base font-bold text-slate-800">All caught up!</h4>
                        <p className="text-xs text-slate-500 mt-1">No pending mess cut requests requiring approval right now.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {pendingCuts.map(cut => (
                            <div 
                                key={cut.id} 
                                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-extrabold text-slate-900 text-base">{cut.studentName}</h4>
                                            <p className="text-xs text-slate-500">
                                                Room Number: <strong className="text-slate-800">Room {cut.roomNumber}</strong> • Student ID: {cut.studentId}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 text-xs">
                                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-xl font-semibold flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-blue-500" /> {cut.startDate} to {cut.endDate}
                                        </span>
                                        <span className="bg-slate-900 text-white px-3 py-1 rounded-xl font-extrabold">
                                            {cut.totalDays} Days Continuous
                                        </span>
                                        <span className="text-slate-600 font-medium">Reason: {cut.reason}</span>
                                    </div>

                                    {/* 7-Day Discount Status Rule Card */}
                                    {cut.isEligibleForDiscount ? (
                                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 space-y-1">
                                            <div className="font-bold flex items-center gap-1.5">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                Eligible for Bill Discount (≥ {minContinuousDays} Days Rule Passed)
                                            </div>
                                            <p className="text-[11px] text-emerald-800">
                                                Approving this will deduct <strong>-₹{cut.reductionAmount}</strong> from {cut.studentName}'s monthly food bill.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1">
                                            <div className="font-bold flex items-center gap-1.5">
                                                <AlertTriangle className="w-4 h-4 text-amber-600" />
                                                Not Eligible for Discount (&lt; {minContinuousDays} Continuous Days)
                                            </div>
                                            <p className="text-[11px] text-amber-800">
                                                Leave is logged for kitchen meal records only. No reduction will be applied to the monthly bill.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex md:flex-col items-center gap-2 shrink-0">
                                    <button
                                        onClick={() => updateMessCutStatus(cut.id, 'Approved')}
                                        className="w-full md:w-36 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-1.5 transition-all hover:scale-105"
                                    >
                                        <Check className="w-4 h-4" /> Approve
                                    </button>
                                    <button
                                        onClick={() => updateMessCutStatus(cut.id, 'Rejected')}
                                        className="w-full md:w-36 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-2xl border border-rose-200 flex items-center justify-center gap-1.5 transition-all"
                                    >
                                        <X className="w-4 h-4" /> Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Previously Processed Requests */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-base font-bold text-slate-900">Processed Applications History</h3>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                                    <th className="py-3 px-4">Student</th>
                                    <th className="py-3 px-4">Room</th>
                                    <th className="py-3 px-4">Dates & Duration</th>
                                    <th className="py-3 px-4">Reason</th>
                                    <th className="py-3 px-4">Discount Status</th>
                                    <th className="py-3 px-4 text-center">Final Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {processedCuts.map(cut => (
                                    <tr key={cut.id} className="hover:bg-slate-50/50">
                                        <td className="py-3 px-4 font-bold text-slate-900">{cut.studentName}</td>
                                        <td className="py-3 px-4 font-medium text-slate-700">Room {cut.roomNumber}</td>
                                        <td className="py-3 px-4 text-slate-600">
                                            {cut.startDate} → {cut.endDate} ({cut.totalDays} Days)
                                        </td>
                                        <td className="py-3 px-4 text-slate-600">{cut.reason}</td>
                                        <td className="py-3 px-4 font-semibold">
                                            {cut.isEligibleForDiscount ? (
                                                <span className="text-emerald-600">-₹{cut.reductionAmount}</span>
                                            ) : (
                                                <span className="text-slate-400">₹0 (No Discount)</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                                cut.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                                            }`}>
                                                {cut.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminApprovals;
