import React, { useState } from 'react';
import { 
    Activity, 
    Calendar, 
    Clock, 
    Accessibility, 
    Zap, 
    History, 
    Search, 
    Filter, 
    Plus,
    Flame,
    Wind,
    Droplets,
    ChevronRight,
    ArrowUpRight,
    Smartphone,
    X,
    CheckCircle
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import { clsx } from 'clsx';

const Physiotherapy = () => {
    const [selectedTab, setSelectedTab] = useState('Sessions');
    const [hepModal, setHepModal] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false); // BUG-019 fix

    const stats = [
        { title: 'Today Appointments', value: '18', icon: Calendar, color: 'bg-indigo-600', trend: 'up', trendValue: '4 New' },
        { title: 'Rehab Mastery (FIM)', value: '7.2', icon: Zap, color: 'bg-emerald-500', trend: 'up', trendValue: '+0.5 Avg' },
        { title: 'Avg. Duration', value: '45m', icon: Clock, color: 'bg-blue-500', trend: 'neutral', trendValue: 'Stable' },
        { title: 'HEP App Sync', value: '124', icon: Smartphone, color: 'bg-purple-600', trend: 'up', trendValue: '90% Active' },
    ];

    const appointments = [
        { id: 'PHY-904', patient: 'Robert Miller', therapy: 'Neuro-Physiotherapy', time: '10:00 AM', status: 'In Session', room: 'Rehab-1', progress: 65 },
        { id: 'PHY-905', patient: 'Sarah Jenkins', therapy: 'Post-OP Rehab (TKR)', time: '11:15 AM', status: 'Waiting', room: 'Gym-A', progress: 20 },
        { id: 'PHY-908', patient: 'James Wilson', therapy: 'Spinal Adjustment', time: '12:00 PM', status: 'Scheduled', room: 'Clinic-2', progress: 0 },
    ];

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            setHepModal(false);
            alert("HEP Protocols pushed successfully to Patient Mobile App. (Audit Log Entry Generated)");
        }, 2000);
    };

    return (
        <div className="space-y-6 pb-20 animate-fade-in px-4 relative">
            
            {/* HEP BUILDER & SYNC MODAL */}
            <AnimatePresence>
                {hepModal && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[120] bg-indigo-950/90 backdrop-blur-2xl flex items-center justify-center p-6"
                    >
                         <div className="bg-white rounded-[3rem] p-12 max-w-2xl w-full shadow-[0_0_100px_rgba(79,70,229,0.3)] space-y-10 relative">
                             <button onClick={() => setHepModal(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-800 transition-colors">
                                 <X size={24} />
                             </button>
                             
                             <div className="text-center space-y-3">
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Home Exercise Program (HEP) Builder</h2>
                                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Push High-Fidelity Video Protocols to Patient Mobile App</p>
                             </div>

                             <div className="space-y-6">
                                {[
                                    { title: 'Quadriceps Setting', sets: '3 Sets x 12 Reps', vid: 'HD-9012' },
                                    { title: 'Straight Leg Raise', sets: '2 Sets x 10 Reps', vid: 'HD-9015' },
                                    { title: 'Ankle Pumps', sets: 'Every 2 Hours', vid: 'HD-4412' }
                                ].map((ex, i) => (
                                    <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-indigo-400 transition-all cursor-pointer">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all">0{i+1}</div>
                                            <div>
                                                <p className="text-sm font-black text-slate-800">{ex.title}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">{ex.sets} · <span className="text-indigo-500 underline cursor-pointer">Preview Video {ex.vid}</span></p>
                                            </div>
                                        </div>
                                        <button className="text-rose-500 text-[10px] font-black uppercase tracking-widest hover:underline">Remove</button>
                                    </div>
                                ))}
                             </div>

                             <div className="flex gap-4 pt-4">
                                <button className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest">Add New Exercise</button>
                                <button 
                                    onClick={handleSync} 
                                    disabled={isSyncing}
                                    className={clsx(
                                        "flex-[1.5] py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3",
                                        isSyncing ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-indigo-600 text-white shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98]"
                                    )}
                                >
                                    {isSyncing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
                                            Encrypting & Pushing Protocols...
                                        </>
                                    ) : (
                                        <>
                                            <Smartphone size={16} />
                                            SYNC TO PATIENT APP
                                        </>
                                    )}
                                </button>
                             </div>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                         <div className="w-1.5 h-8 bg-indigo-600 rounded-full" />
                         Clinical Rehabilitation Engine
                    </h2>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1 ml-4">Movement Analysis · FIM Mastery · Mobile Continuity Activated</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                         onClick={() => setHepModal(true)}
                         className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-all"
                    >
                        <Smartphone size={14} className="text-indigo-600" /> Build Home Program
                    </button>
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/30 flex items-center gap-2 hover:scale-105 transition-all">
                        <Plus size={14} /> New Assessment (FIM)
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                   <StatCard key={i} {...s} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Session Schedule - Left */}
                <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-6">
                            {['Sessions', 'Assessments', 'Tele-Rehab'].map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setSelectedTab(tab)}
                                    className={clsx(
                                        "text-[10px] font-black uppercase tracking-widest pb-1 transition-all relative",
                                        selectedTab === tab ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    {tab}
                                    {selectedTab === tab && (
                                        <motion.div layoutId="activeTabPhysio" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                           <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input type="text" placeholder="Patient Name..." className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-[10px] font-black outline-none w-48 focus:w-64 transition-all" />
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        {appointments.map((appt, i) => (
                           <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-indigo-100 rounded-3xl transition-all group cursor-pointer">
                               <div className="flex items-center gap-6 flex-1">
                                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 border border-slate-100 shadow-sm font-black text-xs">
                                       {appt.time.split(' ')[0]}
                                   </div>
                                   <div>
                                       <h4 className="text-sm font-black text-slate-800">{appt.patient}</h4>
                                       <p className="text-[10px] font-bold text-slate-500 uppercase">{appt.id} · <span className="text-indigo-600">{appt.therapy}</span></p>
                                   </div>
                                   <div className="hidden md:block flex-1 max-w-[150px] mx-8">
                                       <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase mb-1.5">
                                          <span>Regimen Progress</span>
                                          <span>{appt.progress}%</span>
                                       </div>
                                       <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                                           <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${appt.progress}%` }} />
                                       </div>
                                   </div>
                               </div>
                               <div className="flex items-center gap-4">
                                   <span className={clsx(
                                       "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                                       appt.status === 'In Session' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                                       appt.status === 'Waiting' ? "bg-amber-50 text-amber-600 border-amber-100 shadow-sm" : "bg-white text-slate-400 border-slate-100"
                                   )}>
                                       {appt.status}
                                   </span>
                                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                      <ChevronRight size={16} />
                                   </div>
                               </div>
                           </div>
                        ))}
                    </div>
                </div>

                {/* Modality & Insights - Right */}
                <div className="lg:col-span-4 space-y-6">
                    
                    {/* Modality Hub */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                           <Zap size={100} />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Equipment Modalities</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                                <Flame className="text-orange-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Thermotherapy</p>
                                <p className="text-[8px] font-bold text-slate-500 mt-1 uppercase">2 Units Active</p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                                <Zap className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">TENS / IFT</p>
                                <p className="text-[8px] font-bold text-slate-500 mt-1 uppercase">4 Units Active</p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                                <Wind className="text-emerald-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Cryotherapy</p>
                                <p className="text-[8px] font-bold text-slate-500 mt-1 uppercase">Ready</p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                                <Activity className="text-rose-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Laser Therapy</p>
                                <p className="text-[8px] font-bold text-slate-500 mt-1 uppercase">In Use (R-2)</p>
                            </div>
                        </div>
                        <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all">
                           Equipment Inventory Dashboard
                        </button>
                    </div>

                    {/* Patient Outcome Insight */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
                       <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-6">Outcome Analytics</h3>
                       <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">94%</div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Pain Score Reduction</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Average across 124 patients</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">12d</div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Avg. Rehab Duration</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Optimal Recovery Path</p>
                                </div>
                            </div>
                       </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Physiotherapy;
