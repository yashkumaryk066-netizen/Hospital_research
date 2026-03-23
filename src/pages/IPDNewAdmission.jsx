import React, { useState } from 'react';
import {
    User,
    Calendar,
    Phone,
    MapPin,
    CreditCard,
    Stethoscope,
    Activity,
    CheckCircle,
    Save,
    Printer,
    Search,
    ChevronDown,
    Plus,
    BedDouble,
    FileText,
    AlertCircle,
    Shield,
    Siren,
    Zap,
    Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const IPDNewAdmission = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [admissionMode, setAdmissionMode] = useState(null); // 'existing', 'new', 'emergency'
    const [searchQuery, setSearchQuery] = useState('');

    // Step Titles
    const steps = [
        { id: 1, title: "Patient Entry" },
        { id: 2, title: "Clinical & Admin" },
        { id: 3, title: "Bed Allocation" },
        { id: 4, title: "Confirm" }
    ];

    // Mock recent OPD patients for "Quick Pick"
    const recentOPD = [
        { id: 1, name: "Maria Garcia", age: 29, reason: "Severe Abdominal Pain", doctor: "Dr. House" },
        { id: 2, name: "Liam Nesson", age: 55, reason: "Cardiac Monitoring", doctor: "Dr. Strange" },
    ];

    return (
        <div className="space-y-6 animate-fade-in pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                        <Plus size={26} className="text-indigo-600" />
                        New Admission Entry
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
                        Select admission type to proceed
                    </p>
                </div>
                {/* Global Bed Status Indicator */}
                <div className="flex gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">General</span>
                        <span className="text-xs font-black text-green-600">12 Avail</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Private</span>
                        <span className="text-xs font-black text-orange-600">2 Avail</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">ICU</span>
                        <span className="text-xs font-black text-red-600 animate-pulse">1 Avail</span>
                    </div>
                </div>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between relative px-4 md:px-12 mb-8">
                <div className="absolute left-0 top-1/2 w-full h-1 bg-slate-100 dark:bg-slate-800 -z-10 rounded-full"></div>
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${activeStep >= step.id ? 'opacity-100' : 'opacity-50'}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-4 transition-all ${activeStep >= step.id
                            ? 'bg-indigo-600 border-indigo-100 text-white shadow-lg shadow-indigo-500/30'
                            : 'bg-white border-slate-200 text-slate-400'
                            }`}>
                            {activeStep > step.id ? <CheckCircle size={16} /> : step.id}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${activeStep >= step.id ? 'text-indigo-600' : 'text-slate-400'}`}>
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[500px]">

                {/* Step 1: Admission Gateway */}
                {activeStep === 1 && (
                    <div className="p-8">
                        {!admissionMode ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                                {/* Option 1: Existing Patient */}
                                <div
                                    onClick={() => setAdmissionMode('existing')}
                                    className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/50 cursor-pointer transition-all flex flex-col items-center text-center gap-4 py-12"
                                >
                                    <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Search size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800 dark:text-white">Existing Patient</h3>
                                        <p className="text-sm text-slate-500 mt-2">Search via UHID, Mobile, or Name. Use for follow-ups or planned admissions.</p>
                                    </div>
                                </div>

                                {/* Option 2: New Registration */}
                                <div
                                    onClick={() => { setAdmissionMode('new'); }}
                                    className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer transition-all flex flex-col items-center text-center gap-4 py-12"
                                >
                                    <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <UserPlusIcon size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800 dark:text-white">New Registration</h3>
                                        <p className="text-sm text-slate-500 mt-2">Create a new patient profile. Generates a new UHID automatically.</p>
                                    </div>
                                </div>

                                {/* Option 3: Emergency */}
                                <div
                                    onClick={() => { setAdmissionMode('emergency'); setActiveStep(2); }}
                                    className="group p-6 rounded-2xl border-2 border-red-100 hover:border-red-500 hover:bg-red-50/50 cursor-pointer transition-all flex flex-col items-center text-center gap-4 py-12 shadow-lg shadow-red-100"
                                >
                                    <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center animate-pulse group-hover:scale-110 transition-transform">
                                        <Siren size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-red-700 dark:text-white">Emergency (Trauma)</h3>
                                        <p className="text-sm text-red-600/80 mt-2 font-medium">Skip details. Admit immediately. Minimum info required.</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-xl mx-auto space-y-6 animate-fade-in-up">
                                <button onClick={() => setAdmissionMode(null)} className="text-xs font-bold text-slate-400 hover:text-slate-600 mb-2 flex items-center gap-1">
                                    ← Back to Selection
                                </button>

                                {admissionMode === 'existing' && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-black text-slate-800">Search Patient Database</h2>
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                autoFocus
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                                placeholder="Enter UHID, Mobile, or Name..."
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>

                                        {/* Suggested / Recent */}
                                        {searchQuery.length < 2 && (
                                            <div className="space-y-2">
                                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent OPD Visits</div>
                                                {recentOPD.map(p => (
                                                    <div key={p.id} onClick={() => setActiveStep(2)} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 cursor-pointer transition-all group">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">{p.name.charAt(0)}</div>
                                                            <div>
                                                                <div className="text-sm font-bold text-slate-700 group-hover:text-indigo-700">{p.name}</div>
                                                                <div className="text-xs text-slate-500">Ref: {p.doctor}</div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-slate-100 px-2 py-1 rounded text-[10px] font-bold text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors">Select</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {admissionMode === 'new' && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-black text-slate-800">New Patient Registration</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-xs font-bold text-slate-500 mb-1">First Name</label>
                                                <input type="text" className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-indigo-500" />
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Last Name</label>
                                                <input type="text" className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-indigo-500" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Date of Birth / Age</label>
                                                <input type="text" className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-indigo-500" placeholder="e.g. 35" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Gender</label>
                                                <select className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500">
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Mobile Number</label>
                                                <input type="tel" className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-indigo-500" />
                                            </div>
                                        </div>
                                        <button onClick={() => setActiveStep(2)} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl mt-4 hover:bg-indigo-700 transition-colors">
                                            Create Profile & Proceed
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Step 2: Clinical Details (Admission Reason) */}
                {activeStep === 2 && (
                    <div className="p-8 animate-fade-in">
                        <div className="max-w-4xl mx-auto space-y-6">
                            {admissionMode === 'emergency' && (
                                <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 mb-6">
                                    <Siren className="text-red-600 animate-pulse" />
                                    <div>
                                        <h3 className="font-bold text-red-800">Emergency Protocol Active</h3>
                                        <p className="text-sm text-red-700">Minimum registration Mode. collect vitals immediately after bed allocation.</p>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-700 border-b pb-2">Clinical Details</h3>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Department</label>
                                        <select className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500">
                                            <option>Emergency Medicine</option>
                                            <option>Cardiology</option>
                                            <option>Orthopedics</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Admitting Doctor</label>
                                        <select className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500">
                                            <option>Dr. Auto Assign (Duty Doctor)</option>
                                            <option>Dr. Strange</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Provisional Diagnosis</label>
                                        <textarea className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 resize-none" rows="3"></textarea>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-700 border-b pb-2">Admin & Payment</h3>
                                    <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                                        <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200">
                                            <span className="text-sm font-bold text-slate-600">Insurance</span>
                                            <span className="text-xs bg-slate-200 px-2 py-1 rounded font-bold text-slate-500">Not Linked</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200">
                                            <span className="text-sm font-bold text-slate-600">Initial Deposit</span>
                                            <span className="text-sm font-black text-indigo-600">$500.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-8">
                                <button onClick={() => setActiveStep(3)} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">
                                    Proceed to Bed Allocation
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Bed Allocation (Simplified for Demo) */}
                {activeStep === 3 && (
                    <div className="p-8 animate-fade-in">
                        <div className="text-center py-12">
                            <BedDouble size={48} className="mx-auto text-indigo-200 mb-4" />
                            <h2 className="text-2xl font-black text-slate-800">Select Bed</h2>
                            <p className="text-slate-500 mb-8">Visual Map Loaded for Floor 2</p>
                            <button onClick={() => setActiveStep(4)} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl">
                                Confirm Bed 201
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Confirm */}
                {activeStep === 4 && (
                    <div className="p-8 animate-fade-in text-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800">Admission Compete</h2>
                        <p className="text-slate-500 mt-2">UHID: <strong>2024-9092</strong> • Bed: <strong>201</strong></p>
                    </div>
                )}

            </div>
        </div>
    );
};

// Icon Helper
const UserPlusIcon = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>
);

export default IPDNewAdmission;
