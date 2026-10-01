import React, { useState, useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    Utensils, 
    Moon, 
    Save, 
    Sparkles, 
    Coffee, 
    Sun, 
    Cookie 
} from 'lucide-react';

const AdminMenuEditor = () => {
    const { 
        weeklyMenu, 
        updateMenuDay 
    } = useContext(MessContext);

    const [selectedDay, setSelectedDay] = useState('Monday');
    const dayItem = weeklyMenu.find(m => m.day === selectedDay) || weeklyMenu[0];

    const [breakfast, setBreakfast] = useState(dayItem.breakfast);
    const [lunch, setLunch] = useState(dayItem.lunch);
    const [snacks, setSnacks] = useState(dayItem.snacks);
    const [dinner, setDinner] = useState(dayItem.dinner);
    const [type, setType] = useState(dayItem.type);

    const handleSelectDay = (d) => {
        setSelectedDay(d);
        const item = weeklyMenu.find(m => m.day === d) || weeklyMenu[0];
        setBreakfast(item.breakfast);
        setLunch(item.lunch);
        setSnacks(item.snacks);
        setDinner(item.dinner);
        setType(item.type);
    };

    const handleSaveMenu = (e) => {
        e.preventDefault();
        updateMenuDay(selectedDay, {
            breakfast,
            lunch,
            snacks,
            dinner,
            type
        });
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            Mess Menu & Detailed Dinner Editor
                        </h2>
                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                            Warden Customizer
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Customize daily food items & detailed dinner menus. Updates food requirements automatically for the Mess Team.
                    </p>
                </div>
            </div>

            {/* Day Selector Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {weeklyMenu.map(m => (
                    <button
                        key={m.day}
                        onClick={() => handleSelectDay(m.day)}
                        className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                            selectedDay === m.day 
                                ? 'bg-slate-900 text-white shadow-md' 
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        {m.day}
                    </button>
                ))}
            </div>

            {/* Editor Form Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs">
                <form onSubmit={handleSaveMenu} className="space-y-5 text-xs">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                        <h3 className="text-base font-extrabold text-slate-900">Editing Menu for {selectedDay}</h3>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 font-bold text-slate-900 focus:outline-none"
                        >
                            <option value="Veg">🥦 Pure Veg Day</option>
                            <option value="NonVeg">🍗 Non-Veg Special</option>
                            <option value="Egg/Veg">🥚 Egg & Veg Special</option>
                        </select>
                    </div>

                    {/* Detailed Night Dinner Field */}
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl space-y-2">
                        <label className="font-extrabold text-purple-950 text-sm flex items-center gap-2">
                            <Moon className="w-4 h-4 text-purple-600" /> Detailed Night Dinner Menu *
                        </label>
                        <textarea
                            rows="3"
                            required
                            value={dinner}
                            onChange={(e) => setDinner(e.target.value)}
                            placeholder="Enter detailed dinner items (Gravies, Breads, Rice, Salads, Desserts)..."
                            className="w-full bg-white border border-purple-300 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Breakfast */}
                    <div>
                        <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                            <Coffee className="w-4 h-4 text-amber-500" /> Breakfast Menu
                        </label>
                        <input
                            type="text"
                            required
                            value={breakfast}
                            onChange={(e) => setBreakfast(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium text-slate-900 focus:outline-none"
                        />
                    </div>

                    {/* Lunch */}
                    <div>
                        <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                            <Sun className="w-4 h-4 text-blue-500" /> Lunch Menu
                        </label>
                        <input
                            type="text"
                            required
                            value={lunch}
                            onChange={(e) => setLunch(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium text-slate-900 focus:outline-none"
                        />
                    </div>

                    {/* Snacks */}
                    <div>
                        <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                            <Cookie className="w-4 h-4 text-indigo-500" /> Evening Snacks Menu
                        </label>
                        <input
                            type="text"
                            required
                            value={snacks}
                            onChange={(e) => setSnacks(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium text-slate-900 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                        <Save className="w-4 h-4 text-emerald-400" /> Save Menu & Update Mess Required Count
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminMenuEditor;
