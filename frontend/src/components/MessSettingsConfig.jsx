import React, { useContext, useState } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    Settings, 
    ShieldCheck, 
    Save, 
    AlertCircle, 
    DollarSign, 
    Calendar, 
    Check 
} from 'lucide-react';

const MessSettingsConfig = () => {
    const { 
        monthlyFee, 
        setMonthlyFee, 
        minContinuousDays, 
        setMinContinuousDays, 
        roomRent, 
        showToast 
    } = useContext(MessContext);

    const [tempFee, setTempFee] = useState(monthlyFee);
    const [tempDays, setTempDays] = useState(minContinuousDays);

    const handleSave = (e) => {
        e.preventDefault();
        setMonthlyFee(Number(tempFee));
        setMinContinuousDays(Number(tempDays));
        showToast('Mess rules and monthly rate updated successfully!', 'success');
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-slate-900 text-white rounded-2xl">
                    <Settings className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        Mess Rules & Billing Configuration
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        Configure central hostel mess rules, monthly subscription rate, and continuous leave discount thresholds.
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs">
                <form onSubmit={handleSave} className="space-y-6">
                    {/* Setting 1: Base Monthly Fee */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                            Fixed Monthly Food Subscription Charge (₹)
                        </label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">₹</span>
                            <input
                                type="number"
                                min="500"
                                max="10000"
                                required
                                value={tempFee}
                                onChange={(e) => setTempFee(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <p className="text-xs text-slate-500">
                            Fixed monthly rate charged per student. Per-day food charges have been removed in favor of this monthly model.
                        </p>
                    </div>

                    {/* Setting 2: Minimum Continuous Days Threshold */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                            Minimum Continuous Absent Days Requirement for Bill Discount
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                min="1"
                                max="30"
                                required
                                value={tempDays}
                                onChange={(e) => setTempDays(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <p className="text-xs text-amber-700 font-medium">
                            ⚠️ Strict Policy Rule: Students will get mess cut bill reduction ONLY if they continuously skip food for {tempDays} or more days.
                        </p>
                    </div>

                    {/* Setting 3: Room Rent Lock Display */}
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
                        <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                            <ShieldCheck className="w-5 h-5 text-emerald-600" /> Room Rent Charge: ₹{roomRent}.00 (Locked)
                        </div>
                        <p className="text-xs text-emerald-800">
                            Hostel policy strictly enforces ₹0 room rent on all mess billing statements. Room charges cannot be added.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                    >
                        <Save className="w-4 h-4 text-emerald-400" /> Save Settings & Update Rule Engine
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessSettingsConfig;
