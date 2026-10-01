import React, { useState, useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    Calendar as CalendarIcon, 
    CheckCircle2, 
    AlertCircle, 
    Calculator, 
    Send, 
    Info, 
    Sparkles, 
    ArrowRight 
} from 'lucide-react';

const MessCutForm = ({ setActiveTab }) => {
    const { 
        currentStudent, 
        monthlyFee, 
        minContinuousDays, 
        calculateDays, 
        applyMessCut 
    } = useContext(MessContext);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('Home Visit');
    const [customNotes, setCustomNotes] = useState('');

    const totalDays = calculateDays(startDate, endDate);
    const isEligible = totalDays >= minContinuousDays;
    const estimatedReduction = isEligible ? Math.round((monthlyFee / 30) * totalDays) : 0;
    const netBillPreview = Math.max(0, monthlyFee - estimatedReduction);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!startDate || !endDate) return;

        const success = applyMessCut({
            startDate,
            endDate,
            reason: reason === 'Other' ? (customNotes || 'Other Reason') : reason
        });

        if (success) {
            setActiveTab('cut-list');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
                        <CalendarIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                Apply for Mess Cut
                            </h2>
                            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                                7-Day Discount Rule
                            </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                            Select leave dates. If absent for 7 or more continuous days, your monthly food bill will be reduced.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Card (Left Column) */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Student Details Summary */}
                        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                            <div>
                                <span className="text-slate-500 block">Applying For:</span>
                                <span className="font-bold text-slate-900 text-sm">{currentStudent.name}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-slate-500 block">Room Number:</span>
                                <span className="font-semibold text-blue-600">Room {currentStudent.room}</span>
                            </div>
                        </div>

                        {/* Date Input Pickers */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Start Date (Food Skip From) *
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    End Date (Food Skip Until) *
                                </label>
                                <input
                                    type="date"
                                    required
                                    min={startDate}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Reason Dropdown */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Reason for Mess Cut *
                            </label>
                            <select
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer font-medium"
                            >
                                <option value="Home Visit">Home Visit / Vacation</option>
                                <option value="Medical Leave">Medical Leave / Sick Rest</option>
                                <option value="Internship / Training">Internship / External Training</option>
                                <option value="Competitive Exam">Competitive Exam / Festival Break</option>
                                <option value="Other">Other Reason</option>
                            </select>
                        </div>

                        {reason === 'Other' && (
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Specific Details
                                </label>
                                <textarea
                                    rows="2"
                                    placeholder="Provide additional notes for hostel warden..."
                                    value={customNotes}
                                    onChange={(e) => setCustomNotes(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={totalDays <= 0}
                            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
                                totalDays > 0
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 hover:scale-[1.01]'
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                            }`}
                        >
                            <Send className="w-4 h-4" /> Submit Mess Cut Application
                        </button>
                    </form>
                </div>

                {/* Live Real-time Eligibility & Bill Calculation Preview (Right Column) */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs relative">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                <Calculator className="w-4 h-4 text-blue-600" /> Real-time Eligibility Preview
                            </h3>
                            <span className="text-[11px] font-semibold text-slate-400">Live Rule Engine</span>
                        </div>

                        {totalDays <= 0 ? (
                            <div className="text-center py-8">
                                <CalendarIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                                <p className="text-xs font-medium text-slate-500">
                                    Select Start & End dates to view duration and discount eligibility calculation.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Total Days Counter */}
                                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                                    <span className="text-xs font-semibold text-slate-500 block uppercase">Continuous Leave Duration</span>
                                    <span className="text-3xl font-black text-slate-900 mt-1 block">
                                        {totalDays} <span className="text-sm font-semibold text-slate-600">Days</span>
                                    </span>
                                </div>

                                {/* Eligibility Indicator Badge */}
                                {isEligible ? (
                                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                                        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                            <span>ELIGIBLE FOR BILL REDUCTION!</span>
                                        </div>
                                        <p className="text-xs text-emerald-800 leading-relaxed">
                                            Duration is <strong>{totalDays} continuous days</strong> (≥ {minContinuousDays} days rule met). Your food bill will be reduced upon admin approval.
                                        </p>
                                        <div className="bg-white p-2.5 rounded-xl border border-emerald-200 font-mono text-xs text-emerald-950 flex justify-between items-center">
                                            <span>Calculated Reduction:</span>
                                            <span className="font-extrabold text-emerald-600">-₹{estimatedReduction.toLocaleString()}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                                        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                                            <span>NO BILL REDUCTION APPLIED</span>
                                        </div>
                                        <p className="text-xs text-amber-800 leading-relaxed">
                                            Duration is <strong>{totalDays} continuous days</strong>, which is less than the mandatory <strong>{minContinuousDays} continuous days</strong> rule.
                                        </p>
                                        <div className="bg-white p-2.5 rounded-xl border border-amber-200 font-mono text-xs text-amber-950 flex justify-between items-center">
                                            <span>Reduction Amount:</span>
                                            <span className="font-bold text-slate-500">₹0 (Full fee applies)</span>
                                        </div>
                                    </div>
                                )}

                                {/* Bill Impact Breakdown */}
                                <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Standard Monthly Fee:</span>
                                        <span className="font-semibold">₹{monthlyFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Room Rent:</span>
                                        <span className="font-bold text-emerald-600">₹0.00</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Mess Cut Discount:</span>
                                        <span className={isEligible ? 'font-bold text-emerald-600' : 'text-slate-400'}>
                                            -₹{estimatedReduction.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-200">
                                        <span>Estimated Net Monthly Bill:</span>
                                        <span className="text-blue-600">₹{netBillPreview.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Information Note */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <p>
                            Mess cut requests must be submitted at least 24 hours prior to leave start date for kitchen meal planning.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessCutForm;
