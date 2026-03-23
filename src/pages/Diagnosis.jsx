import React, { useState } from 'react';
import {
    Activity,
    FileText,
    Pill,
    TestTube,
    BedDouble,
    LogOut,
    Thermometer,
    Heart,
    Wind,
    Droplets,
    Plus,
    Save,
    Clock,
    User,
    AlertCircle,
    ChevronDown,
    Search,
    Printer,
    DollarSign,
    MoreVertical,
    Lock,
    Eye,
    CheckCircle,
    Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Patient Data (HIPAA Compliant Display)
const patient = {
    id: "IPD-2024-001",
    uhid: "UHID-89210",
    name: "Sarah Connor",
    age: 35,
    gender: "Female",
    ward: "General Ward",
    bed: "GW-104",
    admitted: "12 Feb 2024",
    doctor: "Dr. Silberman",
    diagnosis: "Acute Bronchitis",
    vitals: { bp: "120/80", hr: "72", temp: "98.6", spo2: "98", rr: "16" },
    allergies: ["Penicillin", "Sulfa Drugs"],
    status: "Stable"
};

const TabButton = ({ active, label, icon: Icon, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-t-lg transition-all border-b-2 relative top-[1px] ${active
            ? 'bg-white dark:bg-slate-900 text-brand border-brand z-10'
            : 'bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 hover:bg-slate-100'
            }`}
    >
        <Icon size={16} />
        {label}
    </button>
);

const ClinicalNote = ({ type, author, time, content, sensitive }) => (
    <div className="flex gap-4 p-5 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 hover:shadow-sm transition-all group">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm border-2 ${type === 'Doctor' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-green-50 text-green-600 border-green-100'
            }`}>
            {author.charAt(0)}
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <span className="font-bold text-slate-800 dark:text-white mr-2">{author}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-wider">{type}</span>
                </div>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium"><Clock size={12} /> {time}</span>
            </div>
            {sensitive ? (
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between group/blur cursor-pointer">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                        <Lock size={14} /> Only visible to Authorized Personnel
                    </div>
                    <button className="text-xs text-brand hover:underline flex items-center gap-1">
                        <Eye size={12} /> Reveal
                    </button>
                </div>
            ) : (
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{content}</p>
            )}
        </div>
    </div>
);

const PatientDiagnosis = () => {
    const [activeTab, setActiveTab] = useState('clinical'); // clinical, services, transfer, discharge
    const [noteContent, setNoteContent] = useState('');

    return (
        <div className="space-y-6 animate-fade-in pb-12 max-w-[1600px] mx-auto">

            {/* HIPAA Banner */}
            <div className="bg-slate-900 text-slate-300 px-4 py-2 text-[10px] uppercase font-bold tracking-widest flex items-center justify-between rounded-lg">
                <span className="flex items-center gap-2"><Lock size={12} /> HIPAA Compliance Mode: Active</span>
                <span>Session ID: {Math.random().toString(36).substr(2, 9)}</span>
            </div>

            {/* Patient Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col xl:flex-row gap-8 sticky top-[70px] z-20 transition-all">

                {/* Identity & Basic Info */}
                <div className="flex items-start gap-6 flex-1 min-w-[300px]">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-700 shadow-inner">
                            <User size={36} />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center text-white" title="Admitted">
                            <CheckCircle size={14} fill="white" className="text-green-500" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                                    {patient.name}
                                    <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-widest rounded border border-slate-200 dark:border-slate-700">
                                        {patient.uhid}
                                    </span>
                                </h1>
                                <div className="text-sm font-medium text-slate-500 mt-1 flex flex-wrap gap-x-6 gap-y-2">
                                    <span className="flex items-center gap-1.5"><User size={14} className="text-slate-400" /> {patient.gender}, {patient.age}Y</span>
                                    <span className="flex items-center gap-1.5"><BedDouble size={14} className="text-slate-400" /> {patient.ward} • {patient.bed}</span>
                                    <span className="flex items-center gap-1.5 text-brand"><Stethoscope size={14} /> {patient.doctor}</span>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        {/* Allergies Tag */}
                        <div className="mt-3 flex gap-2">
                            {patient.allergies.map(alg => (
                                <span key={alg} className="px-2 py-0.5 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase border border-red-100 dark:border-red-900/30 rounded flex items-center gap-1">
                                    <AlertCircle size={10} /> Allergy: {alg}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Vitals Dashboard Ribbon */}
                <div className="flex gap-1 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-xl border border-slate-100 dark:border-slate-800 overflow-x-auto">
                    {[
                        { label: 'HR', val: patient.vitals.hr, unit: 'bpm', icon: Heart, color: 'text-red-500' },
                        { label: 'BP', val: patient.vitals.bp, unit: 'mmHg', icon: Activity, color: 'text-blue-500' },
                        { label: 'Temp', val: patient.vitals.temp, unit: '°F', icon: Thermometer, color: 'text-orange-500' },
                        { label: 'SpO2', val: patient.vitals.spo2, unit: '%', icon: Wind, color: 'text-cyan-500' },
                        { label: 'RR', val: patient.vitals.rr, unit: '/min', icon: Droplets, color: 'text-indigo-500' },
                    ].map((stat, i) => (
                        <div key={i} className="min-w-[90px] px-3 py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/50 dark:border-slate-800 shadow-sm flex flex-col justify-center group hover:border-brand-light transition-colors">
                            <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-0.5">
                                <stat.icon size={10} className={stat.color} /> {stat.label}
                            </div>
                            <div className="flex items-baseline gap-0.5">
                                <span className="text-lg font-black text-slate-800 dark:text-white tracking-tight group-hover:text-brand transition-colors">{stat.val}</span>
                                <span className="text-[10px] font-bold text-slate-400">{stat.unit}</span>
                            </div>
                        </div>
                    ))}
                    <button className="px-3 flex flex-col items-center justify-center text-slate-400 hover:text-brand hover:bg-white rounded-lg transition-all">
                        <Plus size={20} />
                        <span className="text-[10px] font-bold uppercase mt-1">Add</span>
                    </button>
                </div>
            </div>

            {/* Workspace Area */}
            <div className="bg-slate-100 dark:bg-slate-950/50 rounded-2xl min-h-[600px] flex flex-col">

                {/* Navigation Tabs */}
                <div className="sticky top-[180px] z-10 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-6 pt-2 flex gap-1 overflow-x-auto no-scrollbar">
                    <TabButton active={activeTab === 'clinical'} label="Clinical Notes" icon={FileText} onClick={() => setActiveTab('clinical')} />
                    <TabButton active={activeTab === 'orders'} label="Orders (CPOE)" icon={Pill} onClick={() => setActiveTab('orders')} />
                    <TabButton active={activeTab === 'vitals'} label="Vitals Graph" icon={Activity} onClick={() => setActiveTab('vitals')} />
                    <TabButton active={activeTab === 'transfer'} label="Transfer" icon={BedDouble} onClick={() => setActiveTab('transfer')} />
                    <TabButton active={activeTab === 'discharge'} label="Discharge" icon={LogOut} onClick={() => setActiveTab('discharge')} />
                </div>

                {/* Dynamic Content */}
                <div className="p-6 flex-1">

                    {activeTab === 'clinical' && (
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                            {/* Editor Column */}
                            <div className="xl:col-span-2 space-y-6">
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 focus-within:ring-2 ring-brand-light transition-shadow space-y-6">
                                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">Clinical Progress Note (SOAP)</span>
                                        </div>
                                        <span className="text-xs font-mono text-slate-400">{new Date().toLocaleString()}</span>
                                    </div>

                                    {/* SOAP Structure */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">S</span> Subjective (Symptoms/History)</label>
                                            <textarea rows="3" className="w-full p-3 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-brand transition-all resize-none" placeholder="e.g. Patient reports improved breathing, less cough..."></textarea>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">O</span> Objective (Vitals/Examination)</label>
                                            <textarea rows="3" className="w-full p-3 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-brand transition-all resize-none" placeholder="e.g. Lungs clear on auscultation, no wheezing..."></textarea>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">A</span> Assessment (Diagnosis/Impression)</label>
                                            <div className="relative">
                                                <Search className="absolute left-3 top-3 text-slate-400" size={14} />
                                                <textarea rows="1" className="w-full pl-9 pr-3 py-3 text-sm font-bold text-brand dark:text-brand-light bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg outline-none focus:ring-2 focus:ring-brand-subtle transition-all resize-none" placeholder="ICD-10 Search..."></textarea>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">P</span> Plan (Treatments/Goals)</label>
                                            <textarea rows="3" className="w-full p-3 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-brand transition-all resize-none" placeholder="e.g. Continue meds, follow up in 2 days..."></textarea>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded transition-all"><Plus size={12} /> Add Attachment</button>
                                        </div>
                                        <button className="px-8 py-2.5 bg-brand text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-brand-dark shadow-xl shadow-brand/20 transition-all flex items-center gap-2 active:scale-95">
                                            <CheckCircle size={16} /> Finalize Session
                                        </button>
                                    </div>
                                </div>

                                {/* Timeline Stream */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-2">
                                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Today's Timeline</h3>
                                        <button className="text-xs font-bold text-brand hover:underline">Filter History</button>
                                    </div>
                                    <ClinicalNote type="Doctor" author="Dr. Silberman" time="09:30 AM" content="Patient condition stable. Fever subsided. Advised to continue antibiotics for 2 more days. Chest X-ray clear. Plan for discharge in 48h if vitals remain stable." />
                                    <ClinicalNote type="Nurse" author="Sarah Nurse" time="08:00 AM" content="Morning vitals checked. BP 120/80. Patient complained of mild headache. Paracetamol administered as per SOS." />
                                    <ClinicalNote sensitive type="Psychology" author="Dr. Venkman" time="Yesterday 04:00 PM" content="Patient history of anxiety noted." />
                                </div>
                            </div>

                            {/* Sidebar: Clinical Summary */}
                            <div className="space-y-6">
                                {/* Diagnosis Card */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                        <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm flex items-center gap-2">
                                            <Activity size={16} className="text-brand" /> Active Problems
                                        </h3>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        <div className="flex justify-between items-start pb-3 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
                                            <div>
                                                <div className="font-bold text-slate-800 dark:text-white text-sm">Acute Bronchitis</div>
                                                <div className="text-xs text-slate-400 mt-1">ICD-10: J20.9 • Onset: 3 days ago</div>
                                            </div>
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded">Primary</span>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="font-bold text-slate-800 dark:text-white text-sm">Hypertension</div>
                                                <div className="text-xs text-slate-400 mt-1">ICD-10: I10 • Chronic</div>
                                            </div>
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded">History</span>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 text-center">
                                        <button className="text-xs font-bold text-brand hover:underline">+ Add Diagnosis</button>
                                    </div>
                                </div>

                                {/* Active Orders Widget */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex justify-between">
                                        <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm flex items-center gap-2">
                                            <Pill size={16} className="text-purple-500" /> Active Meds
                                        </h3>
                                        <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-1.5 rounded">2 Active</span>
                                    </div>
                                    <div className="p-2">
                                        <div className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer group">
                                            <div className="w-8 h-8 rounded bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">Rx</div>
                                            <div className="flex-1">
                                                <div className="font-bold text-slate-800 dark:text-white text-sm group-hover:text-purple-600">Amoxicillin 500mg</div>
                                                <div className="text-xs text-slate-500">PO • TDS • 5 Days</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer group">
                                            <div className="w-8 h-8 rounded bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">Rx</div>
                                            <div className="flex-1">
                                                <div className="font-bold text-slate-800 dark:text-white text-sm group-hover:text-purple-600">Paracetamol 500mg</div>
                                                <div className="text-xs text-slate-500">PO • SOS • Pain/Fever</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* --- CPOE / Orders Module --- */}
                    {activeTab === 'orders' && (
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fade-in">
                            {/* Order Catalog */}
                            <div className="xl:col-span-2 space-y-6">
                                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                            <Pill className="text-brand" size={20} /> Order Entry (CPOE)
                                        </h3>
                                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                            {['Pharmacy', 'Lab', 'Radiology', 'Nursing'].map(cat => (
                                                <button key={cat} className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">{cat}</button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Search */}
                                    <div className="relative mb-6">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Search medication, test, or service..."
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-subtle transition-all"
                                        />
                                    </div>

                                    {/* Results Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { name: 'Paracetamol 500mg (IV)', type: 'Meds', stock: 'High' },
                                            { name: 'CBC (Complete Blood Count)', type: 'Lab', stock: 'N/A' },
                                            { name: 'X-Ray Chest PA View', type: 'Rad', stock: 'Avail' },
                                            { name: 'Pantoprazole 40mg', type: 'Meds', stock: 'Med' },
                                            { name: 'Nebulization (Duolin)', type: 'Nursing', stock: 'High' },
                                            { name: 'MRI Brain Contrast', type: 'Rad', stock: 'Sched' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between items-center p-4 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-brand-subtle hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group cursor-pointer">
                                                <div>
                                                    <div className="font-bold text-slate-800 dark:text-white text-sm">{item.name}</div>
                                                    <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{item.type} • Stock: {item.stock}</div>
                                                </div>
                                                <button className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:bg-brand group-hover:text-white flex items-center justify-center transition-all">
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Order Basket */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-[600px]">
                                <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                    <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                        <CheckCircle size={18} className="text-green-500" /> Current Orders
                                    </h3>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    {/* Mock Cart Items */}
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <span className="font-bold text-sm text-slate-800 dark:text-white">IV Fluids (NS 500ml)</span>
                                            <button className="text-slate-400 hover:text-red-500"><Lock size={12} /></button>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <select className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-1 py-0.5 outline-none">
                                                <option>BD</option>
                                                <option>TDS</option>
                                            </select>
                                            <input type="text" placeholder="Duration" className="w-16 text-xs bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-1 py-0.5 outline-none" defaultValue="2 days" />
                                        </div>
                                    </div>
                                    <div className="p-3 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <span className="font-bold text-sm text-slate-800 dark:text-white">Serum Electrolytes</span>
                                        </div>
                                        <div className="mt-2 text-xs font-bold text-purple-600 uppercase">Stat (Urgent)</div>
                                    </div>
                                </div>
                                <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                                    <div className="flex justify-between text-sm font-bold text-slate-500">
                                        <span>Total Items</span>
                                        <span>2</span>
                                    </div>
                                    <button className="w-full py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2">
                                        Sign & Submit Orders
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- Vitals Graph Module --- */}
                    {activeTab === 'vitals' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                        <Activity size={20} className="text-brand" /> Vitals Trends (Last 24h)
                                    </h3>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300">Heart Rate</button>
                                        <button className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-400">BP</button>
                                        <button className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-400">Temp</button>
                                    </div>
                                </div>
                                <div className="h-64 flex items-end justify-between gap-2 px-4 border-b border-slat-200 dark:border-slate-800 pb-4">
                                    {[65, 68, 72, 70, 74, 76, 72, 68, 65, 64, 66, 70, 72, 75, 78, 80, 76, 74, 72, 70, 68, 66, 65, 64].map((h, i) => (
                                        <div key={i} className="w-full bg-brand/20 dark:bg-brand/10 rounded-t-sm relative group">
                                            <div
                                                className="absolute bottom-0 w-full bg-brand rounded-t-sm transition-all group-hover:bg-brand-dark"
                                                style={{ height: `${h}%` }}
                                            ></div>
                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded pointer-events-none transition-opacity">
                                                {h} BPM
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between text-xs text-slate-400 font-medium mt-2">
                                    <span>00:00</span>
                                    <span>06:00</span>
                                    <span>12:00</span>
                                    <span>18:00</span>
                                    <span>23:59</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- Transfer Module --- */}
                    {activeTab === 'transfer' && (
                        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pt-8">
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-center">
                                <div className="w-20 h-20 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <BedDouble size={40} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 dark:text-white">Initiate Patient Transfer</h2>
                                <p className="text-slate-500 dark:text-slate-400 mt-2">Current Location: <strong>{patient.ward} - {patient.bed}</strong></p>

                                <div className="mt-8 text-left space-y-6">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Destination Ward</label>
                                        <select className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none font-bold text-slate-700 dark:text-white focus:ring-2 focus:ring-brand">
                                            <option>Select Destination...</option>
                                            <option>ICU (Intensive Care Unit)</option>
                                            <option>Private Ward - A Block</option>
                                            <option>Trauma Center</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Clinical Indication</label>
                                        <textarea
                                            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none font-medium text-slate-700 resize-none h-32 focus:ring-2 focus:ring-brand"
                                            placeholder="Reason for transfer (e.g. Patient condition deteriorated, requiring ventilator support...)"
                                        ></textarea>
                                    </div>
                                    <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2">
                                        Request Bed Availability
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- Discharge Module --- */}
                    {activeTab === 'discharge' && (
                        <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
                            <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 flex gap-4">
                                <AlertCircle className="text-red-500 shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-red-800 dark:text-red-400">Discharge Protocol Initiated</h3>
                                    <p className="text-sm text-red-600 dark:text-red-500 mt-1 opacity-80">Ensure all clinical and financial clearances are met before generating the Gate Pass.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                        <Stethoscope size={18} className="text-blue-500" /> Clinical Clearance
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white"><CheckCircle size={12} /></div>
                                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Final Vitals Recorded</span>
                                        </li>
                                        <li className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white"><CheckCircle size={12} /></div>
                                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Medication Reconciliation</span>
                                        </li>
                                        <li className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center"></div>
                                            <span className="text-sm font-bold text-slate-400">Exit Note Signed (Dr. Silberman)</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                        <DollarSign size={18} className="text-green-500" /> Financial Clearance
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                            <span className="text-sm text-slate-500">Total Bill</span>
                                            <span className="font-black text-slate-800 dark:text-white">$4,250.00</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                            <span className="text-sm text-slate-500">Insurance Coverage</span>
                                            <span className="font-black text-green-600">-$3,800.00</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
                                            <span className="text-sm font-bold text-red-600">Pending Patient Pay</span>
                                            <span className="font-black text-red-700">$450.00</span>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-sm transition-all hover:scale-[1.02]">
                                        Notify Billing Desk
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientDiagnosis;
