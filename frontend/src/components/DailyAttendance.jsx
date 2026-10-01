import React, { useState, useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    CheckCircle2, 
    Calendar, 
    UserCheck, 
    Utensils, 
    Coffee, 
    Sun, 
    Cookie, 
    Moon, 
    Save, 
    Home, 
    ShieldCheck 
} from 'lucide-react';

const DailyAttendance = () => {
    const { 
        students, 
        attendanceRecords, 
        updateAttendance, 
        userRole 
    } = useContext(MessContext);

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const dayAttendance = attendanceRecords[selectedDate] || {};

    const [localAttendance, setLocalAttendance] = useState(() => {
        const initial = {};
        students.forEach(s => {
            initial[s.id] = dayAttendance[s.id] || {
                hostel: 'Present',
                food: { breakfast: true, lunch: true, snacks: true, dinner: true }
            };
        });
        return initial;
    });

    const handleHostelChange = (studentId, status) => {
        setLocalAttendance(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                hostel: status,
                // If on leave/absent, turn off food attendance automatically
                food: status === 'Present' 
                    ? { breakfast: true, lunch: true, snacks: true, dinner: true }
                    : { breakfast: false, lunch: false, snacks: false, dinner: false }
            }
        }));
    };

    const handleFoodToggle = (studentId, meal) => {
        setLocalAttendance(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                food: {
                    ...prev[studentId].food,
                    [meal]: !prev[studentId].food[meal]
                }
            }
        }));
    };

    const handleSaveAll = () => {
        students.forEach(s => {
            updateAttendance(selectedDate, s.id, localAttendance[s.id].hostel, localAttendance[s.id].food);
        });
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            Daily Hostel & Food Attendance Tracker
                        </h2>
                        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                            Live Scanner
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Track hostel presence and meal intake (Breakfast, Lunch, Snacks, Dinner) for room residents.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {userRole !== 'student' && (
                        <button
                            onClick={handleSaveAll}
                            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
                        >
                            <Save className="w-4 h-4 text-emerald-400" /> Save Records
                        </button>
                    )}
                </div>
            </div>

            {/* Attendance Roster Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                <th className="py-3.5 px-4">Student & Room Allocation</th>
                                <th className="py-3.5 px-4">Hostel Status</th>
                                <th className="py-3.5 px-4 text-center">Breakfast ☕</th>
                                <th className="py-3.5 px-4 text-center">Lunch ☀️</th>
                                <th className="py-3.5 px-4 text-center">Snacks 🍪</th>
                                <th className="py-3.5 px-4 text-center">Dinner 🌙</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {students.map(s => {
                                const att = localAttendance[s.id] || { hostel: 'Present', food: { breakfast: true, lunch: true, snacks: true, dinner: true } };

                                return (
                                    <tr key={s.id} className="hover:bg-slate-50/60 transition-all">
                                        <td className="py-4 px-4 space-y-0.5">
                                            <span className="font-extrabold text-slate-900 text-sm block">{s.name}</span>
                                            <span className="text-[11px] text-slate-500 block">
                                                🏠 <strong className="text-slate-800">{s.block}, Room {s.room} ({s.bed})</strong> • {s.roomType}
                                            </span>
                                            <span className="text-[10px] text-emerald-600 font-semibold block">Room Rent: ₹0.00</span>
                                        </td>

                                        <td className="py-4 px-4">
                                            <select
                                                disabled={userRole === 'student'}
                                                value={att.hostel}
                                                onChange={(e) => handleHostelChange(s.id, e.target.value)}
                                                className={`px-3 py-1.5 rounded-xl font-bold text-xs border focus:outline-none cursor-pointer ${
                                                    att.hostel === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                    att.hostel === 'On Leave' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                    'bg-rose-50 text-rose-700 border-rose-200'
                                                }`}
                                            >
                                                <option value="Present">Present</option>
                                                <option value="Absent">Absent</option>
                                                <option value="On Leave">On Leave</option>
                                            </select>
                                        </td>

                                        {/* Breakfast Toggle */}
                                        <td className="py-4 px-4 text-center">
                                            <button
                                                disabled={userRole === 'student'}
                                                onClick={() => handleFoodToggle(s.id, 'breakfast')}
                                                className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                                                    att.food.breakfast 
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                                        : 'bg-slate-100 text-slate-400 border-slate-200'
                                                }`}
                                            >
                                                {att.food.breakfast ? '✔ Taken' : '❌ Skipped'}
                                            </button>
                                        </td>

                                        {/* Lunch Toggle */}
                                        <td className="py-4 px-4 text-center">
                                            <button
                                                disabled={userRole === 'student'}
                                                onClick={() => handleFoodToggle(s.id, 'lunch')}
                                                className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                                                    att.food.lunch 
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                                        : 'bg-slate-100 text-slate-400 border-slate-200'
                                                }`}
                                            >
                                                {att.food.lunch ? '✔ Taken' : '❌ Skipped'}
                                            </button>
                                        </td>

                                        {/* Snacks Toggle */}
                                        <td className="py-4 px-4 text-center">
                                            <button
                                                disabled={userRole === 'student'}
                                                onClick={() => handleFoodToggle(s.id, 'snacks')}
                                                className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                                                    att.food.snacks 
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                                        : 'bg-slate-100 text-slate-400 border-slate-200'
                                                }`}
                                            >
                                                {att.food.snacks ? '✔ Taken' : '❌ Skipped'}
                                            </button>
                                        </td>

                                        {/* Dinner Toggle */}
                                        <td className="py-4 px-4 text-center">
                                            <button
                                                disabled={userRole === 'student'}
                                                onClick={() => handleFoodToggle(s.id, 'dinner')}
                                                className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                                                    att.food.dinner 
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                                        : 'bg-slate-100 text-slate-400 border-slate-200'
                                                }`}
                                            >
                                                {att.food.dinner ? '✔ Taken' : '❌ Skipped'}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DailyAttendance;
