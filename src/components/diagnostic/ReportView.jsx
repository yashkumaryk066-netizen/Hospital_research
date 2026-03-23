import React, { useState } from 'react';
import {
    X,
    Download,
    Printer,
    ShieldCheck,
    Clock,
    User,
    AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuditLog = ({ logs }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4">
        <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-600" />
            HIPAA Audit Trail
        </h4>
        <div className="space-y-2">
            {logs.map((log, index) => (
                <div key={index} className="flex items-start text-xs text-slate-500">
                    <Clock size={12} className="mt-0.5 mr-2 shrink-0" />
                    <span>
                        <span className="font-medium text-slate-700">{log.user}</span> {log.action} at {log.time}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

export default function ReportView({ isOpen, onClose, reportData }) {
    const [showAudit, setShowAudit] = useState(false);

    const mockLogs = [
        { user: 'Dr. Sarah Wilson', action: 'viewed report', time: 'Today, 10:23 AM' },
        { user: 'System', action: 'report generated', time: 'Today, 09:15 AM' },
        { user: 'Lab Tech Mike', action: 'verified results', time: 'Today, 09:10 AM' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-hidden">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white w-full max-w-4xl h-full max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                            <div className="flex items-center gap-4">
                                <h2 className="text-lg font-bold text-slate-800">Diagnostic Report</h2>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">Finalized</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowAudit(!showAudit)}
                                    className="p-2 text-slate-500 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                                >
                                    <ShieldCheck size={18} />
                                    <span className="hidden sm:inline">Audit Log</span>
                                </button>
                                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                                    <Printer size={18} />
                                </button>
                                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                                    <Download size={18} />
                                </button>
                                <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 transition-colors ml-2">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 bg-white relative">

                            {/* Report Header */}
                            <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-6">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                        <User size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">John Doe</h3>
                                        <div className="text-sm text-slate-500 mt-1">ID: #P-10293 • 45 Years • Male</div>
                                        <div className="text-sm text-slate-500">Ref: Dr. Alan Grant (Cardiology)</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-slate-800">OK Care Hospital</div>
                                    <div className="text-xs text-slate-500 mt-1">123 Health Ave, Medical District</div>
                                    <div className="text-xs text-slate-500">License: H-9928-11</div>
                                </div>
                            </div>

                            {/* Patient Alert */}
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="text-red-500" size={20} />
                                    <div>
                                        <h4 className="font-bold text-red-800 text-sm">Critical Finding</h4>
                                        <p className="text-sm text-red-700 mt-1">
                                            Potassium Level: 6.2 mEq/L (High). Immediate attention required. Notified Dr. Alan Grant at 10:15 AM via secure paging.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Results Table */}
                            <h4 className="font-bold text-slate-800 mb-4 text-lg">Biochemistry Panel</h4>
                            <table className="w-full text-sm text-left mb-8">
                                <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Test Name</th>
                                        <th className="px-4 py-3">Result</th>
                                        <th className="px-4 py-3">Units</th>
                                        <th className="px-4 py-3 rounded-r-lg">Reference Range</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-slate-700">Sodium (Na+)</td>
                                        <td className="px-4 py-3">138</td>
                                        <td className="px-4 py-3 text-slate-500">mEq/L</td>
                                        <td className="px-4 py-3 text-slate-500">135 - 145</td>
                                    </tr>
                                    <tr className="bg-red-50/50 hover:bg-red-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-slate-900">Potassium (K+)</td>
                                        <td className="px-4 py-3 font-bold text-red-600">6.2</td>
                                        <td className="px-4 py-3 text-slate-500">mEq/L</td>
                                        <td className="px-4 py-3 text-slate-500">3.5 - 5.1</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-slate-700">Chloride (Cl-)</td>
                                        <td className="px-4 py-3">101</td>
                                        <td className="px-4 py-3 text-slate-500">mEq/L</td>
                                        <td className="px-4 py-3 text-slate-500">98 - 107</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Interpretation */}
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-slate-800 mb-2">Radiologist Interpretation / Notes</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Patient shows signs of hyperkalemia. ECG changes noted (peaked T-waves). Recommend immediate clinical correlation and potential intervention. Sample re-verified.
                                </p>
                                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-slate-200">
                                    <div>
                                        <div className="font-dancing-script text-2xl text-slate-800">Sarah Wilson</div>
                                        <div className="text-xs text-slate-500 font-bold uppercase mt-1">Verified By</div>
                                    </div>
                                    <div className="text-right mt-4 sm:mt-0">
                                        <div className="text-xs text-slate-400">Electronic Signature ID:</div>
                                        <div className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded mt-1">SIG-8829-XJ-2024</div>
                                    </div>
                                </div>
                            </div>

                            {/* Audit Log Overlay/Section */}
                            <AnimatePresence>
                                {showAudit && (
                                    <motion.div
                                        initial={{ height: 0, opcode: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <AuditLog logs={mockLogs} />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
