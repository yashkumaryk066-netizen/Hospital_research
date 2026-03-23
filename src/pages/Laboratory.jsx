import React, { useState } from 'react';
import { 
    FlaskConical, 
    Search, 
    Filter, 
    Clock, 
    CheckCircle2, 
    AlertTriangle, 
    FileText, 
    Download, 
    Activity, 
    Microscope, 
    Thermometer,
    Zap,
    ChevronRight,
    MoreVertical,
    Share2,
    FileSearch,
    RefreshCw,
    X
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import useStore from '../store/useStore';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts';

const Laboratory = () => {
    const [selectedTab, setSelectedTab] = useState('Active Tests');
    const [searchQuery, setSearchQuery] = useState('');
    const [criticalAlert, setCriticalAlert] = useState(true);   // BUG-001 fix
    const [scannerActive, setScannerActive] = useState(false);  // BUG-001 fix
    const logAction = useStore(state => state.logAction);

    const stats = [
        { title: 'Pending Samples', value: '42', icon: FlaskConical, color: 'bg-blue-600', trend: 'up', trendValue: '+12%' },
        { title: 'Processing', value: '18', icon: RefreshCw, color: 'bg-teal-500', trend: 'neutral', trendValue: 'Stable' },
        { title: 'Urgent (STAT)', value: '06', icon: Zap, color: 'bg-rose-500', trend: 'down', trendValue: '-2' },
        { title: 'Ready Reports', value: '124', icon: CheckCircle2, color: 'bg-emerald-500', trend: 'up', trendValue: '+28' },
    ];

    const testQueue = [
        { id: 'LAB-9042', patient: 'Rajesh Kumar', test: 'Complete Blood Count (CBC)', status: 'Processing', priority: 'Urgent', room: 'Ward 402', age: '45, M', time: '12:30 PM' },
        { id: 'LAB-9043', patient: 'Sunita Devi', test: 'Lipid Profile', status: 'Ready', priority: 'Normal', room: 'OPD-12', age: '32, F', time: '01:15 PM' },
        { id: 'LAB-9044', patient: 'Amit Singh', test: 'HBA1C (Diabetes)', status: 'Pending', priority: 'Urgent', room: 'ICU-B2', age: '28, M', time: '02:00 PM' },
        { id: 'LAB-9045', patient: 'Priya Sharma', test: 'Liver Function Test (LFT)', status: 'Processing', priority: 'Normal', room: 'Ward 105', age: '52, F', time: '03:45 PM' },
    ];

    const trendData = [
        { day: 'Mon', tests: 65, urgent: 12 },
        { day: 'Tue', tests: 72, urgent: 15 },
        { day: 'Wed', tests: 90, urgent: 22 },
        { day: 'Thu', tests: 85, urgent: 18 },
        { day: 'Fri', tests: 95, urgent: 25 },
        { day: 'Sat', tests: 50, urgent: 8 },
        { day: 'Sun', tests: 40, urgent: 5 },
    ];

    return (
        <div className="space-y-6 pb-20 animate-fade-in px-4 relative">
            
            {/* CRITICAL VALUE ALERT BANNER */}
            <AnimatePresence>
                {criticalAlert && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-rose-600 text-white px-8 py-3 rounded-2xl flex items-center justify-between shadow-2xl shadow-rose-500/40 relative z-50 overflow-hidden"
                    >
                        <div className="flex items-center gap-3">
                            <Zap className="animate-pulse" size={20} />
                            <p className="font-black uppercase tracking-[0.2em] text-xs">Critical Value Detected: K+ 6.8 mmol/L (ICU-B2 • LAB-9044)</p>
                        </div>
                        <div className="flex gap-2">
                             <button className="px-4 py-1.5 bg-white text-rose-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all">CALL DOCTOR</button>
                             <button onClick={() => setCriticalAlert(false)} className="px-4 py-1.5 bg-rose-800 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">ACKNOWLEDGE</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header Area */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                         <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                         Advanced Diagnostics Hub
                    </h2>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1">Smart Lab Orchestration System (LIS Integration Active)</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-all">
                        <Download size={14} /> Daily LIS Log
                    </button>
                    <button 
                        onClick={() => setScannerActive(true)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/30 flex items-center gap-4 hover:scale-105 transition-all"
                    >
                        <Zap size={14} /> RECEIVE BARCODED SAMPLE
                    </button>
                </div>
            </div>

            {/* Barcode Scanner Simulation Overlay */}
            <AnimatePresence>
                {scannerActive && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <div className="bg-white rounded-[3rem] p-12 max-w-xl w-full text-center space-y-8 relative overflow-hidden group">
                             <button onClick={() => setScannerActive(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-800 transition-colors"><X size={24} /></button>
                             
                             <div className="w-48 h-48 bg-slate-50 border-4 border-dashed border-slate-200 rounded-[3rem] mx-auto flex flex-col items-center justify-center relative overflow-hidden">
                                 <div className="absolute inset-0 bg-blue-500/20 animate-scan-up-down" />
                                 <Zap size={48} className="text-slate-300 mb-2" />
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Camera Feedback</p>
                             </div>

                             <div>
                                 <h2 className="text-3xl font-black text-slate-800">Align Barcode</h2>
                                 <p className="text-slate-500 font-medium mt-3">Scanning for Tube ID (Vacutainer / Swab / Slide)</p>
                             </div>

                             <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                                 <input 
                                     type="text" 
                                     placeholder="MANUAL ENTRY (UHID-LAB-XXXX)" 
                                     className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-center text-sm font-black text-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all uppercase" 
                                 />
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                 <button onClick={() => setScannerActive(false)} className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest">Cancel</button>
                                 <button onClick={() => {
                                     logAction('SAMPLE_RECEIPT_FORCE_AUTHORIZED', 'LAB', { method: 'Manual Entry' });
                                     alert('Sample Received & Logged in LIS.');
                                     setScannerActive(false);
                                 }} className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/30">Force Receive</button>
                             </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <StatCard key={i} {...s} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Active Test Queue Table */}
                <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-6">
                            {['Active Tests', 'Completed', 'Archived'].map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setSelectedTab(tab)}
                                    className={clsx(
                                        "text-[10px] font-black uppercase tracking-widest pb-1 transition-all relative",
                                        selectedTab === tab ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    {tab}
                                    {selectedTab === tab && (
                                        <motion.div layoutId="activeTab" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                           <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input type="text" placeholder="Search ID..." className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-[10px] font-black outline-none w-32 focus:w-48 transition-all" />
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                                <tr>
                                    <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Lab ID</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Patient / Source</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Investigation</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {testQueue.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                        <td className="px-8 py-5">
                                           <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{item.id}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-xs font-black text-slate-800">{item.patient}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1 mt-0.5">
                                               {item.age} • <span className="text-blue-500">{item.room}</span>
                                            </p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                               <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                                                  <Microscope size={16} />
                                               </div>
                                               <p className="text-xs font-bold text-slate-600">{item.test}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                           <div className={clsx(
                                               "inline-flex px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
                                               item.priority === 'Urgent' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                           )}>
                                              {item.priority}
                                           </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                           <div className="flex items-center justify-end gap-2">
                                              <span className={clsx(
                                                  "text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-tight",
                                                  item.status === 'Processing' ? 'bg-teal-50 text-teal-600 animate-pulse' : 
                                                  item.status === 'Ready' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                                              )}>
                                                  {item.status}
                                              </span>
                                              {item.status === 'Ready' && (
                                                  <button 
                                                      onClick={(e) => {
                                                          e.stopPropagation();
                                                          logAction('LAB_RESULTS_APPROVED', 'LAB', { labId: item.id });
                                                          alert(`Results for ${item.id} approved and sent to EMR.`);
                                                      }}
                                                      className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
                                                  >
                                                      <CheckCircle2 size={12} />
                                                  </button>
                                              )}
                                              <ChevronRight size={14} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
                                           </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column: Analytics & Quick Tools */}
                <div className="lg:col-span-4 space-y-6">
                    
                    {/* Lab Volume Trend */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Test Volume Analytics</h3>
                            <select className="bg-slate-50 border-none text-[8px] font-black px-2 py-1 rounded-lg outline-none uppercase">
                               <option>Weekly View</option>
                            </select>
                        </div>
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData}>
                                    <defs>
                                        <linearGradient id="colorTests" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Area type="monotone" dataKey="tests" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTests)" strokeWidth={3} />
                                    <Area type="monotone" dataKey="urgent" stroke="#f43f5e" fillOpacity={0} borderDash="5 5" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Quick Smart Actions */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0F172A] rounded-3xl p-6 text-white group cursor-pointer hover:bg-slate-800 transition-all">
                            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                                <Zap size={20} />
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">STAT Access</h4>
                            <p className="text-sm font-black leading-tight">Critical Fast-Track</p>
                        </div>
                        <div className="bg-blue-600 rounded-3xl p-6 text-white group cursor-pointer hover:bg-blue-700 transition-all">
                            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-blue-100 group-hover:scale-110 transition-transform">
                                <Activity size={20} />
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-1">Live Sync</h4>
                            <p className="text-sm font-black leading-tight">Machine Status</p>
                        </div>
                    </div>

                    {/* Advanced Verification Area */}
                    <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Microscope size={80} />
                       </div>
                       <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4">Quality Control</h3>
                       <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm">
                             <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <CheckCircle2 size={16} />
                             </div>
                             <div>
                                <p className="text-[10px] font-black text-slate-800">Analyzer-X01 Calibration</p>
                                <p className="text-[8px] font-bold text-emerald-500 uppercase">Optimal Status</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm">
                             <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                                <AlertTriangle size={16} />
                             </div>
                             <div>
                                <p className="text-[10px] font-black text-slate-800">Reagent Inventory Low</p>
                                <p className="text-[8px] font-bold text-amber-500 uppercase">Order in Progress</p>
                             </div>
                          </div>
                       </div>
                       <button className="w-full mt-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[9px] font-black uppercase tracking-[0.15em] hover:bg-slate-50 active:scale-95 transition-all">
                          View Detailed QC Report
                       </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Laboratory;
