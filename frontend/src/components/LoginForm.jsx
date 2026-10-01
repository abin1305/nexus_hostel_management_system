import React, { useState, useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    User, 
    ShieldCheck, 
    Utensils, 
    Lock, 
    Sparkles, 
    ArrowRight, 
    CheckCircle2 
} from 'lucide-react';

const LoginForm = ({ isOpen, onClose }) => {
    const { 
        userRole, 
        setUserRole, 
        students, 
        currentStudent, 
        setCurrentStudentId, 
        setIsLoggedIn, 
        showToast 
    } = useContext(MessContext);

    const [selectedRole, setSelectedRole] = useState(userRole);
    const [selectedStudentId, setSelectedStudentId] = useState(currentStudent.id);
    const [password, setPassword] = useState('123456');

    if (!isOpen) return null;

    const handleLogin = (e) => {
        e.preventDefault();
        setUserRole(selectedRole);
        if (selectedRole === 'student') {
            setCurrentStudentId(selectedStudentId);
        }
        setIsLoggedIn(true);
        showToast(`Logged in successfully as ${selectedRole === 'student' ? 'Student' : selectedRole === 'admin' ? 'Hostel Warden' : 'Mess Kitchen Team'}!`, 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-slate-200 animate-in fade-in zoom-in duration-200">
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Utensils className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">HostelMess Pro Portal</h3>
                    <p className="text-xs text-slate-500">Sign in to access your portal, mess cuts, & attendance</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Role Selector */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Select Portal Role</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setSelectedRole('student')}
                                className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                                    selectedRole === 'student'
                                        ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                <User className="w-4 h-4" /> Student
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedRole('admin')}
                                className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                                    selectedRole === 'admin'
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Warden
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedRole('messteam')}
                                className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                                    selectedRole === 'messteam'
                                        ? 'bg-emerald-50 border-emerald-600 text-emerald-700 shadow-xs'
                                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                <Utensils className="w-4 h-4 text-amber-500" /> Mess Team
                            </button>
                        </div>
                    </div>

                    {/* Student Selection if Student Role */}
                    {selectedRole === 'student' && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Select Resident Student</label>
                            <select
                                value={selectedStudentId}
                                onChange={(e) => setSelectedStudentId(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {students.map(s => (
                                    <option key={s.id} value={s.id}>
                                        {s.name} (Room {s.room} • {s.block})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Password Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Access Key / Password</label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                    >
                        Sign In to Dashboard <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center text-[11px] text-slate-500">
                    Hostel Policy: Pay before 10th of every month to avoid ₹5/day late fine.
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
