import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, FileText, CheckCircle, Clock, Stethoscope, Search } from 'lucide-react';
import { clsx } from 'clsx';

const DoctorVisitModal = ({ isOpen, onClose }) => {
    const [category, setCategory] = useState('Follow-up');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-[520px] overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                                <Stethoscope size={18} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">Add Visit Note</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Scrollable Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">

                        {/* Visit Category */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Visit Category</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Initial', 'Follow-up', 'Emergency'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={clsx(
                                            "py-2 text-xs font-bold border rounded-lg transition-all",
                                            category === cat
                                                ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm"
                                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SOAP Divider */}
                        <div className="relative flex items-center gap-2 pb-2 border-b border-slate-100">
                            <span className="text-xs font-black text-slate-300">SOAP PROTOCOL</span>
                            <div className="h-px bg-slate-100 flex-1"></div>
                        </div>

                        {/* Subjective */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                <span className="w-4 h-4 rounded bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]">S</span>
                                Subjective
                            </label>
                            <textarea
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm min-h-[80px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-shadow placeholder:text-slate-400"
                                placeholder="Patient's chief complaints, history of present illness..."
                            ></textarea>
                        </div>

                        {/* Objective */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                <span className="w-4 h-4 rounded bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]">O</span>
                                Objective
                            </label>
                            <textarea
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm min-h-[80px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-shadow placeholder:text-slate-400"
                                placeholder="Physical exam findings, vital signs, lab results..."
                            ></textarea>
                        </div>

                        {/* Assessment */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                <span className="w-4 h-4 rounded bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]">A</span>
                                Assessment
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Link Diagnosis or enter assessment..."
                                />
                            </div>
                        </div>

                        {/* Plan */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                <span className="w-4 h-4 rounded bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]">P</span>
                                Plan
                            </label>
                            <textarea
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm min-h-[80px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-shadow placeholder:text-slate-400"
                                placeholder="Treatment plan, medications, referrals, follow-up..."
                            ></textarea>
                        </div>

                        {/* Next Review */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-100">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <Calendar size={14} /> Next Review Date
                            </label>
                            <input
                                type="date"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                        <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                        <button className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
                            <CheckCircle size={18} /> Save Encounter
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DoctorVisitModal;
