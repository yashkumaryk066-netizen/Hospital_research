import React, { useState } from 'react';
import {
    Calendar,
    Clock,
    User,
    CheckCircle,
    XCircle,
    AlertCircle,
    Plus,
    Filter,
    Search,
    Scissors,
    Activity,
    Thermometer,
    Droplets,
    Phone,
    MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OTBooking = () => {
    const [view, setView] = useState('schedule'); // schedule, new
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    // Mock Surgeries
    const surgeries = [
        { id: 1, patient: "John Doe", procedure: "Appendectomy", surgeon: "Dr. Strange", theater: "OT-1", time: "09:00 AM - 11:00 AM", status: "In Progress", type: "Emergency" },
        { id: 2, patient: "Jane Smith", procedure: "C-Section", surgeon: "Dr. Who", theater: "OT-2", time: "11:30 AM - 01:00 PM", status: "Scheduled", type: "Planned" },
        { id: 3, patient: "Robert Brown", procedure: "Hip Replacement", surgeon: "Dr. House", theater: "OT-3", time: "02:00 PM - 05:00 PM", status: "Scheduled", type: "Planned" },
    ];

    const theaters = [
        { id: 'OT-1', name: 'General Surgery', status: 'In Use', current: 'Appendectomy' },
        { id: 'OT-2', name: 'Obs & Gynae', status: 'Available', next: '11:30 AM' },
        { id: 'OT-3', name: 'Orthopedics', status: 'Available', next: '02:00 PM' },
        { id: 'OT-4', name: 'Cardiac / Neuro', status: 'Cleaning', available: '04:00 PM' },
    ];

    return (
        <div className="space-y-6 animate-fade-in pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                        <Scissors size={24} className="text-teal-600" />
                        Operation Theater Management
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
                        Schedule surgeries, manage resources, and track live status
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setView('new')}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-teal-500/30 flex items-center gap-2 transition-all"
                    >
                        <Plus size={18} /> Schedule Surgery
                    </button>
                </div>
            </div>

            {/* Theater Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {theaters.map((ot) => (
                    <div key={ot.id} className={`p-4 rounded-xl border-2 flex flex-col justify-between h-32 transition-all ${ot.status === 'In Use' ? 'border-red-100 bg-red-50/50' :
                            ot.status === 'Available' ? 'border-green-100 bg-green-50/50' :
                                'border-amber-100 bg-amber-50/50'
                        }`}>
                        <div className="flex justify-between items-start">
                            <span className="font-black text-slate-700 dark:text-slate-200 text-lg">{ot.id}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${ot.status === 'In Use' ? 'bg-red-200 text-red-700' :
                                    ot.status === 'Available' ? 'bg-green-200 text-green-700' :
                                        'bg-amber-200 text-amber-700'
                                }`}>{ot.status}</span>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-500 uppercase">{ot.name}</div>
                            <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5 truncate">
                                {ot.status === 'In Use' ? `Live: ${ot.current}` :
                                    ot.status === 'Available' ? `Next: ${ot.next || 'None'}` :
                                        `Ready by: ${ot.available}`}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Schedule View */}
            {view === 'schedule' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                        <h3 className="font-bold text-slate-700 dark:text-white flex items-center gap-2">
                            <Calendar size={18} className="text-slate-400" />
                            Surgery Schedule ({selectedDate})
                        </h3>
                        <div className="flex gap-2">
                            <input
                                type="date"
                                className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:border-teal-500"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <table className="w-full text-sm text-left">
                        <thead className="bg-white dark:bg-slate-900 text-xs text-slate-500 uppercase font-bold border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Time Slot</th>
                                <th className="px-6 py-4">Theater</th>
                                <th className="px-6 py-4">Procedure</th>
                                <th className="px-6 py-4">Team</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {surgeries.map((surg) => (
                                <tr key={surg.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-slate-400" /> {surg.time}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-700">{surg.theater}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800 dark:text-white">{surg.procedure}</div>
                                        <div className="text-xs text-slate-500 mt-0.5">{surg.patient} • <span className={surg.type === 'Emergency' ? 'text-red-500 font-bold' : 'text-slate-400'}>{surg.type}</span></div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold">
                                                S
                                            </div>
                                            {surg.surgeon}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${surg.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse' :
                                                'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                            {surg.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* New Surgery Form */}
            {view === 'new' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 max-w-2xl mx-auto animate-fade-in-up">
                    <h2 className="text-xl font-black text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                        <Plus size={24} className="text-teal-600" /> New Surgery Booking
                    </h2>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Patient ID</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input type="text" className="w-full pl-10 h-10 border border-slate-200 rounded-lg outline-none focus:border-teal-500" placeholder="Search..." />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Surgery Type</label>
                                <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-teal-500">
                                    <option>Planned</option>
                                    <option>Emergency</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Procedure Name</label>
                            <input type="text" className="w-full px-4 h-11 border border-slate-200 rounded-lg outline-none focus:border-teal-500 font-medium" placeholder="e.g. Laparoscopic Appendectomy" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Surgeon</label>
                                <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-teal-500">
                                    <option>Dr. Strange</option>
                                    <option>Dr. Who</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Anesthetist</label>
                                <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-teal-500">
                                    <option>Dr. Sleep</option>
                                    <option>Dr. Numb</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Theater</label>
                                <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-teal-500">
                                    <option>OT-1</option>
                                    <option>OT-2</option>
                                    <option>OT-3</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Time Slot</label>
                                <div className="flex gap-2">
                                    <input type="time" className="w-full h-10 px-3 border border-slate-200 rounded-lg outline-none focus:border-teal-500" />
                                    <span className="self-center">to</span>
                                    <input type="time" className="w-full h-10 px-3 border border-slate-200 rounded-lg outline-none focus:border-teal-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setView('schedule')}
                                className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button className="flex-1 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-500/30 transition-colors">
                                Book Theater
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default OTBooking;
