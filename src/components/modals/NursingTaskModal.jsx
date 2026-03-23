import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ClipboardList, Clock, AlertCircle, UserPlus, CheckCircle, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

const NursingTaskModal = ({ isOpen, onClose }) => {
    const [priority, setPriority] = useState('Routine');

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
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                                <ClipboardList size={18} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">Assign Nursing Task</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-5">

                        {/* Task Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Task Description</label>
                            <input
                                type="text"
                                placeholder="e.g. Change dressing, Monitor vitals hourly..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                            />
                        </div>

                        {/* Priority (New Field) */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                Priority Level <AlertCircle size={12} className="text-slate-400" />
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Routine', 'Urgent', 'STAT'].map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPriority(p)}
                                        className={clsx(
                                            "py-2.5 text-xs font-bold border rounded-lg transition-all flex items-center justify-center gap-1",
                                            priority === p && p === 'STAT' ? "bg-red-50 border-red-500 text-red-600 shadow-sm" :
                                                priority === p && p === 'Urgent' ? "bg-orange-50 border-orange-500 text-orange-600 shadow-sm" :
                                                    priority === p ? "bg-blue-50 border-blue-500 text-blue-600 shadow-sm" :
                                                        "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                                        )}
                                    >
                                        {p === 'STAT' && <AlertTriangle size={12} />}
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Due Time (New Field) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:border-purple-500"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Time</label>
                                <input
                                    type="time"
                                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:border-purple-500"
                                />
                            </div>
                        </div>

                        {/* Escalate To (New Field) */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                Escalate To <UserPlus size={12} className="text-slate-400" />
                            </label>
                            <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:border-purple-500">
                                <option value="">Select Role / Person...</option>
                                <option value="Charge Nurse">Charge Nurse (Flo)</option>
                                <option value="Resident">Resident Doctor</option>
                                <option value="Consultant">Consultant</option>
                            </select>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                        <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                        <button className="px-5 py-2.5 bg-purple-600 text-white text-sm font-bold rounded-lg hover:bg-purple-700 shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2">
                            <CheckCircle size={18} /> Assign Task
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default NursingTaskModal;
