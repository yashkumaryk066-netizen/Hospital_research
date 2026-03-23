import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, FileText, CheckCircle, Clock, FileCheck } from 'lucide-react';
import { clsx } from 'clsx';

const VisitDetailsModal = ({ isOpen, onClose, visit }) => {
    if (!isOpen) return null;

    // Mock data if no visit prop provided
    const data = visit || {
        id: "VIS-2026-00921",
        date: "12 Feb 2026, 10:30 AM",
        doctor: "Dr. Ram Sharma",
        type: "Follow-up",
        status: "Completed",
        subjective: "Patient reports improved sleep patterns but continued mild anxiety in evenings.",
        objective: "BP 120/80, HR 72. Alert and oriented x3.",
        assessment: "Generalized Anxiety Disorder (F41.1) - Stable",
        plan: "Continue Sertraline 50mg. Review in 4 weeks."
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                <FileCheck size={18} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">Visit Details</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Small Header Row (Requested Polish) */}
                    <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-slate-500">ID: <span className="font-bold text-slate-700">{data.id}</span></span>
                            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200 font-bold uppercase tracking-wider">
                                <CheckCircle size={10} /> {data.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                            <span>Signed by:</span>
                            <span className="text-primary font-bold underline decoration-dotted underline-offset-2">{data.doctor}</span>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">

                        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Date & Time</label>
                                <div className="font-medium text-slate-800 flex items-center gap-2"><Calendar size={14} className="text-slate-400" /> {data.date}</div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Visit Type</label>
                                <div className="font-medium text-slate-800">{data.type}</div>
                            </div>
                        </div>

                        {/* SOAP Display */}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-4 h-4 rounded bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]">S</span>
                                    Subjective
                                </label>
                                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">{data.subjective}</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-4 h-4 rounded bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]">O</span>
                                    Objective
                                </label>
                                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">{data.objective}</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-4 h-4 rounded bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]">A</span>
                                    Assessment
                                </label>
                                <p className="text-sm font-bold text-slate-800 bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-center gap-2">
                                    <FileText size={14} className="text-blue-500" /> {data.assessment}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-4 h-4 rounded bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]">P</span>
                                    Plan
                                </label>
                                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">{data.plan}</p>
                            </div>
                        </div>

                    </div>

                    {/* Footer - HIPAA */}
                    <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-400 flex justify-between uppercase tracking-wider font-bold">
                        <span>Recorded at encounter ENC-2026-001245</span>
                        <span>Official Medical Record</span>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default VisitDetailsModal;
