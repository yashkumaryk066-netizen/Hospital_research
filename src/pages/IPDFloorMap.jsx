import React, { useState } from 'react';
import { 
    Layout, 
    Bed, 
    User, 
    Activity, 
    AlertTriangle, 
    CheckCircle2, 
    Clock, 
    Info, 
    Plus, 
    Search, 
    Filter,
    ChevronRight,
    ArrowUpRight,
    MoreVertical,
    Thermometer,
    Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const IPDFloorMap = () => {
    const [selectedWard, setSelectedWard] = useState('General Ward A');
    const [selectedBed, setSelectedBed] = useState(null);

    const wards = [
        { id: 'gw-a', name: 'General Ward A', floors: 'Floor 2', total: 24, occupied: 18, critical: 2 },
        { id: 'icu-1', name: 'Cardiac ICU', floors: 'Floor 3', total: 12, occupied: 10, critical: 8 },
        { id: 'pvt-1', name: 'Private Deluxe', floors: 'Floor 4', total: 10, occupied: 4, critical: 0 },
        { id: 'nicu', name: 'Neonatal ICU', floors: 'Floor 3', total: 8, occupied: 6, critical: 4 },
    ];

    const beds = Array.from({ length: 24 }, (_, i) => ({
        id: `B-${101 + i}`,
        status: i % 5 === 0 ? 'Empty' : i % 8 === 0 ? 'Critical' : 'Occupied',
        patient: i % 5 === 0 ? null : { name: 'Patient ' + (i + 1), age: 45 + (i % 10), gender: i % 2 === 0 ? 'M' : 'F', dx: 'Hypertension', doctor: 'Dr. Sharma' },
        vitals: { temp: 98.6, hr: 72 + (i % 5), spo2: 98 - (i % 3) }
    }));

    return (
        <div className="space-y-6 pb-20 animate-fade-in px-4">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Interactive Bed Management</h2>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1">Real-time Facility Occupancy & Clinical Overlays</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-all">
                        <Filter size={14} /> Heatmap View
                    </button>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/30 flex items-center gap-2 hover:scale-105 transition-all">
                        <Plus size={14} /> Quick Admission
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Ward Selector - Left */}
                <div className="lg:col-span-3 space-y-4">
                    {wards.map((w, i) => (
                        <div 
                            key={w.id}
                            onClick={() => setSelectedWard(w.name)}
                            className={clsx(
                                "p-5 rounded-[2rem] border cursor-pointer transition-all group relative overflow-hidden",
                                selectedWard === w.name ? "bg-slate-900 border-slate-900 shadow-xl shadow-slate-900/20" : "bg-white border-slate-100 hover:border-blue-200"
                            )}
                        >
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <p className={clsx("text-[9px] font-black uppercase tracking-widest mb-1", selectedWard === w.name ? "text-blue-400" : "text-slate-400")}>{w.floors}</p>
                                    <h4 className={clsx("text-sm font-black", selectedWard === w.name ? "text-white" : "text-slate-800")}>{w.name}</h4>
                                </div>
                                <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-colors", 
                                    selectedWard === w.name ? "bg-white/10 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600")}>
                                    {w.occupied}/{w.total}
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 relative z-10">
                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${(w.occupied/w.total)*100}%` }} />
                                </div>
                                {w.critical > 0 && (
                                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title={`${w.critical} Critical Patients`} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bed Map - Center */}
                <div className="lg:col-span-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 flex flex-col relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{selectedWard} — Bed Map</h3>
                       <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-tighter text-slate-400">
                           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-100" /> Empty</div>
                           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Occupied</div>
                           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500" /> Critical</div>
                       </div>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                        {beds.map((bed, i) => (
                            <motion.div 
                                key={bed.id}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setSelectedBed(bed)}
                                className={clsx(
                                    "aspect-square rounded-[1.5rem] border-2 flex flex-col items-center justify-center p-3 cursor-pointer transition-all relative group",
                                    bed.status === 'Empty' ? "bg-slate-50 border-slate-100/50 hover:bg-white hover:border-blue-100" : 
                                    bed.status === 'Critical' ? "bg-rose-50 border-rose-100 shadow-sm" : "bg-blue-50 border-blue-100 shadow-sm",
                                    selectedBed?.id === bed.id ? "ring-4 ring-blue-600/10 border-blue-600 shadow-xl" : ""
                                )}
                            >
                                <Bed size={20} className={clsx(
                                    "mb-1",
                                    bed.status === 'Empty' ? "text-slate-200 group-hover:text-blue-300" : 
                                    bed.status === 'Critical' ? "text-rose-400 animate-pulse" : "text-blue-400"
                                )} />
                                <span className={clsx("text-[10px] font-black", bed.status === 'Empty' ? "text-slate-300" : "text-slate-800")}>{bed.id}</span>
                                
                                {bed.status !== 'Empty' && (
                                    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-green-500" />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Nursing Station Overlay */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-slate-900 rounded-2xl flex items-center gap-4 border border-white/10 shadow-2xl">
                        <div className="flex -space-x-2">
                           {[1,2,3].map(i => (
                               <div key={i} className="w-5 h-5 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[8px] font-bold">N</div>
                           ))}
                        </div>
                        <p className="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">Nursing Station Active</p>
                    </div>
                </div>

                {/* Bed Insights - Right */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        {selectedBed ? (
                            <motion.div 
                                key={selectedBed.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-8 sticky top-24"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                       <Bed size={24} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedBed.id}</p>
                                        <p className={clsx("text-xs font-black uppercase", selectedBed.status === 'Critical' ? "text-rose-500" : "text-blue-600")}>{selectedBed.status}</p>
                                    </div>
                                </div>

                                {selectedBed.status !== 'Empty' ? (
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Patient Information</h4>
                                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-slate-300 border border-slate-100 overflow-hidden shrink-0">
                                                  <User size={20} />
                                               </div>
                                               <div>
                                                  <p className="text-sm font-black text-slate-800">{selectedBed.patient.name}</p>
                                                  <p className="text-[10px] font-bold text-slate-500 uppercase">{selectedBed.patient.age}y, {selectedBed.patient.gender} · {selectedBed.patient.dx}</p>
                                               </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col items-center">
                                                <Heart className="text-emerald-500 mb-2" size={16} />
                                                <span className="text-xl font-black text-emerald-700">{selectedBed.vitals.hr}</span>
                                                <span className="text-[8px] font-black text-emerald-400 uppercase">HR (BPM)</span>
                                            </div>
                                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col items-center">
                                                <Activity className="text-blue-500 mb-2" size={16} />
                                                <span className="text-xl font-black text-blue-700">{selectedBed.vitals.spo2}%</span>
                                                <span className="text-[8px] font-black text-blue-400 uppercase">SpO2</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                           <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all">Clinical Workbench</button>
                                           <button className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all">Move / Transfer Bed</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-12 text-center">
                                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 text-slate-200 border-2 border-dashed border-slate-100">
                                           <Plus size={32} />
                                        </div>
                                        <p className="text-sm font-black text-slate-700 mb-1 tracking-tight">Bed Ready for Admission</p>
                                        <p className="text-xs text-slate-400 font-medium px-4">This unit is currently vacant and sanitized. Proceed to IPD registration.</p>
                                        <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">Assign Now</button>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center opacity-70 sticky top-24 h-[400px]">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                                   <Info size={24} className="text-slate-300" />
                                </div>
                                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-2 font-black">Floor Map Analytics</h4>
                                <p className="text-xs text-slate-500 font-bold mb-8 px-4 leading-relaxed tracking-tight">Select a bed unit to view real-time physiological data and patient demographics.</p>
                                <div className="space-y-1 bg-white p-4 rounded-2xl w-full border border-slate-100">
                                   <div className="flex items-center justify-between text-[10px]"><span className="text-slate-400 font-bold">Total Occupancy</span><span className="font-black">74%</span></div>
                                   <div className="flex items-center justify-between text-[10px]"><span className="text-slate-400 font-bold">Staff to Patient Ratio</span><span className="font-black">1:4</span></div>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default IPDFloorMap;
