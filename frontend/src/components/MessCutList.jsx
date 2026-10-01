import React, { useContext, useState } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    Clock, 
    CheckCircle2, 
    XCircle, 
    AlertTriangle, 
    Calendar, 
    Plus, 
    Search, 
    Filter, 
    Check 
} from 'lucide-react';

const MessCutList = ({ setActiveTab }) => {
    const { 
        currentStudent, 
        messCuts, 
        minContinuousDays, 
        userRole 
    } = useContext(MessContext);

    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Filter list by student (if in student role) and status/search
    const studentCuts = userRole === 'student' 
        ? messCuts.filter(c => c.studentId === currentStudent.id) 
        : messCuts;

    const filteredCuts = studentCuts.filter(cut => {
        const matchesStatus = filterStatus === 'All' || cut.status === filterStatus;
        const matchesSearch = cut.reason.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              cut.studentName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            Mess Cut Request History
                        </h2>
                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                            {userRole === 'student' ? currentStudent.name : 'All Students'}
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Track your mess cut application statuses and verified 7-day continuous discount reductions.
                    </p>
                </div>

                {userRole === 'student' && (
                    <button
                        onClick={() => setActiveTab('apply-cut')}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-1.5 transition-all hover:scale-105 shrink-0"
                    >
                        <Plus className="w-4 h-4" /> Apply New Mess Cut
                    </button>
                )}
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                        type="text"
                        placeholder="Search reason or details..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Filter className="w-3.5 h-3.5" /> Status:
                    </span>
                    {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                filterStatus === status 
                                    ? 'bg-slate-900 text-white shadow-xs' 
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mess Cuts List Cards */}
            {filteredCuts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
                    <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-800">No mess cuts found</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        {searchTerm || filterStatus !== 'All' 
                            ? 'No records match your selected filter criteria.' 
                            : 'No mess cut applications submitted yet.'}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredCuts.map(cut => (
                        <div 
                            key={cut.id} 
                            className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2.5 flex-wrap">
                                        <h3 className="text-base font-bold text-slate-900">{cut.reason}</h3>
                                        
                                        {/* Status Badge */}
                                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${
                                            cut.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            cut.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                            'bg-amber-50 text-amber-700 border-amber-200'
                                        }`}>
                                            {cut.status === 'Approved' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                                            {cut.status === 'Rejected' && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                                            {cut.status === 'Pending' && <Clock className="w-3.5 h-3.5 text-amber-600" />}
                                            {cut.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Request Ref: <code className="font-mono text-slate-700">{cut.id}</code> • Applied on {cut.appliedAt}
                                    </p>
                                </div>

                                {/* Student Info (if admin) */}
                                {userRole === 'admin' && (
                                    <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
                                        <span className="font-bold text-slate-900">{cut.studentName}</span>
                                        <span className="text-slate-500 block">Room {cut.roomNumber}</span>
                                    </div>
                                )}
                            </div>

                            {/* Dates & Continuous Days Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="text-slate-500 block text-[11px]">Leave Duration</span>
                                    <span className="font-semibold text-slate-900 text-xs flex items-center gap-1.5 mt-0.5">
                                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                                        {cut.startDate} → {cut.endDate}
                                    </span>
                                </div>

                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="text-slate-500 block text-[11px]">Continuous Days</span>
                                    <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
                                        {cut.totalDays} Days Continuous
                                    </span>
                                </div>

                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="text-slate-500 block text-[11px]">7-Day Rule Status</span>
                                    {cut.isEligibleForDiscount ? (
                                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                                            <Check className="w-3.5 h-3.5" /> Eligible (-₹{cut.reductionAmount})
                                        </span>
                                    ) : (
                                        <span className="text-xs font-semibold text-amber-700 flex items-center gap-1 mt-0.5">
                                            <AlertTriangle className="w-3.5 h-3.5" /> Not Eligible (&lt; {minContinuousDays} Days)
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Status Explanation Note */}
                            <div className="text-[11px] text-slate-500 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                                {cut.status === 'Approved' && cut.isEligibleForDiscount && (
                                    <p className="text-emerald-700 font-medium">
                                        ✅ Approved by Hostel Admin. Discount deduction of ₹{cut.reductionAmount} has been applied to your monthly bill statement.
                                    </p>
                                )}
                                {cut.status === 'Approved' && !cut.isEligibleForDiscount && (
                                    <p className="text-slate-600 font-medium">
                                        ℹ️ Leave request approved for attendance records. No food bill reduction applied because duration is less than {minContinuousDays} continuous days.
                                    </p>
                                )}
                                {cut.status === 'Pending' && (
                                    <p className="text-amber-700 font-medium">
                                        ⏳ Application pending approval by Hostel Warden. Bill reduction will take effect once approved.
                                    </p>
                                )}
                                {cut.status === 'Rejected' && (
                                    <p className="text-rose-700 font-medium">
                                        ❌ Application rejected by admin. Standard monthly fee applies.
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MessCutList;
