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
    Plus
} from 'lucide-react';
import { searchPatients } from '../api/patients';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const OPDNewAppointment = () => {
    const [patientType, setPatientType] = useState('New'); // New or Returning
    const [searchQuery, setSearchQuery] = useState('');
    const [otpStep, setOtpStep] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Deep Research: Real-time discovery logic
    React.useEffect(() => {
        const fetchResults = async () => {
             if (searchQuery.length > 2) {
                 setIsSearching(true);
                 try {
                     const data = await searchPatients(searchQuery);
                     setSearchResults(data);
                 } catch (e) {
                     console.error("Search Fail", e);
                 } finally {
                     setIsSearching(false);
                 }
             } else {
                 setSearchResults([]);
             }
        };
        const timer = setTimeout(fetchResults, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Mock Doctors Data
    const doctors = [
        { id: 1, name: 'Dr. Sarah Wilson', dept: 'Cardiology', cabin: '204', fee: '$50' },
        { id: 2, name: 'Dr. James House', dept: 'Neurology', cabin: '301', fee: '$60' },
        { id: 3, name: 'Dr. Emily Stones', dept: 'General Medicine', cabin: '102', fee: '$40' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSearching(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1500));
        setIsSearching(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 animate-fade-in text-center">
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30 mb-8"
                >
                    <CheckCircle size={48} />
                </motion.div>
                <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-4 tracking-tight">Appointment Confirmed!</h2>
                <p className="text-lg text-slate-500 max-w-md mx-auto mb-10 font-bold">The appointment has been successfully booked in the HIS system. Patient will receive an SMS confirmation shortly.</p>
                <div className="flex gap-4">
                    <button onClick={() => window.print()} className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-slate-800 transition-all">
                        Print Receipt
                    </button>
                    <button onClick={() => window.location.reload()} className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-blue-700 transition-all">
                        New Registration <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in pb-12">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                        <Plus size={24} className="text-blue-600" />
                        Patient Registration & OPD Booking
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
                        Register visit and generate token (Target: <span className="font-black text-blue-600">30s TAT</span>)
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button onClick={() => setPatientType('New')} className={clsx("px-4 py-1.5 rounded-lg text-xs font-black transition-all", patientType === 'New' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400")}>NEW PATIENT</button>
                        <button onClick={() => setPatientType('Returning')} className={clsx("px-4 py-1.5 rounded-lg text-xs font-black transition-all", patientType === 'Returning' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400")}>RETURNING</button>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg text-sm font-bold border border-blue-100 dark:border-blue-900/30">
                        Token Queue: <span className="text-lg font-black">#42</span>
                    </div>
                </div>
            </div>

            {/* Smart Search for Returning Patients */}
            {patientType === 'Returning' && (
                <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20 animate-scale-up">
                    <h3 className="text-sm font-black uppercase tracking-widest mb-4">Smart Patient Discovery</h3>
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={20} />
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter UHID, Mobile, or Aadhaar Number..." 
                            className="w-full h-14 pl-12 pr-4 bg-white/10 border border-white/20 rounded-2xl outline-none focus:bg-white/20 transition-all font-black placeholder:text-blue-200"
                        />
                        {(searchResults.length > 0 || isSearching) && (
                            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl text-slate-800 p-2 z-50 overflow-hidden min-h-[50px]">
                                {isSearching ? (
                                    <div className="p-8 text-center text-slate-400 font-bold animate-pulse">Scanning Master Index...</div>
                                ) : (
                                    searchResults.map((p) => (
                                        <div key={p.id} className="p-4 hover:bg-slate-50 rounded-xl cursor-pointer flex items-center justify-between border border-transparent hover:border-slate-100 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-black">
                                                    {p.full_name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-sm">{p.full_name} ({p.uhid})</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                        {p.mobile_number} • Aadhar: {p.aadhaar_last_4 || '----'}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded group-hover:bg-blue-600 group-hover:text-white transition-all">SELECT PATIENT</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Main Form Content - Two Column Layout */}
            <div className="grid grid-cols-12 gap-6">

                {/* Left Column: Patient Registration (8 cols) */}
                <div className="col-span-12 lg:col-span-8 space-y-6">

                    {/* Step 1: Patient Details */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-blue-500/20">1</div>
                                Demographic Data Capture
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className={clsx("w-2 h-2 rounded-full", isVerified ? "bg-emerald-500" : "bg-slate-300 animate-pulse")} />
                                <span className={clsx("text-[10px] font-black uppercase tracking-widest", isVerified ? "text-emerald-500" : "text-slate-400")}>{isVerified ? 'Mobile Verified' : 'OTP Pending'}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* UHID Display */}
                            <div className="md:col-span-1">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">Patient Master UHID</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={patientType === 'Returning' ? 'UHID-2024-9981' : 'AUTO-GENERATING...'}
                                    className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-black text-blue-600 dark:text-blue-400"
                                />
                            </div>

                            {/* Payer Type */}
                            <div className="md:col-span-1">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">Visit Type & Tariff <span className="text-rose-500 text-lg">*</span></label>
                                <div className="relative">
                                    <select className="w-full h-12 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none transition-all text-slate-700 dark:text-slate-300 font-black">
                                        <option value="Self-Pay">Self-Pay (Standard)</option>
                                        <option value="Insurance">Insurance / TPA (Panel)</option>
                                        <option value="Corporate">Corporate (Fixed Tariff)</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                </div>
                            </div>

                            {/* Name */}
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">Legal Full Name <span className="text-rose-500 text-lg">*</span> (as per ID)</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 shadow-xl" size={20} />
                                    <input type="text" className="w-full h-12 pl-12 pr-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 outline-none transition-all font-bold placeholder:text-slate-300" placeholder="e.g. Michael John Sterling" />
                                </div>
                            </div>

                            {/* Mobile & OTP */}
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">Mobile Verification <span className="text-rose-500 text-lg">*</span></label>
                                <div className="relative flex gap-2">
                                    <div className="relative flex-1">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input type="tel" className="w-full h-12 pl-12 pr-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none transition-all font-black tracking-widest" placeholder="+91 00000 00000" />
                                    </div>
                                    <button 
                                        onClick={() => setOtpStep(true)}
                                        className="px-4 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                                    >
                                        SEND OTP
                                    </button>
                                </div>
                                {otpStep && (
                                    <div className="mt-3 flex gap-2 animate-bounce-short">
                                        <input type="text" maxLength="4" className="w-24 h-10 text-center border-2 border-blue-200 rounded-xl font-black text-lg outline-none focus:border-blue-600" placeholder="0000" />
                                        <button onClick={() => {setIsVerified(true); setOtpStep(false);}} className="px-4 h-10 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">VERIFY</button>
                                    </div>
                                )}
                            </div>

                            {/* Age & Gender */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">DOB / Age <span className="text-rose-500 text-lg">*</span></label>
                                    <input type="date" className="w-full h-12 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none transition-all font-black" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">Gender Ident. <span className="text-rose-500 text-lg">*</span></label>
                                    <div className="relative">
                                        <select className="w-full h-12 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none appearance-none transition-all text-slate-700 dark:text-slate-300 font-black">
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other / NR</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>

                            {/* Aadhaar (Last 4) */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Aadhaar (Last 4 Digits) <span className="text-amber-500 font-black">!</span></label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="text" maxLength="4" className="w-full h-11 pl-10 pr-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:border-blue-500 outline-none transition-colors font-mono tracking-widest text-lg" placeholder="XXXX" />
                                </div>
                            </div>

                            {/* Date of Visit */}
                            <div className="md:col-span-1">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Appointment Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="date" className="w-full h-11 pl-10 pr-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:border-blue-500 outline-none transition-colors font-semibold" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                            </div>

                            {/* Digital Consent */}
                            <div className="md:col-span-2 flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                                <input type="checkbox" id="consent" className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500" />
                                <label htmlFor="consent" className="text-xs font-bold text-blue-700 dark:text-blue-400 cursor-pointer">
                                    Patient has signed the Digital Consent Form (HIPAA NPP) and agreed to hospital terms.
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Doctor Selection */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black">2</span>
                            Consultation Details
                        </h3>

                        <div className="grid grid-cols-1 gap-4">
                            <label className="block text-xs font-bold text-slate-500 uppercase">Select Doctor <span className="text-red-500">*</span></label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {doctors.map((doc) => (
                                    <div key={doc.id} className="cursor-pointer group relative">
                                        <input type="radio" name="doctor" id={`doc-${doc.id}`} className="peer sr-only" />
                                        <label
                                            htmlFor={`doc-${doc.id}`}
                                            className="block p-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 rounded-xl transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300">
                                                    <Stethoscope size={20} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800 dark:text-white text-sm">{doc.name}</div>
                                                    <div className="text-xs text-slate-500 font-medium">{doc.dept}</div>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300 font-bold">Cabin {doc.cabin}</span>
                                                        <span className="text-xs font-black text-blue-600 dark:text-blue-400">{doc.fee}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 text-blue-500 transition-opacity">
                                                <CheckCircle size={18} fill="currentColor" className="text-white" />
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Vitals & Summary (4 cols) */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    {/* Vitals Quick Entry */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <Activity size={18} className="text-emerald-500" /> Vitals Check
                            </h3>
                            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded">Optional</span>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">BP (mmHg)</label>
                                    <input type="text" placeholder="120/80" className="w-full mt-1 h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold focus:border-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Pulse (bpm)</label>
                                    <input type="number" placeholder="72" className="w-full mt-1 h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold focus:border-blue-500 outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Temp (°F)</label>
                                    <input type="text" placeholder="98.6" className="w-full mt-1 h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold focus:border-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">SpO2 (%)</label>
                                    <input type="number" placeholder="98" className="w-full mt-1 h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold focus:border-blue-500 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase">Chief Complaint</label>
                                <textarea rows="2" placeholder="e.g. Fever for 2 days, headache..." className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold focus:border-blue-500 outline-none resize-none"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Payment & Actions */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg shadow-blue-900/5 border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                            <CreditCard size={18} className="text-slate-400" /> Payment Summary
                        </h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Consultation Fee</span>
                                <span className="font-bold text-slate-800 dark:text-white">$50.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Registration</span>
                                <span className="font-bold text-slate-800 dark:text-white">$10.00</span>
                            </div>
                            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
                            <div className="flex justify-between text-base">
                                <span className="font-bold text-slate-700 dark:text-slate-200">Total Payable</span>
                                <span className="font-black text-blue-600 text-xl">$60.00</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleSubmit}
                            disabled={isSearching}
                            className={clsx(
                                "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                                isSearching && "animate-pulse"
                            )}
                        >
                            {isSearching ? 'PROCESSING...' : (
                                <><Save size={18} /> Book Appointment</>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OPDNewAppointment;
