import React, { useState } from 'react';
import { X, Search, FileText, Check, AlertCircle, Shield } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function DiagnosticRequestModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [selectedTests, setSelectedTests] = useState([]);
    const [priority, setPriority] = useState('Routine');

    const tests = [
        { id: 'cbc', name: 'Complete Blood Count (CBC)', category: 'Hematology', price: 50 },
        { id: 'lft', name: 'Liver Function Test', category: 'Biochemistry', price: 80 },
        { id: 'xray_chest', name: 'X-Ray Chest PA View', category: 'Radiology', price: 120 },
        { id: 'mri_brain', name: 'MRI Brain Plain', category: 'Radiology', price: 450 },
        { id: 'ecg', name: 'ECG', category: 'Cardiology', price: 40 },
    ];

    const handleToggleTest = (id) => {
        setSelectedTests(prev => prev.includes(id)
            ? prev.filter(t => t !== id)
            : [...prev, id]
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">New Diagnostic Request</h2>
                                <div className="flex items-center gap-2 text-xs text-green-600 mt-1">
                                    <Shield size={12} />
                                    <span>HIPAA Compliant & Encrypted</span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto flex-1">
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Patient Search</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search by Name, ID or Phone number..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-slate-700">Select Tests</label>
                                    <span className="text-xs text-slate-500">{selectedTests.length} tests selected</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2">
                                    {tests.map(test => (
                                        <div
                                            key={test.id}
                                            onClick={() => handleToggleTest(test.id)}
                                            className={clsx(
                                                "cursor-pointer p-3 rounded-lg border transition-all flex items-start gap-3",
                                                selectedTests.includes(test.id)
                                                    ? "bg-primary-light border-primary"
                                                    : "bg-white border-slate-200 hover:border-blue-300"
                                            )}
                                        >
                                            <div className={clsx("mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors", selectedTests.includes(test.id) ? "bg-primary border-primary" : "border-slate-300")}>
                                                {selectedTests.includes(test.id) && <Check size={12} className="text-white" />}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-slate-900">{test.name}</div>
                                                <div className="text-xs text-slate-500">{test.category} • ${test.price}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    >
                                        <option>Routine</option>
                                        <option>Urgent</option>
                                        <option>Stat (Emergency)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Clinical Notes</label>
                                    <textarea rows={1} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" placeholder="Add diagnosis notes..." />
                                </div>
                            </div>

                            {priority === 'Stat (Emergency)' && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 text-red-700">
                                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                    <div className="text-sm">
                                        <strong>Critical Request:</strong> This will trigger an immediate alert to the lab/radiology department. Results are expected within 60 minutes.
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-600 rounded-lg shadow-sm transition-all hover:shadow-md flex items-center gap-2"
                            >
                                <FileText size={16} />
                                Create Request
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
