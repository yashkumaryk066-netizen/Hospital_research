import React, { useState } from 'react';
import {
    BedDouble,
    Users,
    Clock,
    FileText,
    MoreVertical,
    Plus,
    Search,
    Filter,
    HeartPulse,
    LogOut,
    AlertCircle,
    Calendar,
    ArrowRight,
    Stethoscope,
    X,
    UserCircle,
    ClipboardCheck
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import DischargeModal from '../components/ipd/DischargeModal';

import { useLocation } from 'react-router-dom';

const IPDAdmission = () => {
    const location = useLocation();
    const initialTab = location.pathname.includes('requests') ? 'requests' : 'active';
    const [activeTab, setActiveTab] = useState(initialTab); // active (admissions), requests
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
    const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);
    const [nppAccepted, setNppAccepted] = useState(false); // HIPAA-004 fix

    // Discharge Modal State
    const [isDischargeModalOpen, setIsDischargeModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleDischargeClick = (patient) => {
        setSelectedPatient(patient);
        setIsDischargeModalOpen(true);
    };

    const bedMap = [
        { id: '101', status: 'occupied', type: 'General', gender: 'M' },
        { id: '102', status: 'available', type: 'General', gender: '' },
        { id: '103', status: 'occupied', type: 'General', gender: 'F' },
        { id: '104', status: 'cleaning', type: 'General', gender: '' },
        { id: 'ICU-1', status: 'critical', type: 'ICU', gender: 'M' },
        { id: 'ICU-2', status: 'critical', type: 'ICU', gender: 'F' },
    ];

    // BUG-026 fix: Professional generic names
    const activePatients = [
        { id: 'IPD-2024-001', name: 'Robert Miller', age: 35, requestedBy: 'Dr. Sharma', department: 'Psychiatry', ward: 'Closed Ward', bed: 'CW-04', admissionDate: '12 Feb, 10:00 AM', status: 'Stable' },
        { id: 'IPD-2024-003', name: 'James Wilson', age: 42, requestedBy: 'Dr. Venture', department: 'Orthopedics', ward: 'Trauma Ward', bed: 'TW-02', admissionDate: '13 Feb, 08:30 AM', status: 'Critical' },
        { id: 'IPD-2024-005', name: 'Linda Carter', age: 32, requestedBy: 'Dr. Brown', department: 'Cardiology', ward: 'ICU', bed: 'ICU-1', admissionDate: '14 Feb, 11:15 AM', status: 'Stable' },
    ];

    const ipdRequests = [
        { id: 'REQ-2024-089', name: 'Sarah Jenkins', age: 55, requestedBy: 'Emergency', department: 'Cardiology', priority: 'High', date: 'Today, 10:30 AM' },
        { id: 'REQ-2024-090', name: 'David Thompson', age: 28, requestedBy: 'OPD (Dr. Lee)', department: 'Neurology', priority: 'Normal', date: 'Today, 11:45 AM' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">IPD Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Real-time overview of In-Patient Department</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
                        <Filter size={18} /> Filters
                    </button>
                    <button
                        onClick={() => setIsAdmitModalOpen(true)}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all hover:scale-[1.05] flex items-center gap-2"
                    >
                        <Plus size={18} />
                        New Admission
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="IPD Requests" value={ipdRequests.length.toString()} trend="up" trendValue="12%" icon={FileText} color="bg-blue-600" />
                <StatCard title="Active Admissions" value={activePatients.length.toString()} trend="stable" trendValue="0%" icon={Users} color="bg-indigo-600" />
                <StatCard title="OT Scheduled" value="5" trend="up" trendValue="2" icon={Calendar} color="bg-purple-600" />
                <StatCard title="Bed Occupancy" value="82%" trend="down" trendValue="3%" icon={BedDouble} color="bg-orange-600" />
            </div>

            {/* Main Content */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
                {/* Tabs & Search */}
                <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex bg-slate-200/50 dark:bg-slate-800 p-1.5 rounded-2xl self-start">
                        <button
                            onClick={() => setActiveTab('active')}
                            className={clsx(
                                "px-8 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all",
                                activeTab === 'active' ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                            )}
                        >
                            Active Patients
                        </button>
                        <button
                            onClick={() => setActiveTab('requests')}
                            className={clsx(
                                "px-8 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all",
                                activeTab === 'requests' ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                            )}
                        >
                            Admission Requests <span className="ml-2 px-2 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg text-[10px]">{ipdRequests.length}</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        {activeTab === 'active' && (
                            <div className="flex bg-slate-200/50 dark:bg-slate-800 p-1 rounded-xl">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={clsx("p-2.5 rounded-lg transition-all", viewMode === 'list' ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200")}
                                >
                                    <FileText size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('map')}
                                    className={clsx("p-2.5 rounded-lg transition-all", viewMode === 'map' ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200")}
                                >
                                    <BedDouble size={20} />
                                </button>
                            </div>
                        )}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name, UHID, Mobile..."
                                className="pl-12 pr-6 py-3 text-sm border border-slate-200 dark:border-slate-800 rounded-2xl w-80 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:border-blue-600 transition-all outline-none dark:bg-slate-900 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                {viewMode === 'list' ? (
                    <div className="overflow-x-auto pb-10">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white dark:bg-slate-900 text-slate-400 uppercase text-[10px] font-black tracking-[0.2em] border-b border-slate-50 dark:border-slate-800">
                                <tr>
                                    <th className="px-8 py-6 font-black">Patient Code</th>
                                    <th className="px-8 py-6 font-black">Patient Identity</th>
                                    <th className="px-8 py-6 font-black">{activeTab === 'requests' ? 'Referral Source' : 'Admitting Doctor'}</th>
                                    <th className="px-8 py-6 font-black">Clinical Unit</th>
                                    {activeTab === 'active' && <th className="px-8 py-6 font-black">Vitals Status</th>}
                                    <th className="px-8 py-6 text-right font-black">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {activeTab === 'active' ? activePatients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all group">
                                        <td className="px-8 py-5 font-bold text-slate-400 font-mono text-xs">{patient.id}</td>
                                        <td className="px-8 py-5">
                                            <div className="font-extrabold text-slate-800 dark:text-white">{patient.name}</div>
                                            <div className="text-[10px] font-black uppercase tracking-tight text-slate-400 mt-0.5">{patient.age} Yrs • Ward {patient.ward} • Bed {patient.bed}</div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-100 dark:border-blue-900/40">
                                                    {patient.requestedBy.charAt(0)}
                                                </div>
                                                <span className="text-slate-700 dark:text-slate-300 font-bold">{patient.requestedBy}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="inline-flex items-center px-4 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                                {patient.department}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={clsx(
                                                "px-4 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                                                patient.status === 'Critical' ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/40 shadow-sm shadow-red-100/20" :
                                                    "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900/40 shadow-sm shadow-green-100/20"
                                            )}>
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-3 group-hover:translate-x-[-4px] transition-transform">
                                                {/* BUG-013 fix: Button is now visible and styled */}
                                                <button
                                                    onClick={() => handleDischargeClick(patient)}
                                                    className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-white bg-slate-900 dark:bg-slate-700 rounded-xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/20 active:scale-95"
                                                >
                                                    Discharge
                                                </button>
                                                <button className="p-2 text-slate-300 dark:text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : ipdRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                                        <td className="px-8 py-5 font-bold text-slate-400 font-mono text-xs">{req.id}</td>
                                        <td className="px-8 py-5">
                                            <div className="font-extrabold text-slate-800 dark:text-white">{req.name}</div>
                                            <div className="text-[10px] font-black uppercase tracking-tight text-slate-400 mt-0.5">{req.age} Yrs • Priority: {req.priority} • {req.date}</div>
                                        </td>
                                        <td className="px-8 py-5 font-bold text-slate-700 dark:text-slate-300">{req.requestedBy}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <Stethoscope size={16} className="text-blue-600 dark:text-blue-400" />
                                                <span className="font-bold text-slate-700 dark:text-slate-300">{req.department}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest hover:underline flex items-center justify-end gap-2 group">
                                                Review Request <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-10 bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-8 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm"><BedDouble size={28} /></div>
                            Virtual Nursing Map
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                            {bedMap.map(bed => (
                                <div key={bed.id} className={clsx(
                                    "relative p-6 rounded-[2.5rem] border-2 flex flex-col items-center justify-center gap-3 aspect-square transition-all cursor-pointer hover:scale-105 shadow-xl bg-white dark:bg-slate-900",
                                    bed.status === 'available' ? "border-slate-100 dark:border-slate-800 border-dashed hover:border-blue-400" :
                                        bed.status === 'occupied' ? "border-blue-100 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-900/10" :
                                            bed.status === 'critical' ? "border-red-100 dark:border-red-900/40 bg-red-50/50 dark:bg-red-900/20 animate-pulse" : "border-orange-100 dark:border-orange-900/40"
                                )}>
                                    <div className={clsx(
                                        "w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl shadow-lg border-4 border-white dark:border-slate-800",
                                        bed.status === 'available' ? "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600" :
                                            bed.gender === 'M' ? "bg-blue-600" : "bg-pink-500"
                                    )}>
                                        {bed.status === 'available' ? <Plus size={32} /> : bed.gender}
                                    </div>
                                    <div className="text-lg font-black text-slate-800 dark:text-white">{bed.id}</div>
                                    <div className="px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-center bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                        {bed.type}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Admit Patient Modal - Expanded BUG-020 */}
            <AnimatePresence>
                {isAdmitModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Direct Patient Admission</h2>
                                    <p className="text-slate-400 font-bold mt-1">Assign clinical unit and bed identity</p>
                                </div>
                                <button onClick={() => setIsAdmitModalOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-2xl transition-all">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-5 bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 text-blue-800 dark:text-blue-300 rounded-3xl text-sm mb-8 flex items-start gap-4">
                                <AlertCircle size={24} className="mt-1 shrink-0 text-blue-600" />
                                <div>
                                    <strong className="block font-black uppercase text-[10px] tracking-widest mb-1 text-blue-900 dark:text-blue-300">Mandatory Privacy Check</strong>
                                    Ensure patient identity has been verified through a government ID and NPP notice is signed.
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Target Patient Identity</label>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input type="text" placeholder="UHID / Phone / Aadhaar" className="w-full pl-12 pr-6 py-3.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:border-blue-600 dark:text-white outline-none text-sm font-bold placeholder:font-normal" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Admitting Physician</label>
                                    <div className="relative">
                                        <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <select className="w-full pl-12 pr-6 py-3.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:border-blue-600 outline-none text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 shadow-sm appearance-none">
                                            <option>Select On-call Doctor</option>
                                            <option>Dr. Sharma (Cardiology)</option>
                                            <option>Dr. Mehta (Orthopedics)</option>
                                            <option>Dr. Brown (Emergency)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Ward Selection</label>
                                    <select className="w-full px-6 py-3.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:border-blue-600 outline-none text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900">
                                        <option>Select Care Level</option>
                                        <option>General Nursing Unit</option>
                                        <option>Intensive Care (ICU)</option>
                                        <option>Private Suite (A-Block)</option>
                                        <option>Emergency Observation</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Clinical Speciality</label>
                                    <input type="text" placeholder="e.g. Cardiology" className="w-full px-6 py-3.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:border-blue-600 dark:text-white outline-none text-sm font-bold" />
                                </div>
                            </div>

                            {/* HIPAA-004 fix: NPP Tracking */}
                            <div className="mt-4 p-5 rounded-3xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/10 mb-8">
                                <div className="flex gap-4">
                                    <div className="mt-0.5">
                                        <input 
                                            type="checkbox" 
                                            id="nppCheck" 
                                            checked={nppAccepted}
                                            onChange={(e) => setNppAccepted(e.target.checked)}
                                            className="w-6 h-6 rounded-lg text-blue-600 border-slate-300 dark:border-slate-700 focus:ring-blue-500 cursor-pointer" 
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="nppCheck" className="text-sm font-bold text-slate-800 dark:text-slate-200 cursor-pointer select-none">Patient has received and signed the Notice of Privacy Practices (NPP)</label>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">This is a mandatory HIPAA requirement for all new admissions.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-auto pt-4">
                                <button onClick={() => setIsAdmitModalOpen(false)} className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all">Cancel admission</button>
                                <button 
                                    disabled={!nppAccepted}
                                    onClick={() => {
                                        alert("Admission request finalized. Bed assignment queued.");
                                        setIsAdmitModalOpen(false);
                                    }}
                                    className="flex-[2] py-4 bg-blue-600 disabled:opacity-50 disabled:grayscale text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <ClipboardCheck size={18} /> Authorize Admission
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* New Discharge Modal */}
            <DischargeModal
                isOpen={isDischargeModalOpen}
                onClose={() => setIsDischargeModalOpen(false)}
                patient={selectedPatient}
            />
        </div>
    );
};

export default IPDAdmission;
