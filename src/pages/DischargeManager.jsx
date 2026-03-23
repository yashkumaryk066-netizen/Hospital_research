import React, { useState } from 'react';
import {
    LogOut,
    CheckCircle,
    Clock,
    FileText,
    DollarSign,
    Shield,
    MoreVertical,
    Search,
    Filter,
    Printer,
    ArrowRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data for KanBan
const initialPatients = {
    planned: [
        { id: 'IPD-004', name: 'John Wick', uhid: 'UHID-9921', ward: 'Private A-101', doctor: 'Dr. Strange', reason: 'Post-Op Recovery', due: 'Today, 2:00 PM' },
        { id: 'IPD-009', name: 'Bruce Wayne', uhid: 'UHID-1120', ward: 'Suite 1', doctor: 'Dr. House', reason: 'Observation', due: 'Tomorrow, 10:00 AM' },
    ],
    clinical: [
        { id: 'IPD-002', name: 'Sarah Connor', uhid: 'UHID-8921', ward: 'General 104', doctor: 'Dr. Silberman', status: 'Vitals Stable', time: '10:30 AM' },
    ],
    billing: [
        { id: 'IPD-005', name: 'Ellen Ripley', uhid: 'UHID-3321', ward: 'ICU-B', doctor: 'Dr. McCoy', bill: '$12,450', pending: '$1,200', insurer: 'Aetna' },
    ],
    completed: [
        { id: 'IPD-001', name: 'Marty McFly', uhid: 'UHID-5566', ward: 'General 102', doctor: 'Dr. Brown', type: 'Regular', time: '09:15 AM' },
    ]
};

const PatientCard = ({ patient, stage }) => (
    <motion.div
        layoutId={patient.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
    >
        <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 dark:bg-slate-800 group-hover:bg-brand transition-colors"></div>
        <div className="pl-3">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">{patient.name}</h4>
                    <p className="text-[10px] uppercase font-bold text-slate-400">{patient.uhid}</p>
                </div>
                {stage === 'billing' ? (
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{patient.pending}</span>
                ) : (
                    <button className="text-slate-300 hover:text-slate-500"><MoreVertical size={16} /></button>
                )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-700">{patient.ward}</span>
                <span>•</span>
                <span>{patient.doctor}</span>
            </div>

            {/* Stage Specific Actions */}
            <div className="pt-3 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                {stage === 'planned' && (
                    <>
                        <span className="text-[10px] font-bold text-orange-500 flex items-center gap-1"><Clock size={10} /> {patient.due}</span>
                        <button className="text-xs font-bold text-brand hover:underline">Start Process</button>
                    </>
                )}
                {stage === 'clinical' && (
                    <>
                        <span className="text-[10px] font-bold text-green-600 flex items-center gap-1"><CheckCircle size={10} /> Ready</span>
                        <button className="text-xs font-bold text-brand hover:underline">Sign File</button>
                    </>
                )}
                {stage === 'billing' && (
                    <>
                        <span className="text-[10px] font-bold text-red-500 flex items-center gap-1">Due: {patient.pending}</span>
                        <button className="text-xs font-bold text-brand hover:underline">Settle</button>
                    </>
                )}
                {stage === 'completed' && (
                    <>
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><LogOut size={10} /> {patient.time}</span>
                        <button className="text-xs font-bold text-brand hover:underline flex items-center gap-1"><Printer size={12} /> Summary</button>
                    </>
                )}
            </div>
        </div>
    </motion.div>
);

const DischargeManager = () => {
    return (
        <div className="space-y-6 animate-fade-in h-[calc(100vh-100px)] flex flex-col">

            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
                        <LogOut size={32} className="text-brand" />
                        Discharge Manager
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
                        Track and manage patient exit workflows
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand" size={18} />
                        <input
                            type="text"
                            placeholder="Find patient..."
                            className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl w-64 outline-none focus:ring-2 focus:ring-brand-subtle transition-all"
                        />
                    </div>
                    <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-brand hover:border-brand-light transition-all">
                        <Filter size={20} />
                    </button>
                    <button className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                        <FileText size={18} /> Daily Report
                    </button>
                </div>
            </header>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
                <div className="flex gap-6 h-full min-w-[1200px]">

                    {/* Column 1: Planned */}
                    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-4">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h3 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-slate-400"></span> Planned
                            </h3>
                            <span className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded-md text-xs font-bold text-slate-500 border border-slate-100 dark:border-slate-700">2</span>
                        </div>
                        <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar flex-1">
                            {initialPatients.planned.map(p => <PatientCard key={p.id} patient={p} stage="planned" />)}
                        </div>
                    </div>

                    <ArrowRight className="self-center text-slate-300 dark:text-slate-700 shrink-0" size={24} />

                    {/* Column 2: Clinical Clearance */}
                    <div className="flex-1 flex flex-col bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 p-4">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h3 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Medical Check
                            </h3>
                            <span className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded-md text-xs font-bold text-blue-600 border border-blue-100 dark:border-blue-900/30">1</span>
                        </div>
                        <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar flex-1">
                            {initialPatients.clinical.map(p => <PatientCard key={p.id} patient={p} stage="clinical" />)}
                        </div>
                    </div>

                    <ArrowRight className="self-center text-slate-300 dark:text-slate-700 shrink-0" size={24} />

                    {/* Column 3: Billing & Admin */}
                    <div className="flex-1 flex flex-col bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30 p-4">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h3 className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span> User Billing
                            </h3>
                            <span className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded-md text-xs font-bold text-amber-600 border border-amber-100 dark:border-amber-900/30">1</span>
                        </div>
                        <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar flex-1">
                            {initialPatients.billing.map(p => <PatientCard key={p.id} patient={p} stage="billing" />)}
                        </div>
                    </div>

                    <ArrowRight className="self-center text-slate-300 dark:text-slate-700 shrink-0" size={24} />

                    {/* Column 4: Discharged */}
                    <div className="flex-1 flex flex-col bg-green-50/50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/30 p-4">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h3 className="font-bold text-green-800 dark:text-green-300 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span> Discharged
                            </h3>
                            <span className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded-md text-xs font-bold text-green-600 border border-green-100 dark:border-green-900/30">1</span>
                        </div>
                        <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar flex-1">
                            {initialPatients.completed.map(p => <PatientCard key={p.id} patient={p} stage="completed" />)}
                        </div>
                        <button className="mt-auto w-full py-3 border border-dashed border-green-300 dark:border-green-800 rounded-xl text-green-600 dark:text-green-400 text-xs font-bold hover:bg-green-600 hover:text-white transition-all">
                            View Archive
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DischargeManager;
