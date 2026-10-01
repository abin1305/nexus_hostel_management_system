import React, { useState, useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    Bell, 
    PlusCircle, 
    Sparkles, 
    Calendar, 
    Send, 
    CheckCircle2 
} from 'lucide-react';

const Announcements = () => {
    const { 
        announcements, 
        addAnnouncement, 
        userRole 
    } = useContext(MessContext);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Festival Feast');

    const handlePost = (e) => {
        e.preventDefault();
        if (!title || !content) return;
        addAnnouncement({ title, content, category });
        setTitle('');
        setContent('');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            <Bell className="w-6 h-6 text-amber-500" /> Hostel & Mess Announcements
                        </h2>
                        <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                            Notice Board
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Official hostel updates, festival feast notices, and mess payment deadline reminders.
                    </p>
                </div>
            </div>

            {/* Post Announcement Form (Admin Only) */}
            {userRole === 'admin' && (
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                        <PlusCircle className="w-4 h-4 text-blue-600" /> Publish New Announcement
                    </h3>

                    <form onSubmit={handlePost} className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2">
                                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Notice Title *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Special Sunday Feast Announcement"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:outline-none"
                                >
                                    <option value="Festival Feast">🎉 Festival Feast</option>
                                    <option value="Mess Notice">📢 Mess Notice</option>
                                    <option value="Maintenance">🔧 Maintenance</option>
                                    <option value="General">ℹ️ General</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Notice Content *</label>
                            <textarea
                                rows="3"
                                required
                                placeholder="Enter full announcement details for hostel residents..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
                        >
                            <Send className="w-4 h-4" /> Publish Announcement
                        </button>
                    </form>
                </div>
            )}

            {/* Announcements List */}
            <div className="space-y-4">
                {announcements.map(anc => (
                    <div key={anc.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-3">
                            <div>
                                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 inline-block mb-1">
                                    {anc.category}
                                </span>
                                <h3 className="text-base font-bold text-slate-900">{anc.title}</h3>
                            </div>
                            <span className="text-xs text-slate-400 font-mono shrink-0">📅 {anc.date}</span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            {anc.content}
                        </p>

                        <div className="text-[11px] text-slate-400">
                            Posted by: <strong className="text-slate-700">{anc.postedBy}</strong>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcements;
