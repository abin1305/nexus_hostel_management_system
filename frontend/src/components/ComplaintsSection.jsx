import React, { useState, useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    MessageSquare, 
    Send, 
    CheckCircle2, 
    Clock, 
    AlertTriangle, 
    ShieldCheck, 
    User 
} from 'lucide-react';

const ComplaintsSection = () => {
    const { 
        complaints, 
        addComplaint, 
        updateComplaintStatus, 
        currentStudent, 
        userRole 
    } = useContext(MessContext);

    const [category, setCategory] = useState('Food Quality');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [adminReplies, setAdminReplies] = useState({});

    // Filter complaints for current student if student role
    const filteredComplaints = userRole === 'student' 
        ? complaints.filter(c => c.studentId === currentStudent.id) 
        : complaints;

    const handleSubmitComplaint = (e) => {
        e.preventDefault();
        if (!subject || !description) return;
        addComplaint({ category, subject, description });
        setSubject('');
        setDescription('');
    };

    const handleUpdateStatus = (id, newStatus) => {
        const response = adminReplies[id] || 'Resolution action initiated by Warden office.';
        updateComplaintStatus(id, newStatus, response);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-rose-500" /> Student Complaints & Grievances
                        </h2>
                        <span className="bg-rose-50 text-rose-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-rose-200">
                            Helpdesk Portal
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Submit complaints regarding mess food quality, hygiene, room issues, or billing. Track warden response in real-time.
                    </p>
                </div>
            </div>

            {/* Student Complaint Form (Student Only) */}
            {userRole === 'student' && (
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                        Submit New Complaint / Feedback
                    </h3>

                    <form onSubmit={handleSubmitComplaint} className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Issue Category *</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-bold text-slate-900 focus:outline-none"
                                >
                                    <option value="Food Quality">🍲 Food Quality & Taste</option>
                                    <option value="Hygiene">🧹 Kitchen Hygiene & Cleanliness</option>
                                    <option value="Room Maintenance">🔧 Room / Bed Maintenance</option>
                                    <option value="Billing">💳 Billing & Late Fine Query</option>
                                    <option value="Other">❓ Other Feedback</option>
                                </select>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Subject / Summary *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Request to reduce oil in evening snacks"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Detailed Description *</label>
                            <textarea
                                rows="3"
                                required
                                placeholder="Describe your grievance in detail..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="py-3 px-6 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
                        >
                            <Send className="w-4 h-4" /> Submit Grievance
                        </button>
                    </form>
                </div>
            )}

            {/* Complaints List */}
            <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Submitted Complaints & Status ({filteredComplaints.length})</h3>

                {filteredComplaints.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                        <p className="text-sm font-bold text-slate-800">No active complaints found</p>
                    </div>
                ) : (
                    filteredComplaints.map(cmp => (
                        <div key={cmp.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                                            {cmp.category}
                                        </span>
                                        <h4 className="font-extrabold text-slate-900 text-base">{cmp.subject}</h4>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Submitted by <strong>{cmp.studentName}</strong> (Room {cmp.roomNumber}) on {cmp.createdAt}
                                    </p>
                                </div>

                                <span className={`text-xs font-bold px-3 py-1 rounded-full border shrink-0 ${
                                    cmp.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                    cmp.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                    'bg-amber-50 text-amber-700 border-amber-200'
                                }`}>
                                    {cmp.status}
                                </span>
                            </div>

                            <p className="text-xs text-slate-700 font-medium leading-relaxed">
                                {cmp.description}
                            </p>

                            {/* Warden Response */}
                            {cmp.adminResponse && (
                                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 space-y-1">
                                    <span className="font-bold text-blue-700 flex items-center gap-1.5">
                                        <ShieldCheck className="w-4 h-4" /> Warden Office Resolution Note:
                                    </span>
                                    <p className="text-slate-700">{cmp.adminResponse}</p>
                                </div>
                            )}

                            {/* Warden Action Buttons (Admin Only) */}
                            {userRole === 'admin' && (
                                <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                                    <input
                                        type="text"
                                        placeholder="Add resolution response..."
                                        value={adminReplies[cmp.id] || ''}
                                        onChange={(e) => setAdminReplies({ ...adminReplies, [cmp.id]: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium focus:outline-none"
                                    />

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdateStatus(cmp.id, 'In Progress')}
                                            className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-xl border border-blue-200 hover:bg-blue-100"
                                        >
                                            Mark In Progress
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(cmp.id, 'Resolved')}
                                            className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700"
                                        >
                                            Mark Resolved
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ComplaintsSection;
