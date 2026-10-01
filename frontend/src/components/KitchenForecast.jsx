import React, { useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    BarChart3, 
    Utensils, 
    Coffee, 
    Sun, 
    Cookie, 
    Moon, 
    Users, 
    Calendar, 
    AlertCircle 
} from 'lucide-react';

const KitchenForecast = () => {
    const { getKitchenForecast, messCuts } = useContext(MessContext);

    const forecast = getKitchenForecast();
    const today = new Date().toISOString().split('T')[0];

    const activeLeavesToday = messCuts.filter(c => 
        c.status === 'Approved' && 
        c.startDate <= today && 
        c.endDate >= today
    );

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            Kitchen Meal Preparation Forecast
                        </h2>
                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                            Real-time Analytics
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Prevents hostel food wastage by forecasting exact meal preparation counts based on approved student mess cuts.
                    </p>
                </div>

                <div className="bg-slate-900 text-white p-4 rounded-2xl text-center shrink-0">
                    <span className="text-[11px] font-semibold text-slate-400 block">Today's Date</span>
                    <span className="text-sm font-extrabold text-emerald-400 font-mono">{today}</span>
                </div>
            </div>

            {/* Attendance Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Hostel Capacity</span>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">{forecast.totalCapacity} <span className="text-xs text-slate-500 font-normal">Students</span></h3>
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-blue-500" /> Total registered hostel residents
                    </p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Absent Today (Mess Cut)</span>
                    <h3 className="text-3xl font-black text-rose-600 mt-1">{forecast.absentToday} <span className="text-xs text-slate-500 font-normal">Students</span></h3>
                    <p className="text-xs text-rose-700 font-medium mt-2 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-rose-500" /> On approved leave today
                    </p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expected Meal Attendance</span>
                    <h3 className="text-3xl font-black text-emerald-600 mt-1">{forecast.expectedAttendance} <span className="text-xs text-slate-500 font-normal">Plates</span></h3>
                    <p className="text-xs text-emerald-700 font-medium mt-2 flex items-center gap-1">
                        <Utensils className="w-3.5 h-3.5 text-emerald-500" /> Target meal prep volume
                    </p>
                </div>
            </div>

            {/* Meal Preparation Targets Grid */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" /> Today's Meal Preparation Quantities
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Breakfast */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between text-amber-600">
                            <Coffee className="w-5 h-5" />
                            <span className="text-[11px] font-bold uppercase">Breakfast</span>
                        </div>
                        <h4 className="text-2xl font-black text-slate-900">{forecast.meals.breakfast} <span className="text-xs text-slate-500 font-normal">portions</span></h4>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full" style={{ width: `${(forecast.meals.breakfast / forecast.totalCapacity) * 100}%` }}></div>
                        </div>
                    </div>

                    {/* Lunch */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between text-blue-600">
                            <Sun className="w-5 h-5" />
                            <span className="text-[11px] font-bold uppercase">Lunch</span>
                        </div>
                        <h4 className="text-2xl font-black text-slate-900">{forecast.meals.lunch} <span className="text-xs text-slate-500 font-normal">portions</span></h4>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full" style={{ width: `${(forecast.meals.lunch / forecast.totalCapacity) * 100}%` }}></div>
                        </div>
                    </div>

                    {/* Snacks */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between text-indigo-600">
                            <Cookie className="w-5 h-5" />
                            <span className="text-[11px] font-bold uppercase">Evening Snacks</span>
                        </div>
                        <h4 className="text-2xl font-black text-slate-900">{forecast.meals.eveningSnacks} <span className="text-xs text-slate-500 font-normal">portions</span></h4>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full" style={{ width: `${(forecast.meals.eveningSnacks / forecast.totalCapacity) * 100}%` }}></div>
                        </div>
                    </div>

                    {/* Dinner */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between text-purple-600">
                            <Moon className="w-5 h-5" />
                            <span className="text-[11px] font-bold uppercase">Dinner</span>
                        </div>
                        <h4 className="text-2xl font-black text-slate-900">{forecast.meals.dinner} <span className="text-xs text-slate-500 font-normal">portions</span></h4>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-purple-600 h-full" style={{ width: `${(forecast.meals.dinner / forecast.totalCapacity) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Students Currently On Mess Cut Leave Today */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900">Students Absent Today ({activeLeavesToday.length})</h3>

                {activeLeavesToday.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">No students are currently on approved mess cut leave today.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeLeavesToday.map(cut => (
                            <div key={cut.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                                <div>
                                    <span className="font-bold text-slate-900">{cut.studentName}</span>
                                    <span className="text-slate-500 block">Room {cut.roomNumber} • {cut.reason}</span>
                                </div>
                                <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-1 rounded-lg">
                                    {cut.startDate} to {cut.endDate}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default KitchenForecast;
