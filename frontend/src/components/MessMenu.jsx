import React, { useState } from 'react';
import { 
    Utensils, 
    Coffee, 
    Sun, 
    Cookie, 
    Moon, 
    CheckCircle2, 
    Bell, 
    Filter, 
    Sparkles, 
    Heart 
} from 'lucide-react';

const MessMenu = () => {
    const [filterType, setFilterType] = useState('All'); // 'All', 'Veg', 'NonVeg'
    const [skippedMeals, setSkippedMeals] = useState({});

    const weeklyMenu = [
        {
            day: 'Monday',
            breakfast: 'Crispy Idli, Sambhar, Coconut Chutney & Hot Filter Coffee/Tea',
            lunch: 'Rajma Masala, Steamed Basmati Rice, Butter Chapati, Fresh Curd & Cucumber Salad',
            snacks: 'Crispy Samosa, Mint Chutney & Chai',
            dinner: 'Aloo Gobi Dry, Dal Tadka, Tandoori Roti, Jeera Rice, Green Salad, Papad & Hot Gulab Jamun Dessert',
            type: 'Veg'
        },
        {
            day: 'Tuesday',
            breakfast: 'Puri Bhaji, Fresh Banana & Hot Milk/Tea',
            lunch: 'Kadai Paneer, Veg Pulao, Butter Chapati & Boondi Raita',
            snacks: 'Veg Cutlet, Ketchup & Tea',
            dinner: 'Egg Curry / Shahi Paneer Gravy, Yellow Dal Fry, Phulka Roti, Steamed Rice, Onion Salad & Rasgulla Dessert',
            type: 'Egg/Veg'
        },
        {
            day: 'Wednesday',
            breakfast: 'Stuffed Aloo Paratha, Fresh Curd, Mixed Pickle & Tea/Coffee',
            lunch: 'Chicken Gravy / Paneer Butter Masala, Saffron Rice, Butter Roti & Garden Salad',
            snacks: 'Bread Pakora & Hot Chai',
            dinner: 'Mix Veg Handi, Dal Makhani, Tandoori Naan, Steamed Rice, Green Salad, Papad & Rice Kheer Dessert',
            type: 'NonVeg'
        },
        {
            day: 'Thursday',
            breakfast: 'Masala Dosa, Spicy Sambhar & Peanut Chutney',
            lunch: 'Delhi Style Chole Bhature, Masala Chass & Onion Salad',
            snacks: 'Bhel Puri & Cold Coffee',
            dinner: 'Sev Tamatar Sabzi, Dal Fry, Whole Wheat Chapati, Steamed Rice, Salad, Pickle & Moong Dal Halwa Dessert',
            type: 'Veg'
        },
        {
            day: 'Friday',
            breakfast: 'Indori Poha, Jalebi, Boiled Sprouts & Tea/Coffee',
            lunch: 'Special Veg Biryani, Mirchi Ka Salan, Onion Raita & Papad',
            snacks: 'Peri Peri French Fries & Hot Tea',
            dinner: 'Hyderabadi Chicken Biryani / Malai Kofta Curry, Gravy, Butter Naan, Salad, Raitha & Chocolate Ice Cream Dessert',
            type: 'NonVeg'
        },
        {
            day: 'Saturday',
            breakfast: 'Onion Uttapam, Tomato Chutney & Tea/Coffee',
            lunch: 'Rajasthani Dal Baati Churma, Gatte Ki Sabzi & Spicy Buttermilk',
            snacks: 'Mumbai Pav Bhaji & Hot Tea',
            dinner: 'Bhindi Masala Fry, Panchmel Dal, Whole Wheat Roti, Steamed Rice, Salad, Chutney & Fruit Custard Dessert',
            type: 'Veg'
        },
        {
            day: 'Sunday',
            breakfast: 'Chana Puri, Sooji Halwa & Milk/Tea',
            lunch: 'Sunday Feast: Butter Chicken / Shahi Paneer Tikka, Garlic Naan, Fried Rice & Rasmalai Dessert',
            snacks: 'Cream Biscuits & Tea',
            dinner: 'Special Khichdi, Gujarati Kadhi, Roasted Papad, Garlic Chutney & Fresh Seasonal Fruits',
            type: 'NonVeg'
        }
    ];

    const toggleMealSkip = (day, mealType) => {
        const key = `${day}-${mealType}`;
        setSkippedMeals(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const filteredMenu = weeklyMenu.filter(item => {
        if (filterType === 'Veg') return item.type === 'Veg';
        if (filterType === 'NonVeg') return item.type === 'NonVeg' || item.type === 'Egg/Veg';
        return true;
    });

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            Hostel Weekly Mess Menu & Detailed Dinner Schedule
                        </h2>
                        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                            Detailed All Days Dinner Menu
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        View comprehensive meal plans for Breakfast, Lunch, Evening Snacks, and Detailed Night Dinners with daily desserts.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold px-2">Filter:</span>
                    {['All', 'Veg', 'NonVeg'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                filterType === type 
                                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200' 
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            {type === 'All' ? 'All Days' : type === 'Veg' ? '🥦 Pure Veg' : '🍗 Non-Veg Special'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenu.map(item => (
                    <div 
                        key={item.day}
                        className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
                    >
                        {/* Card Header */}
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                            <div>
                                <h3 className="text-lg font-extrabold text-slate-900">{item.day}</h3>
                                <span className="text-[11px] text-slate-400 font-medium">Daily Meal Schedule</span>
                            </div>
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                                item.type === 'Veg' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                item.type === 'NonVeg' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                                {item.type === 'Veg' ? '🥦 Pure Veg' : '🍗 Non-Veg Special'}
                            </span>
                        </div>

                        {/* Meals Breakdown */}
                        <div className="space-y-3.5 text-xs">
                            {/* Breakfast */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl shrink-0 mt-0.5">
                                    <Coffee className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="font-bold text-slate-900">Breakfast (7:30 AM - 9:30 AM)</span>
                                    <p className="text-slate-600 mt-0.5 leading-relaxed">{item.breakfast}</p>
                                </div>
                            </div>

                            {/* Lunch */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0 mt-0.5">
                                    <Sun className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="font-bold text-slate-900">Lunch (12:30 PM - 2:30 PM)</span>
                                    <p className="text-slate-600 mt-0.5 leading-relaxed">{item.lunch}</p>
                                </div>
                            </div>

                            {/* Snacks */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 mt-0.5">
                                    <Cookie className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="font-bold text-slate-900">Evening Snacks (5:00 PM - 6:00 PM)</span>
                                    <p className="text-slate-600 mt-0.5 leading-relaxed">{item.snacks}</p>
                                </div>
                            </div>

                            {/* Detailed Dinner Section */}
                            <div className="p-3 bg-purple-50/70 border border-purple-200/80 rounded-2xl space-y-1.5">
                                <div className="flex items-center gap-2 text-purple-900 font-extrabold">
                                    <Moon className="w-4 h-4 text-purple-600" />
                                    <span>Detailed Night Dinner (7:30 PM - 9:30 PM)</span>
                                </div>
                                <p className="text-slate-800 font-medium leading-relaxed">
                                    {item.dinner}
                                </p>
                            </div>
                        </div>

                        {/* Skip Dinner Toggle */}
                        <div className="border-t border-slate-100 pt-3">
                            <button
                                onClick={() => toggleMealSkip(item.day, 'Dinner')}
                                className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                                    skippedMeals[`${item.day}-Dinner`]
                                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                                <Bell className="w-3.5 h-3.5" />
                                {skippedMeals[`${item.day}-Dinner`] 
                                    ? `✔ Notified Kitchen: Skipping ${item.day} Dinner` 
                                    : `Inform Kitchen: Skip ${item.day} Dinner`}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessMenu;
