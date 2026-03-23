import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, AlertTriangle, Info, CheckCircle, Pill, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

const MedicineModal = ({ isOpen, onClose }) => {
    const [medication, setMedication] = useState({
        name: '',
        dose: '',
        frequency: 'Daily',
        indication: ''
    });

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] overflow-hidden"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                                <Pill size={18} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">Prescribe Medication</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Drug Safety Bar */}
                    <div className="px-6 py-3 bg-yellow-50 border-b border-yellow-100 flex items-start gap-3">
                        <AlertTriangle size={18} className="text-yellow-600 mt-0.5 shrink-0" />
                        <div>
                            <h4 className="text-xs font-bold text-yellow-800 uppercase tracking-wide mb-1">Drug Safety Checks</h4>
                            <div className="flex flex-col gap-1 text-xs text-yellow-700">
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={12} className="text-green-600" />
                                    <span>Allergy Alert: No known allergies to this class.</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={12} className="text-green-600" />
                                    <span>Drug Interaction: None detected with current meds.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-5">

                        {/* Drug Name Search */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Medication Name</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search brand or generic name..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Dose */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dose</label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="e.g. 500"
                                        className="w-2/3 px-3 py-2.5 bg-white border border-slate-200 rounded-l-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 border-r-0"
                                    />
                                    <select className="w-1/3 px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-r-lg text-xs font-bold text-slate-600 outline-none">
                                        <option>mg</option>
                                        <option>ml</option>
                                        <option>tab</option>
                                    </select>
                                </div>
                            </div>

                            {/* Frequency */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Frequency</label>
                                <select className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 outline-none focus:border-primary">
                                    <option>Once Daily (OD)</option>
                                    <option>Twice Daily (BD)</option>
                                    <option>Thrice Daily (TDS)</option>
                                    <option>Four times (QID)</option>
                                    <option>SOS (As needed)</option>
                                </select>
                            </div>
                        </div>

                        {/* Indication (New Field) */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                Indication (Diagnosis) <Info size={12} className="text-primary" />
                            </label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                                    <option value="">Select Associated Diagnosis...</option>
                                    <option value="HTN">Hypertension (I10)</option>
                                    <option value="DM2">Diabetes Mellitus Type 2 (E11.9)</option>
                                    <option value="Pain">Acute Pain (R52)</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <input type="checkbox" id="urgent" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                            <label htmlFor="urgent" className="text-sm font-medium text-slate-700">Mark as STAT (Urgent)</label>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                        <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                        <button className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
                            <CheckCircle size={18} /> Prescribe
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default MedicineModal;
