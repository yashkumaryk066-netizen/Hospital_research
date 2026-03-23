import React, { useState } from 'react';
import { 
    X, 
    User, 
    Phone, 
    Mail, 
    Calendar, 
    Clock, 
    Stethoscope, 
    MapPin, 
    FileText, 
    Shield,
    CreditCard,
    CheckCircle2,
    ChevronDown,
    Map
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const OPDRegistrationModal = ({ isOpen, onClose }) => {
    const [appointmentType, setAppointmentType] = useState('Consultation');
    const [gender, setGender] = useState('Female');

    if (!isOpen) return null;

    const inputClasses = "w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 text-sm font-bold transition-all placeholder-slate-300";
    const labelClasses = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-4";
    const radioClasses = "flex items-center gap-2 px-6 py-3 border rounded-2xl cursor-pointer transition-all font-bold text-sm";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               onClick={onClose}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl p-8 scrollbar-hide"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-black text-slate-800 tracking-tight">New OPD Registration</h2>
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1 underline">Digital Health Record ID Active</p>
                    </div>
                    <button onClick={onClose} className="p-3 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
                        <X size={24} />
                    </button>
                    <div className="absolute top-10 right-28 hidden xl:flex items-center gap-1.5 p-2 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm">
                       <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">R</div>
                       <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center text-[10px] font-black">M</div>
                    </div>
                </div>

                {/* Form Sections */}
                <form className="space-y-10 group" onSubmit={(e) => e.preventDefault()}>
                    
                    {/* Appointment Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['OPD Consultation', 'Follow-up', 'Procedure'].map(t => (
                            <div 
                                key={t}
                                onClick={() => setAppointmentType(t)}
                                className={clsx(
                                    radioClasses,
                                    appointmentType === t ? 'bg-blue-600 text-white shadow-lg border-blue-600' : 'bg-white text-slate-500 border-slate-100 hover:border-blue-200'
                                )}
                            >
                                <div className={clsx("w-4 h-4 rounded-full border-4 flex items-center justify-center", appointmentType === t ? 'border-sky-300' : 'border-slate-100')} />
                                {t}
                            </div>
                        ))}
                    </div>

                    {/* Patient Info Group */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                        <div className="space-y-6">
                            <div>
                                <label className={labelClasses}>Patient Name *</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600" />
                                    <input type="text" placeholder="Enter full name" className={inputClasses} required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClasses}>Age *</label>
                                    <input type="number" placeholder="Years" className={inputClasses} required style={{ paddingLeft: '1.25rem' }} />
                                </div>
                                <div className="flex flex-col">
                                    <label className={labelClasses}>Gender *</label>
                                    <div className="flex gap-2">
                                        {['Female', 'Male', 'Other'].map(g => (
                                           <div 
                                              key={g} 
                                              onClick={() => setGender(g)}
                                              className={clsx("flex-1 px-4 py-3 rounded-2xl border text-[10px] font-black uppercase text-center cursor-pointer transition-all", 
                                              gender === g ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-400 opacity-60')}
                                           >
                                              {g[0]}
                                           </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className={labelClasses}>Phone Number *</label>
                                <div className="flex gap-2">
                                    <div className="w-20 relative">
                                       <input type="text" defaultValue="+91" className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-xs font-black outline-none" />
                                       <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                    <div className="relative flex-1">
                                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="text" placeholder="Enter phone number" className={inputClasses} required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Patient Column */}
                        <div className="space-y-6">
                            <div>
                                <label className={labelClasses}>Consulting Doctor *</label>
                                <div className="relative">
                                    <Stethoscope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <select className={clsx(inputClasses, "appearance-none bg-white")}>
                                        <option>Select Specialist...</option>
                                        <option>Dr. Ram Sharma</option>
                                        <option>Dr. Sarah Wilson</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClasses}>Consulting Department *</label>
                                <div className="relative">
                                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <select className={clsx(inputClasses, "appearance-none bg-white")}>
                                        <option>Select Department...</option>
                                        <option>General Cardiology</option>
                                        <option>Dermatology</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClasses}>Visit Date *</label>
                                    <div className="relative">
                                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="date" className={inputClasses} style={{ paddingLeft: '3.5rem' }} />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClasses}>Visit Time *</label>
                                    <div className="relative">
                                        <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="time" className={inputClasses} style={{ paddingLeft: '3.5rem' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Symptoms/Address Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                           <label className={labelClasses}>Patient Address</label>
                           <textarea placeholder="Enter complete address..." className="w-full h-32 px-4 py-4 bg-slate-50/50 border border-slate-100 rounded-[1.5rem] outline-none text-sm font-bold focus:bg-white focus:border-blue-200 transition-all" />
                        </div>
                        <div>
                           <label className={labelClasses}>Symptoms / Reason for Visit</label>
                           <textarea placeholder="Describe symptoms or reason for appointment..." className="w-full h-32 px-4 py-4 bg-slate-50/50 border border-slate-100 rounded-[1.5rem] outline-none text-sm font-bold focus:bg-white focus:border-blue-200 transition-all" />
                        </div>
                    </div>

                    {/* Consultation Details */}
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
                        <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                           <CreditCard size={20} className="text-blue-400" /> 
                           Consultation Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Consultation Fee (₹)</label>
                                <input type="text" defaultValue="800" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-lg font-black outline-none focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Priority Level</label>
                                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-sm outline-none">
                                    <option>Normal</option>
                                    <option>Urgent</option>
                                    <option>High Priority</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Payment Mode</label>
                                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-sm outline-none">
                                    <option>UPI</option>
                                    <option>Cash</option>
                                    <option>Card</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Checkboxes from Figma */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          'Enable Prescription', 'Enable Receipt', 'Enable Radiology Report', 
                          'Enable Follow-up Slip', 'Enable Receipt', 'Print Receipt'
                        ].map((label, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <input type="checkbox" id={`cb-${idx}`} className="w-5 h-5 rounded-lg accent-blue-600 cursor-pointer" defaultChecked={idx === 0 || idx === 1 || idx === 3} />
                            <label htmlFor={`cb-${idx}`} className="text-[11px] font-bold text-slate-600 leading-none cursor-pointer">{label}</label>
                          </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-50">
                        <button type="button" onClick={onClose} className="w-full sm:w-auto px-8 py-4 text-slate-500 font-black uppercase text-xs tracking-widest hover:bg-slate-50 rounded-2xl transition-all border border-slate-100">Cancel</button>
                        <button className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:scale-105 transition-all">Book Appointment</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default OPDRegistrationModal;
