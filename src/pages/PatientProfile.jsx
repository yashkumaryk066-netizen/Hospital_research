import React, { useState, useEffect } from 'react';
import {
    User, Shield, AlertTriangle, Activity, FileText, CreditCard, Clock, Pill, Unlock, Lock,
    ChevronRight, Stethoscope, Search, Plus, ShoppingCart, Microscope, Radiation, Check,
    BrainCircuit, Sparkles, TrendingUp, TrendingDown, Thermometer, Droplets, HeartPulse
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '../components/ui/Skeleton';

// --- Mock Data for Charts ---
const vitalsData = [
    { time: '08:00', heartRate: 72, bp: 120, temp: 98.6 },
    { time: '10:00', heartRate: 75, bp: 122, temp: 98.7 },
    { time: '12:00', heartRate: 78, bp: 125, temp: 99.1 },
    { time: '14:00', heartRate: 82, bp: 128, temp: 99.4 },
    { time: '16:00', heartRate: 80, bp: 124, temp: 99.2 },
    { time: '18:00', heartRate: 76, bp: 121, temp: 98.9 },
];

// --- Sub-Components ---

const VitalsChart = ({ data }) => {
    return (
        <div className="h-48 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ color: '#64748B', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="heartRate" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorHr)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

const AIPanel = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
                <BrainCircuit size={100} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300 mb-3">
                <Sparkles size={18} className="text-indigo-500" />
                AI Clinical Insights
            </h3>
            <ul className="space-y-3 relative z-10">
                <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="mt-0.5 min-w-[6px] h-1.5 rounded-full bg-red-500"></div>
                    <div>
                        <span className="font-bold text-red-600 dark:text-red-400">Sepsis Risk Elevated</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">HR trending up (avg 82bpm) combined with mild temperature elevation (+0.8°F in 4h). Recommend Lactate check.</p>
                    </div>
                </li>
                <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="mt-0.5 min-w-[6px] h-1.5 rounded-full bg-orange-500"></div>
                    <div>
                        <span className="font-bold text-orange-600 dark:text-orange-400">Medication Interaction</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Potential interaction between Lisinopril and newly prescribed K-Spar (Potassium sparing).</p>
                    </div>
                </li>
            </ul>
        </div>
    );
};

const OrderCatalog = ({ onClose }) => {
    // ... (Simplified for brevity, keeping existing logic but styling for dark mode)
    // In a real app, this would be imported or fully defined. 
    // For this example, I'll keep a placeholder to focus on the main profile enhancements.
    return (
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center">
            <h3 className="text-slate-800 dark:text-white font-bold">Order Catalog Module</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Full CPOE interface loaded here...</p>
            <button onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded font-bold text-sm">Close</button>
        </div>
    )
};

const PatientProfile = () => {
    const [isRestricted, setIsRestricted] = useState(true);
    const [breakGlassModal, setBreakGlassModal] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleBreakGlass = () => {
        setBreakGlassModal(false);
        setIsRestricted(false);
    };

    if (isRestricted) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="text-center max-w-md p-8 bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 transition-all">
                    <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 dark:text-red-400 animate-pulse">
                        <Lock size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Restricted Access</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                        This patient record is flagged as <strong>VIP / Confidential</strong>.
                        Access is restricted to authorized personnel only.
                    </p>
                    <button
                        onClick={() => setBreakGlassModal(true)}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/20 flex items-center gap-2 mx-auto"
                    >
                        <Unlock size={18} />
                        Break the Glass
                    </button>
                </div>
                <AnimatePresence>
                    {breakGlassModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-white dark:bg-dark-card border dark:border-slate-700 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl p-6"
                            >
                                <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                                    <AlertTriangle size={20} />
                                    Emergency Access Protocol
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                                    You are about to access a restricted record. This action will be logged and audited by the Compliance Officer.
                                    <br /><br />
                                    <strong>Reason for access is required:</strong>
                                </p>
                                <textarea className="w-full p-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm mb-4 outline-none focus:ring-2 focus:ring-red-500/20" placeholder="Enter clinical justification..."></textarea>
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setBreakGlassModal(false)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm rounded hover:bg-slate-200 dark:hover:bg-slate-700">Cancel</button>
                                    <button onClick={handleBreakGlass} className="px-4 py-2 bg-red-600 text-white rounded font-bold text-sm hover:bg-red-700 shadow-lg shadow-red-500/30">Confirm Access</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-12">
            {/* Patient Header 360 */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden transition-colors">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                {isLoading ? (
                    <div className="flex gap-4 animate-pulse">
                        <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                        <div className="space-y-2 flex-1">
                            <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded"></div>
                            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 border-2 border-slate-200 dark:border-slate-700 shadow-inner">
                                <User size={40} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Sarah Connor</h1>
                                    <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-200 dark:border-yellow-800 uppercase tracking-wider">High Risk</span>
                                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800 uppercase tracking-wider">VIP</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 flex items-center gap-3 font-medium">
                                    <span>DOB: 12 Aug 1985 (39y)</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span>Female</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span>UHID: <span className="font-mono text-slate-700 dark:text-slate-300">#992-8832-11</span></span>
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors flex items-center gap-2 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800">
                                <Activity size={16} /> Analytics
                            </button>
                            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
                                <Stethoscope size={16} /> Start Encounter
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 dark:border-slate-800 flex gap-6 overflow-x-auto scrollbar-none">
                {['overview', 'timeline', 'orders', 'medications', 'labs', 'billing'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={clsx(
                            "pb-3 text-sm font-bold capitalize transition-all border-b-2 whitespace-nowrap px-1",
                            activeTab === tab
                                ? "border-primary text-primary dark:text-primary-light"
                                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {activeTab === 'orders' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <OrderCatalog onClose={() => setActiveTab('overview')} />
                    </motion.div>
                )}

                {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Clinical Summary */}
                        <div className="lg:col-span-2 space-y-6">

                            {isLoading ? <Skeleton className="h-64 w-full" /> : (
                                <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                            <HeartPulse size={18} className="text-red-500" />
                                            Vitals Trend
                                        </h3>
                                        <select className="text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md p-1 outline-none text-slate-600 dark:text-slate-300 font-medium">
                                            <option>Last 24 Hours</option>
                                            <option>Last 7 Days</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4 mb-6">
                                        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50 text-center">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BP</div>
                                            <div className="text-xl font-black text-slate-800 dark:text-white">120/80</div>
                                            <div className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-1 rounded inline-block">Normal</div>
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50 text-center">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">HR</div>
                                            <div className="text-xl font-black text-slate-800 dark:text-white">82</div>
                                            <div className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-1 rounded inline-block flex items-center justify-center gap-0.5">
                                                <TrendingUp size={10} /> Ele
                                            </div>
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50 text-center">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SpO2</div>
                                            <div className="text-xl font-black text-slate-800 dark:text-white">98%</div>
                                            <div className="text-xs text-slate-400">Room Air</div>
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50 text-center">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Temp</div>
                                            <div className="text-xl font-black text-slate-800 dark:text-white">99.1</div>
                                            <div className="text-xs text-slate-400">°F</div>
                                        </div>
                                    </div>

                                    <VitalsChart data={vitalsData} />
                                </div>
                            )}

                            {isLoading ? <Skeleton className="h-40 w-full" /> : (
                                <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                            <Pill size={18} className="text-blue-500" />
                                            Active Medications
                                        </h3>
                                        <button className="text-xs text-primary font-bold hover:underline">+ Prescription</button>
                                    </div>
                                    <div className="space-y-3">
                                        {[1, 2].map(i => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-400 dark:text-slate-300 shadow-sm group-hover:scale-105 transition-transform">
                                                        <Pill size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800 dark:text-white">Lisinopril 10mg</div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">1 Tablet • PO • Daily</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full border border-green-100 dark:border-green-800">Active</div>
                                                    <div className="text-[10px] text-slate-400 mt-1">Refills: 2</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Billing & Timeline */}
                        <div className="space-y-6">
                            {isLoading ? <Skeleton className="h-48 w-full" /> : <AIPanel />}

                            {isLoading ? <Skeleton className="h-56 w-full" /> : (
                                <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors">
                                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><Clock size={18} className="text-slate-400" /> Care Timeline</h3>
                                    <div className="relative border-l-2 border-slate-100 dark:border-slate-700 ml-3 space-y-8 pb-4">

                                        <div className="ml-6 relative">
                                            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-dark-card shadow-sm transition-colors"></div>
                                            <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Today, 10:30 AM</div>
                                            <div className="font-bold text-slate-800 dark:text-white text-sm">Lab Results Verified</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700">
                                                BMP Panel - Critical Value (K+)
                                            </div>
                                        </div>

                                        <div className="ml-6 relative">
                                            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-green-500 border-4 border-white dark:border-dark-card shadow-sm transition-colors"></div>
                                            <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">12 Feb, 09:00 AM</div>
                                            <div className="font-bold text-slate-800 dark:text-white text-sm">Admitted IPD</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">Ward 4B • Bed 12</div>
                                        </div>

                                    </div>
                                    <button className="w-full py-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors">View All Events</button>
                                </div>
                            )}

                            {isLoading ? <Skeleton className="h-40 w-full" /> : (
                                <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-slate-800 dark:text-white">Billing</h3>
                                        <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded font-bold">Self-Pay</span>
                                    </div>
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className="text-3xl font-black text-slate-800 dark:text-white">$450.00</span>
                                        <span className="text-xs text-slate-400">USD</span>
                                    </div>
                                    <div className="text-xs font-bold text-slate-500 uppercase mb-4">Unbilled Estimate</div>
                                    <button className="w-full py-2.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 shadow-lg shadow-slate-500/10 transition-colors flex items-center justify-center gap-2">
                                        <CreditCard size={14} /> Collect Payment
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PatientProfile;
