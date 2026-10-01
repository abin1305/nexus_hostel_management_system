import React, { useState, useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    Utensils, 
    PlusCircle, 
    History, 
    Users, 
    CheckCircle2, 
    Calendar, 
    ChefHat, 
    ShieldAlert, 
    Info 
} from 'lucide-react';

const MessTeamDashboard = () => {
    const { 
        messTeamLogs, 
        recordMessTeamCount, 
        getKitchenForecast, 
        attendanceRecords, 
        students 
    } = useContext(MessContext);

    const forecast = getKitchenForecast();
    const today = new Date().toISOString().split('T')[0];

    const [meal, setMeal] = useState('Dinner');
    const [totalCount, setTotalCount] = useState(forecast.meals.dinner);
    const [vegCount, setVegCount] = useState(Math.round(forecast.meals.dinner * 0.75));
    const [nonVegCount, setNonVegCount] = useState(Math.round(forecast.meals.dinner * 0.25));
    const [recordedBy, setRecordedBy] = useState('Head Chef Ramesh');
    const [notes, setNotes] = useState('Night dinner headcount logged');

    const handleRecord = (e) => {
        e.preventDefault();
        recordMessTeamCount({
            meal,
            totalCount,
            vegCount,
            nonVegCount,
            recordedBy,
            notes
        });
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header Banner */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                            <ChefHat className="w-6 h-6 text-amber-400" /> Mess Team Required Food Count Portal
                        </h2>
                        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                            Kitchen Team View
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                        View required meal counts updated by Warden & Admin. Log actual plates served.
                    </p>
                </div>

                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-center shrink-0">
                    <span className="text-[11px] font-semibold text-slate-400 block">Admin Updated Target Count</span>
                    <span className="text-2xl font-black text-emerald-400">{forecast.expectedAttendance} <span className="text-xs font-medium text-slate-300">Plates</span></span>
                </div>
            </div>

            {/* Read-only Attendance Policy Notice */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <span className="font-bold block">Mess Team Access Control Enforced:</span>
                    Mess staff can view required meal counts and log plates served. **Editing student daily attendance is restricted to Warden Admin & Students only.**
                </div>
            </div>

            {/* Admin Updated Required Food Counts Grid */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-blue-600" /> Admin Updated Required Food Counts for Today ({today})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                        <span className="text-slate-500 block">Breakfast Target</span>
                        <span className="text-2xl font-black text-slate-900 mt-1 block">{forecast.meals.breakfast} <span className="text-xs font-semibold text-slate-500">Plates</span></span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                        <span className="text-slate-500 block">Lunch Target</span>
                        <span className="text-2xl font-black text-blue-600 mt-1 block">{forecast.meals.lunch} <span className="text-xs font-semibold text-slate-500">Plates</span></span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                        <span className="text-slate-500 block">Evening Snacks</span>
                        <span className="text-2xl font-black text-indigo-600 mt-1 block">{forecast.meals.eveningSnacks} <span className="text-xs font-semibold text-slate-500">Plates</span></span>
                    </div>

                    <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200">
                        <span className="text-purple-900 font-bold block">Detailed Night Dinner</span>
                        <span className="text-2xl font-black text-purple-700 mt-1 block">{forecast.meals.dinner} <span className="text-xs font-semibold text-purple-900">Plates</span></span>
                    </div>
                </div>
            </div>

            {/* Log Entry Form & Log History */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Log Entry Form */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                        Log Kitchen Serving Counts
                    </h3>

                    <form onSubmit={handleRecord} className="space-y-4 text-xs">
                        <div>
                            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Meal Service *</label>
                            <select
                                value={meal}
                                onChange={(e) => {
                                    const selected = e.target.value;
                                    setMeal(selected);
                                    const req = selected === 'Breakfast' ? forecast.meals.breakfast :
                                                selected === 'Lunch' ? forecast.meals.lunch :
                                                selected === 'Snacks' ? forecast.meals.eveningSnacks : forecast.meals.dinner;
                                    setTotalCount(req);
                                    setVegCount(Math.round(req * 0.75));
                                    setNonVegCount(Math.round(req * 0.25));
                                }}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-bold text-slate-900 focus:outline-none"
                            >
                                <option value="Dinner">Night Dinner (Detailed Menu)</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Snacks">Evening Snacks</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Total Served</label>
                                <input
                                    type="number"
                                    required
                                    value={totalCount}
                                    onChange={(e) => setTotalCount(Number(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-extrabold text-slate-900 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-emerald-700 mb-1">Veg Served</label>
                                <input
                                    type="number"
                                    required
                                    value={vegCount}
                                    onChange={(e) => setVegCount(Number(e.target.value))}
                                    className="w-full bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-sm font-bold text-emerald-900 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-rose-700 mb-1">Non-Veg</label>
                                <input
                                    type="number"
                                    required
                                    value={nonVegCount}
                                    onChange={(e) => setNonVegCount(Number(e.target.value))}
                                    className="w-full bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 text-sm font-bold text-rose-900 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Staff / Chef Name</label>
                            <input
                                type="text"
                                value={recordedBy}
                                onChange={(e) => setRecordedBy(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium text-slate-900 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Kitchen Notes</label>
                            <input
                                type="text"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium text-slate-900 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
                        >
                            <CheckCircle2 className="w-4 h-4" /> Save Headcount Log
                        </button>
                    </form>
                </div>

                {/* Log History */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                        <History className="w-4 h-4 text-blue-600" /> Kitchen Serving History Logs
                    </h3>

                    <div className="space-y-3">
                        {messTeamLogs.map(log => (
                            <div key={log.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                                <div className="flex justify-between items-center">
                                    <span className="font-extrabold text-slate-900 text-sm">{log.meal} ({log.date})</span>
                                    <span className="font-black text-slate-900 text-base">{log.totalCount} Plates</span>
                                </div>
                                <div className="flex gap-3 text-[11px]">
                                    <span className="text-emerald-700 font-bold">🥦 Veg: {log.vegCount}</span>
                                    <span className="text-rose-700 font-bold">🍗 Non-Veg: {log.nonVegCount}</span>
                                    <span className="text-slate-500">By: {log.recordedBy}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessTeamDashboard;
