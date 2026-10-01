import React, { useState, useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    Utensils, 
    User, 
    ShieldCheck, 
    Lock, 
    Sparkles, 
    ArrowRight, 
    CheckCircle2, 
    Building 
} from 'lucide-react';

const LoginPortal = () => {
    const { 
        loginUser, 
        students, 
        monthlyFee, 
        paymentDeadlineDay, 
        lateFinePerDay 
    } = useContext(MessContext);

    const [role, setRole] = useState('student');
    const [selectedStudentId, setSelectedStudentId] = useState('STU101');
    const [password, setPassword] = useState('123456');

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(role, selectedStudentId);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-6 font-sans">
            {/* Top Bar */}
            <div className="max-w-6xl w-full mx-auto flex justify-between items-center py-4">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2 rounded-xl shadow-md">
                        <Utensils className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-black text-slate-900 tracking-tight">HostelMess<span className="text-blue-600">Pro</span></span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> ₹0 Room Rent Policy Verified
                </div>
            </div>

            {/* Login Card Center */}
            <div className="max-w-md w-full mx-auto my-auto space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Portal Authentication</h2>
                        <p className="text-xs text-slate-500">Sign in to access your hostel room, mess cuts, & bills</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Role Pills */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Select Portal Role</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setRole('student')}
                                    className={`py-3 px-2 rounded-2xl text-xs font-extrabold border transition-all flex flex-col items-center gap-1 ${
                                        role === 'student' 
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20' 
                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                    }`}
                                >
                                    <User className="w-4 h-4" /> Student
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setRole('admin')}
                                    className={`py-3 px-2 rounded-2xl text-xs font-extrabold border transition-all flex flex-col items-center gap-1 ${
                                        role === 'admin' 
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                    }`}
                                >
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Warden
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setRole('messteam')}
                                    className={`py-3 px-2 rounded-2xl text-xs font-extrabold border transition-all flex flex-col items-center gap-1 ${
                                        role === 'messteam' 
                                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                    }`}
                                >
                                    <Utensils className="w-4 h-4 text-amber-300" /> Mess Team
                                </button>
                            </div>
                        </div>

                        {/* Student Picker if role === student */}
                        {role === 'student' && (
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Resident Student</label>
                                <select
                                    value={selectedStudentId}
                                    onChange={(e) => setSelectedStudentId(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {students.map(s => (
                                        <option key={s.id} value={s.id}>
                                            {s.name} ({s.block}, Room {s.room})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Password / Access Pin</label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                        >
                            Log In to Portal <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                {/* Key Rules Card */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs text-xs space-y-1.5">
                    <span className="font-bold text-slate-900 block">System Business Policies:</span>
                    <p className="text-slate-600">• Fixed Monthly Fee: <strong>₹{monthlyFee.toLocaleString()}/mo</strong> (No daily rate)</p>
                    <p className="text-emerald-700 font-semibold">• Room Rent Charge: <strong>₹0.00</strong> (Monetary rent free)</p>
                    <p className="text-rose-700 font-semibold">• Pay Deadline: <strong>{paymentDeadlineDay}th of month</strong> (₹{lateFinePerDay}/day fine past 10th)</p>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-slate-400 py-4">
                © 2026 Central Hostel Management System • All Portal Access Requires Authorization
            </div>
        </div>
    );
};

export default LoginPortal;
