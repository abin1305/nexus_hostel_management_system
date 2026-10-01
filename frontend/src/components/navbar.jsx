import React, { useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    Utensils, 
    User, 
    ShieldCheck, 
    Calendar, 
    FileText, 
    Clock, 
    BarChart3, 
    Settings, 
    CheckCircle2, 
    Home, 
    Sparkles, 
    UserCheck, 
    History, 
    LogOut, 
    Building, 
    Edit, 
    Bell, 
    MessageSquare 
} from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
    const { 
        userRole, 
        students, 
        currentStudent, 
        setCurrentStudentId,
        monthlyFee,
        minContinuousDays,
        paymentDeadlineDay,
        lateFinePerDay,
        isLoggedIn,
        logoutUser
    } = useContext(MessContext);

    return (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
            {/* Top Policy Bar */}
            <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-3 font-medium">
                    <span className="flex items-center gap-1.5 text-emerald-400 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                        <Sparkles className="w-3.5 h-3.5" /> Pure White Theme Active
                    </span>
                    <span className="hidden sm:inline text-slate-300">
                        Fixed Monthly Fee (₹{monthlyFee.toLocaleString()}/mo) • <span className="text-emerald-300 font-bold">₹0 Room Rent</span>
                    </span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                    <span className="bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded border border-rose-500/30 text-[11px] font-bold">
                        ⏰ Pay Before {paymentDeadlineDay}th of Month (Late Fine: ₹{lateFinePerDay}/day)
                    </span>
                </div>
            </div>

            {/* Main Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
                        <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2.5 rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center">
                            <Utensils className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-bold text-slate-900 tracking-tight">HostelMess<span className="text-blue-600">Pro</span></h1>
                                <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-blue-100 uppercase tracking-wider">
                                    Enterprise
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium">Smart Mess Cuts, Room Allocation & Attendance</p>
                        </div>
                    </div>

                    {/* Role & User Status */}
                    <div className="flex items-center gap-3">
                        {/* Student Dropdown */}
                        {userRole === 'student' && (
                            <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
                                <User className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-500 font-medium">Resident:</span>
                                <select 
                                    value={currentStudent.id}
                                    onChange={(e) => setCurrentStudentId(e.target.value)}
                                    className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
                                >
                                    {students.map(s => (
                                        <option key={s.id} value={s.id}>
                                            {s.name} (Room {s.room})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Active Role Badge */}
                        <div className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            {userRole === 'student' && <User className="w-3.5 h-3.5 text-blue-600" />}
                            {userRole === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                            {userRole === 'messteam' && <Utensils className="w-3.5 h-3.5 text-amber-600" />}
                            <span className="capitalize">{userRole === 'admin' ? 'Hostel Warden' : userRole === 'messteam' ? 'Mess Kitchen Team' : 'Student Resident'}</span>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={logoutUser}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-rose-200 flex items-center gap-1 transition-all"
                            title="Log Out of Portal"
                        >
                            <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs Bar */}
                <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
                    {userRole === 'student' && (
                        <>
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Home className="w-4 h-4" /> Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('apply-cut')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'apply-cut' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Calendar className="w-4 h-4 text-indigo-500" /> Apply Mess Cut (7+ Days)
                            </button>
                            <button
                                onClick={() => setActiveTab('cut-list')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'cut-list' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Clock className="w-4 h-4 text-emerald-500" /> Requests History
                            </button>
                            <button
                                onClick={() => setActiveTab('monthly-bill')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'monthly-bill' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <FileText className="w-4 h-4 text-amber-500" /> Monthly Bill (₹0 Rent & Fine)
                            </button>
                            <button
                                onClick={() => setActiveTab('weekly-menu')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'weekly-menu' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Utensils className="w-4 h-4 text-rose-500" /> Detailed Menu
                            </button>
                            <button
                                onClick={() => setActiveTab('announcements')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'announcements' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Bell className="w-4 h-4 text-amber-500" /> Announcements
                            </button>
                            <button
                                onClick={() => setActiveTab('complaints')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'complaints' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <MessageSquare className="w-4 h-4 text-rose-500" /> Complaints
                            </button>
                            <button
                                onClick={() => setActiveTab('attendance')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'attendance' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <UserCheck className="w-4 h-4 text-purple-500" /> Daily Attendance
                            </button>
                            <button
                                onClick={() => setActiveTab('payment-history')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'payment-history' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <History className="w-4 h-4 text-blue-500" /> Payment History
                            </button>
                        </>
                    )}

                    {userRole === 'admin' && (
                        <>
                            <button
                                onClick={() => setActiveTab('admin-approvals')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'admin-approvals' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mess Cut Approvals
                            </button>
                            <button
                                onClick={() => setActiveTab('room-manager')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'room-manager' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Building className="w-4 h-4 text-blue-400" /> Room & Roommates Allocation
                            </button>
                            <button
                                onClick={() => setActiveTab('menu-editor')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'menu-editor' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Edit className="w-4 h-4 text-amber-400" /> Edit Weekly Menu
                            </button>
                            <button
                                onClick={() => setActiveTab('kitchen-forecast')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'kitchen-forecast' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <BarChart3 className="w-4 h-4 text-cyan-400" /> Kitchen Forecast
                            </button>
                            <button
                                onClick={() => setActiveTab('attendance')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'attendance' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <UserCheck className="w-4 h-4 text-purple-400" /> Attendance Register
                            </button>
                            <button
                                onClick={() => setActiveTab('announcements')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'announcements' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Bell className="w-4 h-4 text-amber-400" /> Announcements
                            </button>
                            <button
                                onClick={() => setActiveTab('complaints')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'complaints' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <MessageSquare className="w-4 h-4 text-rose-400" /> Complaints
                            </button>
                            <button
                                onClick={() => setActiveTab('mess-team')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'mess-team' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Utensils className="w-4 h-4 text-amber-400" /> Mess Team Headcounts
                            </button>
                            <button
                                onClick={() => setActiveTab('payment-history')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'payment-history' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <History className="w-4 h-4 text-cyan-400" /> Payment History Ledger
                            </button>
                            <button
                                onClick={() => setActiveTab('mess-settings')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'mess-settings' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Settings className="w-4 h-4 text-amber-400" /> Rules & Late Fine Settings
                            </button>
                        </>
                    )}

                    {userRole === 'messteam' && (
                        <>
                            <button
                                onClick={() => setActiveTab('mess-team')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'mess-team' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Utensils className="w-4 h-4" /> Required Food Count Log
                            </button>
                            <button
                                onClick={() => setActiveTab('weekly-menu')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'weekly-menu' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Utensils className="w-4 h-4" /> Detailed Menu
                            </button>
                            <button
                                onClick={() => setActiveTab('attendance')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'attendance' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <UserCheck className="w-4 h-4" /> Attendance Register (Read-Only)
                            </button>
                            <button
                                onClick={() => setActiveTab('announcements')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'announcements' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <Bell className="w-4 h-4" /> Announcements
                            </button>
                            <button
                                onClick={() => setActiveTab('kitchen-forecast')}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                                    activeTab === 'kitchen-forecast' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <BarChart3 className="w-4 h-4" /> Kitchen Forecast
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;