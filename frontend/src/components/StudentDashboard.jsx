import React, { useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    CreditCard, 
    Calendar, 
    CheckCircle, 
    AlertTriangle, 
    TrendingDown, 
    Utensils, 
    ArrowRight, 
    Sparkles, 
    ShieldCheck, 
    Home, 
    Info 
} from 'lucide-react';

const StudentDashboard = ({ setActiveTab }) => {
    const { 
        currentStudent, 
        monthlyFee, 
        roomRent, 
        minContinuousDays, 
        messCuts, 
        getStudentBill 
    } = useContext(MessContext);

    const bill = getStudentBill(currentStudent.id);
    const studentCuts = messCuts.filter(c => c.studentId === currentStudent.id);

    return (
        <div className="space-y-6">
            {/* Header Greeting Banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-full blur-3xl -mr-20 -mt-20 -z-0 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-3">
                            <Sparkles className="w-3.5 h-3.5" /> Hostel Mess Portal • Room {currentStudent.room}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Welcome, {currentStudent.name}!
                        </h2>
                        <p className="text-sm text-slate-600 mt-1 max-w-xl">
                            Manage your monthly mess subscription, apply for 7+ continuous day mess cut reductions, view your ₹0 room rent monthly invoice, and track daily meals.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setActiveTab('apply-cut')}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-3 rounded-2xl shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-105"
                        >
                            <Calendar className="w-4 h-4" /> Apply Mess Cut <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setActiveTab('monthly-bill')}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-5 py-3 rounded-2xl border border-slate-200 flex items-center gap-2 transition-all"
                        >
                            <CreditCard className="w-4 h-4 text-slate-600" /> View Invoice
                        </button>
                    </div>
                </div>
            </div>

            {/* Key Policy Highlights Banner (White Theme & Business Rules) */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-xs shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-emerald-950">Strict Hostel Mess Policies Enforced</h4>
                        <p className="text-xs text-emerald-800 mt-0.5">
                            • <strong className="font-semibold">₹0 Room Rent:</strong> No room charges added to mess bill.<br />
                            • <strong className="font-semibold">7-Day Continuous Rule:</strong> Bill reduction applies ONLY if absent continuously for {minContinuousDays} or more days.
                        </p>
                    </div>
                </div>
                <div className="shrink-0 bg-white px-3.5 py-2 rounded-xl border border-emerald-200 text-center shadow-xs">
                    <span className="text-[11px] font-medium text-slate-500 block">Monthly Base Fee</span>
                    <span className="text-base font-extrabold text-slate-900">₹{monthlyFee.toLocaleString()} / mo</span>
                </div>
            </div>

            {/* Core Stats Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Stat 1: Monthly Fee */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fixed Monthly Fee</p>
                            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">₹{monthlyFee.toLocaleString()}</h3>
                        </div>
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                            <Utensils className="w-5 h-5" />
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-500" /> Subscription basis (No daily rate)
                    </p>
                </div>

                {/* Stat 2: Room Rent */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Room Rent Charge</p>
                            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">₹{roomRent}.00</h3>
                        </div>
                        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                            <Home className="w-5 h-5" />
                        </div>
                    </div>
                    <p className="text-xs text-emerald-700 font-medium mt-3 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> ₹0 Room Charge policy active
                    </p>
                </div>

                {/* Stat 3: Mess Cut Savings */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-indigo-300 transition-all">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mess Cut Savings</p>
                            <h3 className="text-2xl font-extrabold text-indigo-600 mt-1">- ₹{bill.messCutDeduction.toLocaleString()}</h3>
                        </div>
                        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                            <TrendingDown className="w-5 h-5" />
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5 text-indigo-500" /> From {bill.approvedCutsCount} approved 7+ day cut(s)
                    </p>
                </div>

                {/* Stat 4: Net Payable Bill */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Net Payable Bill</p>
                            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">₹{bill.netPayable.toLocaleString()}</h3>
                        </div>
                        <div className={`p-2.5 rounded-xl ${bill.isPaid ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            <CreditCard className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                            bill.isPaid 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                            {bill.isPaid ? 'PAID' : 'UNPAID'}
                        </span>
                        <button 
                            onClick={() => setActiveTab('monthly-bill')} 
                            className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                        >
                            Invoice →
                        </button>
                    </div>
                </div>
            </div>

            {/* 7-Day Rule Detailed Guide Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" /> How Mess Cut Discount Rules Work
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-emerald-50/50 border border-emerald-200/70 p-4 rounded-2xl">
                        <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                            <CheckCircle className="w-4 h-4 text-emerald-600" /> Eligible for Bill Reduction (7+ Days)
                        </div>
                        <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                            If you apply for continuous mess leave of <strong>7 days or longer</strong> (e.g., Oct 10 to Oct 19 = 10 days), you receive a pro-rated reduction on your monthly food charge for those days once approved by admin.
                        </p>
                        <div className="mt-3 bg-white p-2.5 rounded-xl border border-emerald-200 text-[11px] text-emerald-950 font-mono">
                            Reduction = (Monthly Fee ₹3,000 / 30) × 10 Days = ₹1,000 Off
                        </div>
                    </div>

                    <div className="bg-amber-50/50 border border-amber-200/70 p-4 rounded-2xl">
                        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                            <AlertTriangle className="w-4 h-4 text-amber-600" /> Not Eligible for Reduction (&lt; 7 Days)
                        </div>
                        <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                            If your mess leave is <strong>less than 7 continuous days</strong> (e.g., 1 to 6 days for weekend trips), your application will be logged for kitchen records, but <strong>no reduction will be made to your monthly bill</strong>.
                        </p>
                        <div className="mt-3 bg-white p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-950 font-mono">
                            4 Days Cut → ₹0 Bill Reduction (Full ₹3,000 fee applies)
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Requests Section */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Your Recent Mess Cut Applications</h3>
                        <p className="text-xs text-slate-500">History of submitted mess cuts for {currentStudent.name}</p>
                    </div>
                    <button 
                        onClick={() => setActiveTab('cut-list')}
                        className="text-xs text-blue-600 hover:text-blue-800 font-bold"
                    >
                        View All History →
                    </button>
                </div>

                {studentCuts.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-slate-700">No mess cuts submitted yet</p>
                        <p className="text-xs text-slate-500 mt-1">Apply for leave of 7 or more continuous days to get food bill reduction.</p>
                        <button
                            onClick={() => setActiveTab('apply-cut')}
                            className="mt-4 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs"
                        >
                            Apply Now
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {studentCuts.slice(0, 3).map(cut => (
                            <div key={cut.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-900 text-sm">{cut.reason}</span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                            cut.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            cut.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                            'bg-amber-50 text-amber-700 border-amber-200'
                                        }`}>
                                            {cut.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">
                                        📅 {cut.startDate} to {cut.endDate} • <strong className="text-slate-700">{cut.totalDays} Continuous Days</strong>
                                    </p>
                                </div>

                                <div className="text-left sm:text-right shrink-0">
                                    {cut.isEligibleForDiscount ? (
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                                            Eligible Reduction: -₹{cut.reductionAmount}
                                        </span>
                                    ) : (
                                        <span className="text-xs font-semibold text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-lg inline-block">
                                            Not Eligible (&lt; 7 Days)
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
