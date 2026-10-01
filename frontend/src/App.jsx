import React, { useState, useContext } from 'react';
import { MessProvider, MessContext } from './context/MessContext';
import Navbar from './components/Navbar';
import LoginPortal from './components/LoginPortal';
import StudentDashboard from './components/StudentDashboard';
import MessCutForm from './components/MessCutForm';
import MessCutList from './components/MessCutList';
import MonthlyBill from './components/MonthlyBill';
import MessMenu from './components/MessMenu';
import AdminApprovals from './components/AdminApprovals';
import KitchenForecast from './components/KitchenForecast';
import MessSettingsConfig from './components/MessSettingsConfig';
import DailyAttendance from './components/DailyAttendance';
import MessTeamDashboard from './components/MessTeamDashboard';
import PaymentHistory from './components/PaymentHistory';
import HostelChatbot from './components/HostelChatbot';
import AdminRoomManager from './components/AdminRoomManager';
import AdminMenuEditor from './components/AdminMenuEditor';
import Announcements from './components/Announcements';
import ComplaintsSection from './components/ComplaintsSection';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

const MainApp = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { toast, userRole, isLoggedIn } = useContext(MessContext);

    // Strict Login Protection: If not logged in, render Login Portal exclusively
    if (!isLoggedIn) {
        return <LoginPortal />;
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-blue-500 selection:text-white relative">
            {/* Header & Navigation */}
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Toast Notifications */}
            {toast && (
                <div className="fixed bottom-6 left-6 z-50 animate-bounce">
                    <div className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 text-xs font-bold ${
                        toast.type === 'success' ? 'bg-slate-900 text-emerald-400 border-slate-800' :
                        toast.type === 'error' ? 'bg-slate-900 text-rose-400 border-slate-800' :
                        toast.type === 'warning' ? 'bg-slate-900 text-amber-400 border-slate-800' :
                        'bg-slate-900 text-blue-400 border-slate-800'
                    }`}>
                        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                        {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400" />}
                        {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
                        {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}

            {/* Main Content Body */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Student Views */}
                {userRole === 'student' && (
                    <>
                        {activeTab === 'dashboard' && <StudentDashboard setActiveTab={setActiveTab} />}
                        {activeTab === 'apply-cut' && <MessCutForm setActiveTab={setActiveTab} />}
                        {activeTab === 'cut-list' && <MessCutList setActiveTab={setActiveTab} />}
                        {activeTab === 'monthly-bill' && <MonthlyBill />}
                        {activeTab === 'weekly-menu' && <MessMenu />}
                        {activeTab === 'announcements' && <Announcements />}
                        {activeTab === 'complaints' && <ComplaintsSection />}
                        {activeTab === 'attendance' && <DailyAttendance />}
                        {activeTab === 'payment-history' && <PaymentHistory />}
                    </>
                )}

                {/* Warden / Admin Views */}
                {userRole === 'admin' && (
                    <>
                        {activeTab === 'admin-approvals' && <AdminApprovals />}
                        {activeTab === 'room-manager' && <AdminRoomManager />}
                        {activeTab === 'menu-editor' && <AdminMenuEditor />}
                        {activeTab === 'kitchen-forecast' && <KitchenForecast />}
                        {activeTab === 'attendance' && <DailyAttendance />}
                        {activeTab === 'announcements' && <Announcements />}
                        {activeTab === 'complaints' && <ComplaintsSection />}
                        {activeTab === 'mess-team' && <MessTeamDashboard />}
                        {activeTab === 'payment-history' && <PaymentHistory />}
                        {activeTab === 'mess-settings' && <MessSettingsConfig />}
                        {/* Fallback for admin tabs */}
                        {(activeTab === 'dashboard' || activeTab === 'apply-cut' || activeTab === 'cut-list' || activeTab === 'monthly-bill' || activeTab === 'weekly-menu') && (
                            <AdminApprovals />
                        )}
                    </>
                )}

                {/* Mess Kitchen Team Views */}
                {userRole === 'messteam' && (
                    <>
                        {activeTab === 'mess-team' && <MessTeamDashboard />}
                        {activeTab === 'weekly-menu' && <MessMenu />}
                        {activeTab === 'attendance' && <DailyAttendance />}
                        {activeTab === 'announcements' && <Announcements />}
                        {activeTab === 'kitchen-forecast' && <KitchenForecast />}
                        {(activeTab === 'dashboard' || activeTab === 'apply-cut' || activeTab === 'cut-list' || activeTab === 'monthly-bill' || activeTab === 'admin-approvals' || activeTab === 'mess-settings' || activeTab === 'payment-history' || activeTab === 'room-manager' || activeTab === 'menu-editor' || activeTab === 'complaints') && (
                            <MessTeamDashboard />
                        )}
                    </>
                )}
            </main>

            {/* Floating AI Hostel Chatbot Assistant */}
            <HostelChatbot />

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500 space-y-1">
                <div className="flex items-center justify-center gap-1 font-bold text-slate-800">
                    <Sparkles className="w-4 h-4 text-blue-600" /> HostelMess Pro Enterprise System
                </div>
                <p>Pure White Theme • Fixed Monthly Subscription • ₹0 Room Rent • 7-Day Continuous Mess Cut Rule • Late Fine ₹5/Day</p>
                <p className="text-[11px] text-slate-400">© 2026 Central Hostel Management System. All rights reserved.</p>
            </footer>
        </div>
    );
};

const App = () => {
    return (
        <MessProvider>
            <MainApp />
        </MessProvider>
    );
};

export default App;