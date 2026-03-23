import React, { useState } from 'react';
import { 
    Truck, 
    User, 
    Phone, 
    Shield, 
    Clock, 
    MapPin, 
    Plus, 
    CheckCircle2, 
    AlertTriangle,
    Navigation2
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { clsx } from 'clsx';

const Ambulance = () => {
    const [view, setView] = useState('list'); // list, tracker, epcr
    const [mciMode, setMciMode] = useState(false);

    const ambulances = [
        { id: 'AMB-101', number: 'MH-12-AS-1221', driver: 'Rahul Deshmukh', status: 'Available', contact: '+91 98221 22110', type: 'ALS' },
        { id: 'AMB-102', number: 'MH-12-AS-5501', driver: 'Suresh Kumar', status: 'On Call', contact: '+91 88122 00192', type: 'BLS' },
        { id: 'AMB-105', number: 'MH-12-AS-9921', driver: 'Vikram Singh', status: 'Maintenance', contact: '+91 77122 11922', type: 'Cardiac' },
    ];

    const activeLogs = [
        { id: 'LOG-881', vehicle: 'AMB-102', patient: 'Mrs. Kulkarni', pickup: 'Amanora Park', status: 'En-Route', eta: '5 mins' },
    ];

    return (
        <div className="space-y-8 pb-20 animate-fade-in relative">
            
            {/* MCI SURGE BANNER */}
            <AnimatePresence>
                {mciMode && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-rose-600 text-white px-8 py-3 rounded-2xl flex items-center justify-between shadow-2xl shadow-rose-500/40 relative z-50 overflow-hidden"
                    >
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="animate-pulse" size={20} />
                            <p className="font-black uppercase tracking-[0.2em] text-xs">MCI Protocol Active (Mass Casualty Incident)</p>
                        </div>
                        <div className="flex gap-2">
                             {['RED', 'YELLOW', 'GREEN', 'BLACK'].map(tag => (
                                 <div key={tag} className={clsx(
                                     "px-3 py-1 rounded-lg text-[10px] font-black border border-white/20",
                                     tag === 'RED' ? 'bg-red-800' : tag === 'YELLOW' ? 'bg-amber-500' : tag === 'GREEN' ? 'bg-emerald-600' : 'bg-slate-900'
                                 )}>{tag}</div>
                             ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                   <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
                      Emergency & Ambulance
                   </h1>
                   <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-widest font-black">Fleet Tracking • Response Management</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                       onClick={() => setMciMode(!mciMode)}
                       className={clsx(
                           "px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2",
                           mciMode ? "bg-rose-100 text-rose-600 border border-rose-200" : "bg-white border border-slate-200 text-slate-400"
                       )}
                    >
                        <Shield size={16} /> {mciMode ? "Exit MCI Mode" : "MCI Surge"}
                    </button>
                   <button 
                      onClick={() => setView('tracker')}
                      className={clsx(
                          "px-6 py-3 border rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm transition-all flex items-center gap-2",
                          view === 'tracker' ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      )}
                   >
                       <Navigation2 size={16} /> Live Tracker
                   </button>
                   <button className="px-6 py-3 bg-amber-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-500/30 flex items-center gap-2 hover:scale-105 transition-all">
                       <Plus size={16} /> Deploy Vehicle
                   </button>
                </div>
            </div>

            {/* Content Area */}
            {view === 'epcr' ? (
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-10 space-y-10 animate-scale-up">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-800">Electronic Patient Care Record (ePCR)</h2>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">LOG-881 • AMB-102 • Paramedic En-Route</p>
                        </div>
                        <button onClick={() => setView('list')} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-all text-slate-400">
                             <Plus className="rotate-45" size={24} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Clinical Capture */}
                        <div className="lg:col-span-2 space-y-8">
                             <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Situation (S-BAR)</p>
                                 <div className="grid grid-cols-2 gap-6">
                                     <div className="col-span-2">
                                         <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Chief Complaint / Mechanism of Injury</label>
                                         <textarea className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm font-bold min-h-[100px] outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" placeholder="Chest pain with radiating left arm..."></textarea>
                                     </div>
                                     <div>
                                         <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">ESI Triage Tag</label>
                                         <div className="flex gap-2">
                                             <button className="w-10 h-10 bg-red-600 rounded-xl shadow-lg shadow-red-500/20"></button>
                                             <button className="w-10 h-10 bg-amber-500 rounded-xl transition-all transform scale-110 border-2 border-white ring-2 ring-amber-500"></button>
                                             <button className="w-10 h-10 bg-emerald-500 rounded-xl"></button>
                                             <button className="w-10 h-10 bg-slate-900 rounded-xl"></button>
                                         </div>
                                     </div>
                                     <div>
                                         <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Controlled Meds Used</label>
                                         <select className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none">
                                             <option>Morphine 5mg (IV)</option>
                                             <option>Fentanyl 50mcg (IV)</option>
                                             <option>None</option>
                                         </select>
                                     </div>
                                 </div>
                             </div>

                             <div className="grid grid-cols-2 gap-6">
                                 <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm">
                                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Background (S-BAR)</p>
                                     <div className="space-y-4">
                                         <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                             <span className="text-[10px] font-black text-slate-500 uppercase">Allergies</span>
                                             <span className="text-xs font-black text-rose-500">PENICILLIN</span>
                                         </div>
                                         <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                             <span className="text-[10px] font-black text-slate-500 uppercase">Med History</span>
                                             <span className="text-xs font-black text-slate-700">HTN, DIABETES</span>
                                         </div>
                                     </div>
                                 </div>
                                 <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm">
                                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Assessment (S-BAR)</p>
                                     <div className="grid grid-cols-2 gap-3">
                                         <div className="p-3 bg-amber-50 rounded-xl">
                                             <p className="text-[8px] font-black text-amber-600 uppercase tracking-widest">HR</p>
                                             <p className="text-lg font-black text-slate-800">112 bpm</p>
                                         </div>
                                         <div className="p-3 bg-blue-50 rounded-xl">
                                             <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest">SpO2</p>
                                             <p className="text-lg font-black text-slate-800">92%</p>
                                         </div>
                                         <div className="p-3 bg-rose-50 rounded-xl">
                                             <p className="text-[8px] font-black text-rose-600 uppercase tracking-widest">GCS</p>
                                             <p className="text-lg font-black text-slate-800">14/15</p>
                                         </div>
                                         <div className="p-3 bg-emerald-50 rounded-xl">
                                             <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">TEMP</p>
                                             <p className="text-lg font-black text-slate-800">37.2°C</p>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                        </div>

                        {/* Handover & Validation */}
                        <div className="space-y-6">
                            <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                                <Shield className="absolute top-0 right-0 p-8 opacity-10" size={100} />
                                <h3 className="text-xs font-black uppercase tracking-widest text-indigo-300 mb-6">Handover Recommendation</h3>
                                <div className="p-5 bg-white/10 rounded-3xl backdrop-blur-md mb-8">
                                     <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-2">Priority Path</p>
                                     <p className="text-lg font-black leading-tight text-white mb-4">Direct Transfer to Cath Lab 2 (Pre-Alert sent)</p>
                                     <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                         <div className="h-full bg-indigo-400 w-3/4 animate-shimmer" />
                                     </div>
                                </div>
                                <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl hover:bg-slate-50 transition-all transform active:scale-95">
                                   Authorize EMR Upload
                                </button>
                                <p className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest text-center mt-4">HIPAA Sealed • Immutable Timestamp</p>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 text-center">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Ambulance GPS Geofence</p>
                                <p className="text-xs font-black text-slate-800">Arriving at West Gate in 3.2m</p>
                                <div className="mt-4 flex justify-center gap-1">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className={clsx("w-6 h-1 rounded-full", i <= 3 ? "bg-amber-500" : "bg-slate-200")} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : view === 'list' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Fleet List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between px-2 mb-2">
                           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Fleet List</h3>
                        </div>
                        {ambulances.map((amb) => (
                            <div key={amb.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex flex-wrap items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className={clsx(
                                            "w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-lg",
                                            amb.status === 'Available' ? 'bg-emerald-500 shadow-emerald-500/20' : 
                                            amb.status === 'On Call' ? 'bg-amber-500 shadow-amber-500/20' : 'bg-slate-300 shadow-slate-300/20'
                                        )}>
                                            <Truck size={32} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-xl font-black text-slate-800">{amb.number}</h4>
                                                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-lg">{amb.type}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-400 text-xs font-bold">
                                                <span className="flex items-center gap-1"><User size={14} /> {amb.driver}</span>
                                                <span className="flex items-center gap-1"><Phone size={14} /> {amb.contact}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right mr-4 hidden sm:block">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                                            <p className={clsx("text-sm font-black", 
                                                amb.status === 'Available' ? 'text-emerald-500' : 'text-amber-500'
                                            )}>{amb.status}</p>
                                        </div>
                                        <button className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                                            Logs
                                        </button>
                                        <button 
                                            onClick={() => setView('epcr')}
                                            className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                                        >
                                            <FileText size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Active Dispatch Tracker Widget */}
                    <div className="space-y-6">
                        <div className="px-2">
                           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Ongoing Dispatches</h3>
                        </div>
                        {activeLogs.map((log) => (
                            <div key={log.id} className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div className="flex items-center gap-2 mb-8 relative z-10">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Alert: Active Call</p>
                                </div>
                                
                                <div className="space-y-6 relative z-10 mb-8">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Destination</p>
                                        <div className="flex items-start gap-4">
                                            <MapPin className="text-amber-500 mt-1" size={20} />
                                            <div>
                                                <p className="font-black text-lg">{log.pickup}</p>
                                                <p className="text-xs text-slate-400 font-medium">Picking up {log.patient}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-3xl">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">ETA</p>
                                            <p className="text-xl font-black text-amber-500">{log.eta}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Vehicle</p>
                                            <p className="text-xl font-black">{log.vehicle}</p>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setView('epcr')}
                                    className="w-full py-4 bg-white text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all origin-bottom group-hover:scale-[1.02]"
                                >
                                   Open ePCR Console
                                </button>
                            </div>
                        ))}
                        
                        {/* Summary Card */}
                        <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white">
                           <Shield size={32} className="mb-4 text-blue-200" />
                           <h3 className="text-xl font-black mb-2">Fleet Safety</h3>
                           <p className="text-blue-100 text-xs font-medium leading-relaxed">All vehicles are equipped with AIS-140 GPS and oxygen level sensors. Real-time telemetry active.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-slate-100 rounded-[3rem] p-12 h-[500px] flex items-center justify-center border-2 border-dashed border-slate-200">
                    <div className="text-center">
                        <Navigation2 size={64} className="mx-auto text-slate-300 mb-6 animate-pulse" />
                        <h3 className="text-2xl font-black text-slate-400">Live GPS Cluster View</h3>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2 underline">Mock Map Interface Active</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ambulance;
