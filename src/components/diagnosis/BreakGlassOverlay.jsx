import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileWarning, Eye, AlertTriangle } from 'lucide-react';

const BreakGlassOverlay = ({ isVisible, onUnlock, onCancel }) => {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    if (!isVisible) return null;

    const handleUnlock = () => {
        if (reason.length < 5) {
            setError('Please provide a valid reason (min 5 characters).');
            return;
        }
        onUnlock(reason);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-red-200"
                >
                    <div className="bg-red-50 p-6 border-b border-red-100 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm animate-pulse">
                            <Lock size={32} className="text-red-500" />
                        </div>
                    </div>

                    <div className="p-8 text-center space-y-4">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Restricted Record</h2>
                        <p className="text-slate-500 font-medium">
                            This patient's record is marked as <span className="text-red-600 font-bold bg-red-50 px-1 py-0.5 rounded border border-red-100 uppercase tracking-wide">Confidential / VIP</span>.
                        </p>

                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-left rounded-r-lg space-y-1 my-4">
                            <h4 className="flex items-center gap-2 font-bold text-amber-800 text-sm">
                                <AlertTriangle size={16} /> Audit Warning
                            </h4>
                            <p className="text-xs text-amber-700 leading-relaxed">
                                Accessing this record will trigger an immediate security alert to the Privacy Officer. Your comprehensive audit log will include this access event.
                            </p>
                        </div>

                        <div className="space-y-2 text-left">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block ml-1">Reason for Emergency Access</label>
                            <textarea
                                value={reason}
                                onChange={(e) => { setReason(e.target.value); setError(''); }}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm min-h-[100px] focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                placeholder="State clearly why access is required (e.g., Clinical Emergency in ER)..."
                            ></textarea>
                            {error && <p className="text-red-500 text-xs font-bold flex items-center gap-1"><FileWarning size={12} /> {error}</p>}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={onCancel}
                                className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUnlock}
                                className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2"
                            >
                                <Eye size={18} /> Break Glass
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BreakGlassOverlay;
