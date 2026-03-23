import React, { useState } from 'react';
import {
  Droplets, AlertTriangle, CheckCircle, Clock, FlaskConical,
  UserCheck, Thermometer, Plus, Search, Activity, Shield, RefreshCw, X
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

const BLOOD_GROUPS = [
  { type: 'A+', units: 14, reserved: 2, status: 'Stable' },
  { type: 'A-', units: 3, reserved: 1, status: 'Low' },
  { type: 'B+', units: 18, reserved: 3, status: 'Stable' },
  { type: 'B-', units: 1, reserved: 0, status: 'Critical' },
  { type: 'O+', units: 22, reserved: 5, status: 'Stable' },
  { type: 'O-', units: 2, reserved: 2, status: 'Critical' },
  { type: 'AB+', units: 9, reserved: 1, status: 'Stable' },
  { type: 'AB-', units: 4, reserved: 0, status: 'Low' },
];

const COMPONENTS = ['Whole Blood', 'PRBC', 'FFP', 'Platelets (SDP)', 'Cryoprecipitate'];

const BloodBank = () => {
    const [activeTab, setActiveTab] = useState('inventory');
    const [mtpModal, setMtpModal] = useState(false);
    const [requestHub, setRequestHub] = useState(false);
    const [donorModal, setDonorModal] = useState(false);
    const logAction = useStore(state => state.logAction);

    const tabs = [
        { id: 'inventory', label: 'Inventory (ISO-9001)', icon: Droplets },
        { id: 'requests', label: 'Transfusion Requests', icon: Activity },
        { id: 'donors', label: 'Donor Screening', icon: UserCheck },
        { id: 'discard', label: 'Reactive Discard Log', icon: Shield },
    ];

    const stats = [
        { title: 'Units Available', value: '142', icon: Droplets, color: 'bg-rose-600' },
        { title: 'STAT Requests', value: '03', icon: AlertTriangle, color: 'bg-amber-500' },
        { title: 'TTI-Cleared %', value: '100%', icon: Shield, color: 'bg-emerald-500' },
        { title: 'MTP Protocol', value: 'Inactive', icon: Activity, color: 'bg-slate-400' },
    ];

    return (
        <div className="space-y-6 pb-20 animate-fade-in px-4 relative">
            
            {/* TRANSFUSION REQUEST HUB OVERLAY */}
            <AnimatePresence>
                {requestHub && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-rose-950/95 backdrop-blur-3xl flex items-center justify-center p-6">
                         <div className="bg-white rounded-[3rem] p-12 max-w-2xl w-full shadow-2xl space-y-10 relative">
                             <button onClick={() => setRequestHub(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-800 transition-colors"><X size={24} /></button>
                             
                             <div className="text-center space-y-3">
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic">Clinical Blood Request</h2>
                                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">ER · OT · WARD Transfusion Command</p>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Urgency Level</label>
                                    <div className="flex gap-2 mt-2">
                                        {['Routine (24h)', 'Urgent (4h)', 'STAT (Emergency)'].map(u => (
                                            <button key={u} className={clsx("flex-1 py-4 rounded-2xl text-[10px] font-black uppercase border transition-all", u.includes('STAT') ? "bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-500/20" : "bg-white text-slate-600 border-slate-200")}>{u}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Component</label>
                                     <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-black outline-none">
                                        <option>PRBC (Packed Cells)</option>
                                        <option>FFP (Plasma)</option>
                                        <option>Platelets (RDP/SDP)</option>
                                     </select>
                                </div>
                                <div className="space-y-4">
                                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity (Units)</label>
                                     <input type="number" placeholder="e.g. 2" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-black outline-none" />
                                </div>
                                <div className="col-span-2 p-8 bg-slate-900 rounded-[2.5rem] text-white flex items-center justify-between border-l-4 border-rose-500">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pre-Transfusion Consent</p>
                                        <p className="text-xs font-bold text-rose-400">Verbal Consent obtained in ER?</p>
                                    </div>
                                    <button className="px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-xl text-[10px] font-black uppercase transition-all">Upload Form</button>
                                </div>
                             </div>

                             <button onClick={() => {
                                 logAction('BLOOD_CROSSMATCH_TRIGGERED', 'BLOOD_BANK', { urgency: 'STAT' });
                                 setRequestHub(false);
                             }} className="w-full py-5 bg-rose-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-rose-500/30 active:scale-95 transition-all">Trigger Crossmatch (Lab Sync)</button>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MTP Modal */}
            <AnimatePresence>
                {mtpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-rose-950/90 backdrop-blur-2xl flex items-center justify-center p-6">
                        <div className="bg-white rounded-[3rem] p-12 max-w-xl w-full shadow-2xl space-y-8 relative border-t-[12px] border-rose-600 overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transition-transform group-hover:rotate-12"><Droplets size={200} className="text-rose-600" /></div>
                            <div className="flex items-center gap-6 text-rose-600">
                                <AlertTriangle size={64} className="animate-pulse shrink-0" />
                                <div>
                                    <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">MTP ACTIVATED</h2>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mt-2 italic">Massive Transfusion Protocol v4.2</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="p-6 bg-rose-50 border border-rose-100 rounded-[2.5rem] flex items-center justify-between group hover:bg-rose-100 transition-all">
                                    <div className="font-black text-rose-900 uppercase text-xs">Emergency Unit #1 (O-)</div>
                                    <div className="px-4 py-2 bg-rose-600 text-white rounded-xl font-black text-[10px] uppercase shadow-lg shadow-rose-500/20">Released STAT</div>
                                </div>
                                <div className="p-6 bg-rose-50 border border-rose-100 rounded-[2.5rem] flex items-center justify-between group hover:bg-rose-100 transition-all">
                                    <div className="font-black text-rose-900 uppercase text-xs">Emergency Unit #2 (O-)</div>
                                    <div className="px-4 py-2 bg-rose-600 text-white rounded-xl font-black text-[10px] uppercase shadow-lg shadow-rose-500/20">Released STAT</div>
                                </div>
                            </div>

                            <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white space-y-6">
                                <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 italic leading-relaxed">"I hereby authorize emergency bypass of crossmatch. Chain of custody protocol enforced."</p>
                                <button onClick={() => {
                                    logAction('MTP_DOCTOR_AUTHORIZED', 'BLOOD_BANK', { protocol: 'v4.2' });
                                    setMtpModal(false);
                                }} className="w-full py-5 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-rose-600 hover:text-white transition-all active:scale-95">Doctor Signature (STAT)</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                        <div className="w-2 h-10 bg-rose-600 rounded-full" />
                        Blood Bank Inventory & Transfusion Hub
                    </h2>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em] mt-2 ml-5 leading-none italic opacity-70">Regulatory Standard: ISO-9001 · NABH/AABB v2.1 Compliance</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => {
                            logAction('MTP_PROTOCOL_ACTIVATED', 'BLOOD_BANK', { priority: 'P0' });
                            setMtpModal(true);
                        }}
                        className="px-8 py-4 bg-rose-700 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-rose-900/30 flex items-center gap-3 hover:bg-rose-600 transition-all border border-rose-500 group"
                    >
                        <AlertTriangle size={16} className="group-hover:animate-pulse" /> ACTIVATE MTP
                    </button>
                    <button 
                         onClick={() => setRequestHub(true)}
                         className="px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-950/20 flex items-center gap-4 hover:bg-slate-800 transition-all"
                    >
                        <Activity size={16} /> NEW CLINICAL REQUEST
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between hover:border-rose-200 transition-all group">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.title}</p>
                            <p className="text-3xl font-black text-slate-800 mt-1 tracking-tight">{s.value}</p>
                        </div>
                        <div className={clsx('w-14 h-14 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-slate-200 group-hover:scale-110 transition-transform', s.color)}>
                            <s.icon size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-slate-100 flex flex-wrap gap-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={clsx(
                            "flex items-center gap-3 px-6 py-3.5 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all",
                            activeTab === tab.id 
                                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" 
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        )}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Render Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="min-h-[400px]"
                >
                    {activeTab === 'inventory' && <InventoryView />}
                    {activeTab === 'requests' && <RequestsView />}
                    {activeTab === 'donors' && <DonorsView />}
                    {activeTab === 'discard' && <DiscardView />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// ─── Sub-Views ──────────────────────────────────────────────────────────────

const InventoryView = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {BLOOD_GROUPS.map(bg => (
                <div key={bg.type} className={clsx(
                    'p-6 rounded-[2rem] border-2 text-center relative overflow-hidden transition-all hover:scale-105 group',
                    bg.status === 'Critical' ? 'border-rose-300 bg-rose-50 shadow-lg shadow-rose-100' :
                    bg.status === 'Low' ? 'border-amber-300 bg-amber-50 shadow-md shadow-amber-50' : 'border-slate-50 bg-white'
                )}>
                    <div className={clsx('text-3xl font-black tracking-tighter',
                        bg.status === 'Critical' ? 'text-rose-600' :
                        bg.status === 'Low' ? 'text-amber-600' : 'text-slate-800'
                    )}>{bg.type}</div>
                    <div className="text-3xl font-black text-slate-900 mt-2">{bg.units}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Units</div>
                    {bg.reserved > 0 && <div className="text-[10px] text-violet-600 font-black mt-2 bg-violet-50 rounded-full py-1 uppercase">{bg.reserved} Reserved</div>}
                    {bg.status === 'Critical' && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 animate-ping" />}
                </div>
            ))}
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <h3 className="font-black text-slate-800 uppercase text-xs tracking-[0.2em] italic">Component Breakdown Matrix</h3>
                <div className="flex gap-4">
                    <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase italic"><div className="w-2 h-2 rounded-full bg-emerald-500" /> TTI Cleared</span>
                    <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase italic"><div className="w-2 h-2 rounded-full bg-rose-500" /> Quarantine</span>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white text-[10px] font-black uppercase text-slate-400 border-b border-slate-50">
                        <tr>
                            <th className="px-10 py-5">Component Type</th>
                            {BLOOD_GROUPS.map(bg => <th key={bg.type} className={clsx("px-4 py-5 font-black text-center", bg.status === 'Critical' ? 'text-rose-500' : '')}>{bg.type}</th>)}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {COMPONENTS.map((comp, idx) => (
                            <tr key={comp} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-10 py-5 font-bold text-slate-800">{comp}</td>
                                {BLOOD_GROUPS.map((bg, bgIdx) => (
                                    <td key={bg.type} className="px-4 py-5 text-center font-mono font-black text-slate-600">
                                        {Math.floor(bg.units / (idx + 1) + bgIdx)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const RequestsView = () => (
    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 border-b border-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <tr>
                    <th className="px-10 py-6">Patient / Encounter</th>
                    <th className="px-8 py-6">Req ID / Urgency</th>
                    <th className="px-8 py-6">Blood Spec</th>
                    <th className="px-8 py-6">Consent / Compliance</th>
                    <th className="px-10 py-6 text-right">Fulfillment</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {[
                    { patient: 'Sarah Connor', encounter: 'ENC-9021', id: 'BTR-990', urgency: 'STAT', bg: 'O-', component: 'PRBC', units: '02', consent: 'Verified (Digital)', reaction: 'None' },
                    { patient: 'John Wick', encounter: 'ENC-8821', id: 'BTR-881', urgency: 'Urgent', bg: 'A+', component: 'FFP', units: '04', consent: 'Physical Upload', reaction: 'Pending' },
                ].map((req, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 group transition-all">
                        <td className="px-10 py-6"><div className="font-black text-slate-900 uppercase tracking-tight">{req.patient}</div><div className="text-[10px] text-slate-400 font-bold uppercase">{req.encounter}</div></td>
                        <td className="px-8 py-6">
                            <span className="font-mono text-[11px] font-black text-slate-400">{req.id}</span>
                            <div className={clsx("mt-1.5 px-3 py-1 text-[9px] font-black uppercase rounded-full border w-fit shadow-xs", req.urgency === 'STAT' ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse' : 'bg-amber-50 text-amber-600 border-amber-200')}>{req.urgency}</div>
                        </td>
                        <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                                <div className="text-xl font-black text-rose-600">{req.bg}</div>
                                <div className="h-6 w-px bg-slate-200" />
                                <div className="text-xs font-bold text-slate-500 uppercase">{req.units} Units · {req.component}</div>
                            </div>
                        </td>
                        <td className="px-8 py-6">
                            <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase">
                                <Shield size={12} /> {req.consent}
                            </div>
                        </td>
                        <td className="px-10 py-6 text-right">
                             <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-950/20">Authorize Issue</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const DonorsView = () => (
    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden p-12 text-center space-y-6">
         <div className="max-w-md mx-auto space-y-4">
             <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 mx-auto shadow-inner"><UserCheck size={40} /></div>
             <h4 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">Donor Screening Hub</h4>
             <p className="text-slate-500 font-bold text-xs uppercase tracking-widest leading-loose">Automated pre-screening for Hb, Weight, and Age thresholds. Mandatory medical history questionnaire v3.0 integrated.</p>
             <button className="px-10 py-5 bg-emerald-600 text-white rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all">Start New Screening Session</button>
         </div>
    </div>
);

const DiscardView = () => (
    <div className="bg-rose-950 rounded-[3rem] p-16 text-white text-center space-y-10 relative overflow-hidden border-[10px] border-white/5">
         <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-6 grid-rows-6"><Shield size={300} className="rotate-12" /><Shield size={300} className="rotate-12" /></div>
         <div className="max-w-2xl mx-auto space-y-6 relative z-10">
             <h4 className="text-5xl font-black tracking-tighter uppercase italic leading-none">Infectious Waste Command</h4>
             <p className="text-rose-400 font-bold text-[10px] uppercase tracking-[0.5em] leading-relaxed italic">TTI Reactive Discard Matrix · Forensic Traceability · Regulatory mandatory logging</p>
             <div className="grid grid-cols-3 gap-6 pt-10">
                 <div className="p-8 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">HIV Reactive</p>
                    <p className="text-4xl font-black">02</p>
                 </div>
                 <div className="p-8 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <p className="text-[10px] font-black font-black text-rose-500 uppercase tracking-widest mb-2">Hep-B Reactive</p>
                    <p className="text-4xl font-black">05</p>
                 </div>
                 <div className="p-8 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">Expired Unit</p>
                    <p className="text-4xl font-black">01</p>
                 </div>
             </div>
             <button 
                onClick={() => {
                    logAction('BLOOD_DISPOSAL_LOG_GENERATED', 'BLOOD_BANK', { totalUnits: '08' });
                    alert('Regulatory Disposal Log finalized and archived.');
                }}
                className="mt-10 px-12 py-6 bg-white text-slate-900 rounded-[3rem] text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:bg-rose-500 hover:text-white transition-all">Generate Disposal Authority Log</button>
         </div>
    </div>
);

export default BloodBank;
