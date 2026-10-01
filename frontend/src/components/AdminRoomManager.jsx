import React, { useState, useContext } from 'react';
import { MessContext } from '../context/MessContext';
import { 
    Home, 
    Building, 
    UserCheck, 
    Users, 
    Plus, 
    Save, 
    ShieldCheck 
} from 'lucide-react';

const AdminRoomManager = () => {
    const { 
        students, 
        updateRoomAllocation, 
        addStudent 
    } = useContext(MessContext);

    const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
    const [block, setBlock] = useState('Block A');
    const [room, setRoom] = useState('102');
    const [bed, setBed] = useState('Bed 1');
    const [roomType, setRoomType] = useState('Double Sharing Non-AC');
    const [roommates, setRoommates] = useState('Vikram Patel');

    // New Student Form State
    const [newId, setNewId] = useState('STU105');
    const [newName, setNewName] = useState('Karan Gupta');
    const [newDept, setNewDept] = useState('Information Tech');

    const handleSaveAllocation = (e) => {
        e.preventDefault();
        updateRoomAllocation(selectedStudentId, {
            block,
            room,
            bed,
            roomType,
            roommates: roommates.split(',').map(r => r.trim())
        });
    };

    const handleAddNewStudent = (e) => {
        e.preventDefault();
        addStudent({
            id: newId,
            name: newName,
            room: '305',
            bed: 'Bed 1',
            block: 'Block A',
            roomType: 'Double Sharing Non-AC',
            roommates: [],
            department: newDept,
            year: '1st Year',
            phone: '+91 98765 43299'
        });
        setNewId(`STU${Math.floor(100 + Math.random() * 900)}`);
        setNewName('');
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            Room Allocation & Roommates Manager
                        </h2>
                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                            Warden Control Panel
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Allocate hostel blocks, rooms, bed positions, and assign roommates. Room rent monetary charge is strictly ₹0.
                    </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-center shrink-0">
                    <span className="text-[11px] font-semibold text-emerald-800 block">Monetary Room Rent</span>
                    <span className="text-lg font-black text-emerald-600">₹0.00 (Waived)</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Allocation Form (Left) */}
                <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Building className="w-4 h-4 text-blue-600" /> Allocate / Edit Room for Student
                    </h3>

                    <form onSubmit={handleSaveAllocation} className="space-y-4 text-xs">
                        <div>
                            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Select Student *</label>
                            <select
                                value={selectedStudentId}
                                onChange={(e) => setSelectedStudentId(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {students.map(s => (
                                    <option key={s.id} value={s.id}>
                                        {s.name} ({s.id} • Room {s.room})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Hostel Block</label>
                                <select
                                    value={block}
                                    onChange={(e) => setBlock(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 font-bold text-slate-900 focus:outline-none"
                                >
                                    <option value="Block A">Block A</option>
                                    <option value="Block B">Block B</option>
                                    <option value="Block C">Block C</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Room No.</label>
                                <input
                                    type="text"
                                    required
                                    value={room}
                                    onChange={(e) => setRoom(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Bed No.</label>
                                <input
                                    type="text"
                                    required
                                    value={bed}
                                    onChange={(e) => setBed(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Room Category</label>
                            <select
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:outline-none"
                            >
                                <option value="Double Sharing Non-AC">Double Sharing Non-AC</option>
                                <option value="Triple Sharing Non-AC">Triple Sharing Non-AC</option>
                                <option value="Single Deluxe Non-AC">Single Deluxe Non-AC</option>
                                <option value="Double Sharing AC">Double Sharing AC</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Assigned Roommates (Comma separated)</label>
                            <input
                                type="text"
                                value={roommates}
                                onChange={(e) => setRoommates(e.target.value)}
                                placeholder="e.g. Vikram Patel, Ananya"
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium text-slate-900 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
                        >
                            <Save className="w-4 h-4" /> Save Room Allocation
                        </button>
                    </form>
                </div>

                {/* Existing Allocations List (Right) */}
                <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Users className="w-4 h-4 text-emerald-600" /> Active Student Room Roster
                    </h3>

                    <div className="space-y-3">
                        {students.map(s => (
                            <div key={s.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                                <div className="flex justify-between items-center">
                                    <span className="font-extrabold text-slate-900 text-sm">{s.name} ({s.id})</span>
                                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                                        ₹0.00 Rent
                                    </span>
                                </div>
                                <div className="text-slate-600 space-y-0.5">
                                    <p>🏠 <strong>{s.block}, Room {s.room} ({s.bed})</strong> • {s.roomType}</p>
                                    <p className="text-slate-500">Roommates: {Array.isArray(s.roommates) ? s.roommates.join(', ') : s.roommates || 'None'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRoomManager;
