import React, { useState } from 'react';
import {
    Stethoscope,
    Users,
    Calendar,
    CheckCircle,
    Activity,
    Clock,
    Search,
    Filter,
    ChevronDown,
    ArrowRight,
    MapPin,
    Phone,
    FileText,
    MoreVertical
} from 'lucide-react';

const Doctors = () => {
    const [view, setView] = useState('my_patients'); // my_patients, all_doctors

    // Mock My Patients
    const myPatients = [
        { id: 'IPD-001', name: 'Sarah Connor', age: 35, loc: 'Ward 3, Bed 12', diag: 'Acute Bronchitis', status: 'Stable', lastVisit: 'Today, 09:00 AM' },
        { id: 'IPD-005', name: 'Ellen Ripley', age: 32, loc: 'ICU-1', diag: 'Trauma', status: 'Critical', lastVisit: 'Today, 08:30 AM' },
        { id: 'OPD-102', name: 'Kyle Reese', age: 42, loc: 'OPD Waiting', diag: 'Follow-up', status: 'Waiting', lastVisit: '---' },
    ];

    // Mock Doctor List
    const doctorsList = [
        { id: 1, name: 'Dr. Silberman', dept: 'Psychiatry', patients: 12, status: 'On Rounds', cabin: '204' },
        { id: 2, name: 'Dr. Venture', dept: 'Orthopedics', patients: 8, status: 'In OT', cabin: 'OT-1' },
        { id: 3, name: 'Dr. Ash', dept: 'Cardiology', patients: 15, status: 'Available', cabin: '102' },
    ];

    return (
        <div className="space-y-6 animate-fade-in pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                        <Stethoscope size={24} className="text-indigo-600" />
                        clinical_workspace
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
                        Manage your patients, rounds, and tasks
                    </p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setView('my_patients')}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${view === 'my_patients' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        My Patients
                    </button>
                    <button
                        onClick={() => setView('all_doctors')}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${view === 'all_doctors' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Doctor Directory
                    </button>
                </div>
            </div>

            {view === 'my_patients' && (
                <div className="space-y-6">
                    {/* Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                            <div className="text-xs font-bold text-indigo-600 uppercase">My In-Patients</div>
                            <div className="text-2xl font-black text-indigo-900 mt-1">8</div>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                            <div className="text-xs font-bold text-blue-600 uppercase">OPD Appointments</div>
                            <div className="text-2xl font-black text-blue-900 mt-1">14</div>
                        </div>
                        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
                            <div className="text-xs font-bold text-orange-600 uppercase">Pending Review</div>
                            <div className="text-2xl font-black text-orange-900 mt-1">3</div>
                        </div>
                        <div className="bg-green-50 border border-green-100 p-4 rounded-xl">
                            <div className="text-xs font-bold text-green-600 uppercase">Discharges Today</div>
                            <div className="text-2xl font-black text-green-900 mt-1">2</div>
                        </div>
                    </div>

                    {/* Patient List */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-700">Admitted Patients (IPD)</h3>
                            <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {myPatients.map((pat) => (
                                <div key={pat.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${pat.status === 'Critical' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
                                            {pat.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800 dark:text-white">{pat.name} <span className="text-xs font-normal text-slate-400">({pat.id})</span></div>
                                            <div className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-0.5">
                                                <MapPin size={12} /> {pat.loc} • <Activity size={12} /> {pat.diag}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right hidden md:block">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase">Last Visit</div>
                                            <div className="text-xs font-bold text-slate-700">{pat.lastVisit}</div>
                                        </div>
                                        <button className="px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors">
                                            Add Note
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {view === 'all_doctors' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                    {doctorsList.map((doc) => (
                        <div key={doc.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4 group hover:border-indigo-500/50 transition-all">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xl">
                                        {doc.name.charAt(4)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg text-slate-800 dark:text-white">{doc.name}</div>
                                        <div className="text-sm text-indigo-600 font-medium">{doc.dept}</div>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${doc.status === 'Available' ? 'bg-green-100 text-green-700' :
                                        doc.status === 'In OT' ? 'bg-red-100 text-red-700' :
                                            'bg-amber-100 text-amber-700'
                                    }`}>
                                    {doc.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100 dark:border-slate-800 mt-2">
                                <div>
                                    <div className="text-xs text-slate-400 font-bold uppercase">Active Patients</div>
                                    <div className="text-lg font-black text-slate-800 dark:text-white">{doc.patients}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-slate-400 font-bold uppercase">Location</div>
                                    <div className="text-lg font-black text-slate-800 dark:text-white">{doc.cabin}</div>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-auto">
                                <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                    <Phone size={14} /> Call
                                </button>
                                <button className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                    <Calendar size={14} /> Schedule
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Doctors;
