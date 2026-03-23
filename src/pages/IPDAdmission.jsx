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
    Stethoscope
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

    // Mock Data - Active Admissions
    const activePatients = [
        { id: 'IPD-2024-001', name: 'Sarah Connor', age: 35, requestedBy: 'Dr. Silberman', department: 'Psychiatry', ward: 'Closed Ward', bed: 'CW-04', admissionDate: '12 Feb, 10:00 AM', status: 'Stable' },
        { id: 'IPD-2024-003', name: 'Kyle Reese', age: 42, requestedBy: 'Dr. Venture', department: 'Orthopedics', ward: 'Trauma Ward', bed: 'TW-02', admissionDate: '13 Feb, 08:30 AM', status: 'Critical' },
        { id: 'IPD-2024-005', name: 'Ellen Ripley', age: 32, requestedBy: 'Dr. Ash', department: 'Cardiology', ward: 'ICU', bed: 'ICU-1', admissionDate: '14 Feb, 11:15 AM', status: 'Stable' },
    ];

    // Mock Data - IPD Requests
    const ipdRequests = [
        { id: 'REQ-2024-089', name: 'John Doe', age: 55, requestedBy: 'Emergency', department: 'Cardiology', priority: 'High', date: 'Today, 10:30 AM' },
        { id: 'REQ-2024-090', name: 'Jane Smith', age: 28, requestedBy: 'OPD (Dr. Lee)', department: 'Neurology', priority: 'Normal', date: 'Today, 11:45 AM' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">IPD Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-1">Real-time overview of In-Patient Department</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                        <Filter size={18} /> Filter
                    </button>
                    <button
                        onClick={() => setIsAdmitModalOpen(true)}
                        className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-blue-600 shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] flex items-center gap-2"
                    >
                        <Plus size={18} />
                        New Admission
                    </button>
                </div>
            </div>

            {/* Stats - Matches Figma */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="IPD Requests" value={ipdRequests.length.toString()} trend="up" trendValue="12%" icon={FileText} color="bg-blue-500" />
                <StatCard title="Active Admissions" value={activePatients.length.toString()} trend="stable" trendValue="0%" icon={Users} color="bg-indigo-500" />
                <StatCard title="OT Scheduled" value="5" trend="up" trendValue="2" icon={Calendar} color="bg-purple-500" />
                <StatCard title="Bed Occupancy" value="82%" trend="down" trendValue="3%" icon={BedDouble} color="bg-orange-500" />
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Tabs & Search */}
                <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex bg-slate-100 p-1.5 rounded-xl self-start">
                        <button
                            onClick={() => setActiveTab('active')}
                            className={clsx(
                                "px-6 py-2 text-sm font-bold rounded-lg transition-all",
                                activeTab === 'active' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            Active Admissions
                        </button>
                        <button
                            onClick={() => setActiveTab('requests')}
                            className={clsx(
                                "px-6 py-2 text-sm font-bold rounded-lg transition-all",
                                activeTab === 'requests' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            IPD Requests <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 rounded-md text-xs">{ipdRequests.length}</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        {activeTab === 'active' && (
                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={clsx("p-2 rounded-md transition-all", viewMode === 'list' ? "bg-white shadow text-primary" : "text-slate-400 hover:text-slate-600")}
                                >
                                    <FileText size={18} />
                                </button>
                                <button
                                    onClick={() => setViewMode('map')}
                                    className={clsx("p-2 rounded-md transition-all", viewMode === 'map' ? "bg-white shadow text-primary" : "text-slate-400 hover:text-slate-600")}
                                >
                                    <BedDouble size={18} />
                                </button>
                            </div>
                        )}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search records..."
                                className="pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl w-64 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white"
                            />
                        </div>
                    </div>
                </div>

                {viewMode === 'list' ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold tracking-wider">Patient ID</th>
                                    <th className="px-6 py-4 font-bold tracking-wider">Patient Name</th>
                                    <th className="px-6 py-4 font-bold tracking-wider">{activeTab === 'requests' ? 'Source' : 'Requested By'}</th>
                                    <th className="px-6 py-4 font-bold tracking-wider">Department</th>
                                    {activeTab === 'active' && <th className="px-6 py-4 font-bold tracking-wider">Status</th>}
                                    <th className="px-6 py-4 text-right font-bold tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {activeTab === 'active' ? activePatients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-slate-600 font-mono">{patient.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{patient.name}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">{patient.age} Yrs • {patient.ward} ({patient.bed})</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                                    {patient.requestedBy.charAt(0)}
                                                </div>
                                                <span className="text-slate-700 font-medium">{patient.requestedBy}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                                {patient.department}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={clsx(
                                                "px-2.5 py-1 rounded-full text-xs font-bold border",
                                                patient.status === 'Critical' ? "bg-red-50 text-red-600 border-red-100" :
                                                    "bg-green-50 text-green-600 border-green-100"
                                            )}>
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleDischargeClick(patient)}
                                                    className="px-3 py-1.5 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                                                >
                                                    Discharge
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : ipdRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-600 font-mono">{req.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{req.name}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">{req.age} Yrs • {req.date}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-700">{req.requestedBy}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Stethoscope size={14} className="text-slate-400" />
                                                <span className="font-medium text-slate-700">{req.department}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-primary font-bold text-xs hover:underline flex items-center justify-end gap-1">
                                                Review Request <ArrowRight size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-8">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary"><BedDouble /></div>
                            Virtual Bed Map
                        </h3>
                        {/* Reuse existing map logic or enhance it - keeping simple for now to focus on requested changes */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {bedMap.map(bed => (
                                <div key={bed.id} className={clsx(
                                    "relative p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 aspect-square transition-all cursor-pointer hover:scale-105 shadow-sm hover:shadow-md bg-white",
                                    bed.status === 'available' ? "border-slate-200 border-dashed hover:border-green-400" :
                                        bed.status === 'occupied' ? "border-blue-100 bg-blue-50/30" :
                                            bed.status === 'critical' ? "border-red-100 bg-red-50/30 animate-pulse" : "border-orange-100"
                                )}>
                                    <div className={clsx(
                                        "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm mb-1",
                                        bed.status === 'available' ? "bg-slate-100 text-slate-400" :
                                            bed.gender === 'M' ? "bg-blue-500" : "bg-pink-500"
                                    )}>
                                        {bed.status === 'available' ? <Plus size={24} /> : bed.gender}
                                    </div>
                                    <div className="text-sm font-bold text-slate-700">{bed.id}</div>
                                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider text-center">
                                        {bed.type}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Existing Admission Modal */}
            <AnimatePresence>
                {isAdmitModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Admit Patient</h2>
                                <button onClick={() => setIsAdmitModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><LogOut size={20} className="rotate-180 text-slate-400" /></button>
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-100 text-blue-800 rounded-xl text-sm mb-6 flex items-start gap-3">
                                <AlertCircle size={18} className="mt-0.5 shrink-0 text-blue-600" />
                                <div>
                                    <strong className="block mb-0.5 text-blue-900">HIPAA Compliance Check</strong>
                                    Ensure patient has signed the Notice of Privacy Practices (NPP) before proceeding with admission.
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Patient Details</label>
                                    <input type="text" placeholder="Search by UHID / Name / Mobile" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Assign Ward</label>
                                    <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-600">
                                        <option>Select Ward Type</option>
                                        <option>General Ward</option>
                                        <option>Private Ward</option>
                                        <option>ICU</option>
                                    </select>
                                </div>
                                <button className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-primary/25 mt-2">Proceed to Admission</button>
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
