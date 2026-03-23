import React, { useState } from 'react';
import {
  AlertOctagon, FileText, Shield, Hospital, Phone,
  MapPin, Clock, User, CreditCard, Plus, CheckCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const mlcCases = [
  { id: 'MLC-2026-001', name: 'Ramesh Kumar', esi: 1, incident: 'Road Traffic Accident', policeStation: 'Sector 17 PS', caseFiled: true, fir: 'FIR#1892/2026', doctor: 'Dr. Sharma', status: 'Police Notified', admittedOn: '20 Mar 2026 14:32', evidenceCount: 3 },
  { id: 'MLC-2026-002', name: 'Unknown Female', esi: 2, incident: 'Assault / Suspected Domestic Violence', policeStation: 'Pending', caseFiled: false, fir: 'Pending', doctor: 'Dr. Mehta', status: 'DD Entry Pending', admittedOn: '20 Mar 2026 15:10', evidenceCount: 0 },
  { id: 'MLC-2026-003', name: 'Suresh Gupta', esi: 3, incident: 'Accidental Poisoning (Organophosphate)', policeStation: 'City PS', caseFiled: true, fir: 'FIR#1893/2026', doctor: 'Dr. Agarwal', status: 'Report Submitted', admittedOn: '19 Mar 2026 09:45', evidenceCount: 5 },
];

const MLC = () => {
  const [isNewModal, setIsNewModal] = useState(false);
  const [evidenceVault, setEvidenceVault] = useState(false);
  const [incidentType, setIncidentType] = useState('');

  const stats = [
    { title: 'MTD Cases', value: '42', icon: FileText, color: 'bg-purple-600' },
    { title: 'Pending Police', value: '03', icon: Clock, color: 'bg-orange-500' },
    { title: 'Evidence Sealed', value: '184', icon: Shield, color: 'bg-emerald-500' },
    { title: 'Legal Dispatches', value: '12', icon: MapPin, color: 'bg-blue-600' },
  ];

  const incidentTypes = [
    'Road Traffic Accident', 'Assault / Physical Violence', 'Suspected Domestic Violence',
    'Sexual Assault', 'Accidental Poisoning', 'Suicide Attempt', 'Animal Bite',
    'Burn Injuries (Suspicious)', 'Industrial Accident', 'Unknown / Unconscious',
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <AlertOctagon className="text-purple-600" size={28} />
            Medico-Legal Case (MLC) Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">RTA · Assault · Poisoning · MCCD · Legal Reporting</p>
        </div>
        <button
          onClick={() => setIsNewModal(true)}
          className="px-5 py-2.5 bg-purple-700 text-white rounded-xl text-sm font-black hover:bg-purple-800 shadow-lg shadow-purple-500/30 flex items-center gap-2"
        >
          <Plus size={16} /> Register MLC Case
        </button>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 px-5 py-4 rounded-xl">
        <h4 className="font-black text-amber-900 flex items-center gap-2 text-sm"><Shield size={16} /> Legal Obligation Notice</h4>
        <p className="text-amber-800 text-xs mt-1">
          As per CRPC Section 39 &amp; IPC 202, all MLC cases must be reported to the nearest police station within <strong>1 hour</strong>.
          Documentation must be complete before any medico-legal opinion is issued.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-purple-200 transition-all cursor-pointer">
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.title}</p>
                <p className="text-2xl font-black text-slate-800 mt-1">{s.value}</p>
             </div>
             <div className={clsx('w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg', s.color)}>
                <s.icon size={20} />
             </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
            <AlertOctagon size={18} className="text-purple-500 animate-pulse" />
            Active Medico-Legal Database
          </h3>
          <div className="flex gap-2">
             <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase shadow-sm">Export Law-Log</button>
             <button onClick={() => setEvidenceVault(true)} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase shadow-lg">Evidence Vault</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b">
              <tr>
                <th className="px-10 py-5">Case ID</th>
                <th className="px-6 py-5">Patient & Timeline</th>
                <th className="px-6 py-5">Incident Context</th>
                <th className="px-6 py-5">Police Station</th>
                <th className="px-6 py-5">FIR/DD No.</th>
                <th className="px-6 py-5">Items Sealed</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {mlcCases.map((mlc) => (
                <tr key={mlc.id} className="hover:bg-purple-50/30 transition-colors group">
                  <td className="px-10 py-6 font-mono text-xs font-black text-purple-600">{mlc.id}</td>
                  <td className="px-6 py-6">
                    <div className="font-black text-slate-800">{mlc.name}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">{mlc.admittedOn}</div>
                  </td>
                  <td className="px-6 py-6 font-bold text-slate-600">{mlc.incident}</td>
                  <td className="px-6 py-6">
                     <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-black text-slate-500">{mlc.policeStation}</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className={clsx('text-xs font-black', mlc.fir === 'Pending' ? 'text-orange-500' : 'text-slate-900')}>
                      {mlc.fir}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-center">
                     <div className="flex flex-col items-center">
                        <span className="text-sm font-black text-slate-800">{mlc.evidenceCount}</span>
                        <span className="text-[8px] font-black text-emerald-600 uppercase">Sealed</span>
                     </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={clsx('px-3 py-1 text-[9px] font-black uppercase rounded-full border',
                      mlc.status === 'Police Notified' ? 'bg-green-50 text-green-700 border-green-100' :
                      mlc.status === 'Report Submitted' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-orange-50 text-orange-700 border-orange-100'
                    )}>{mlc.status}</span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-purple-600 shadow-sm"><FileText size={14} /></button>
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-emerald-600 shadow-sm"><Shield size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EVIDENCE VAULT OVERLAY */}
      <AnimatePresence>
        {evidenceVault && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6">
                <div className="bg-white rounded-[3rem] p-12 max-w-4xl w-full flex flex-col gap-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5"><Shield size={300} className="text-purple-600" /></div>
                    <button onClick={() => setEvidenceVault(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-800"><Shield size={32} /></button>
                    
                    <div className="space-y-2">
                        <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Evidence Chain-of-Custody</h2>
                        <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.3em]">Legal Lockdown Mode Active</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 grid grid-cols-2 gap-4">
                            {[
                                { title: 'Injury Photo #1', type: 'JPG-ENCRYPTED', size: '4.2MB', date: '21 Mar, 02:44 AM' },
                                { title: 'Clothes (Sealed)', type: 'PH-BAG-904', size: 'TAG#882', date: '21 Mar, 03:10 AM' },
                                { title: 'Stomach Wash', type: 'VIAL-X-04', size: 'SEAL#9012', date: '21 Mar, 03:15 AM' },
                                { title: 'CCTV-E30', type: 'MP4-HS', size: '128MB', date: '21 Mar, 02:00 AM' },
                            ].map((ev, i) => (
                                <div key={i} className="bg-slate-50 border border-slate-100 p-6 rounded-3xl hover:border-purple-400 transition-all cursor-pointer group">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm mb-4 flex items-center justify-center text-slate-300 group-hover:text-purple-600 transition-all">
                                        <Shield size={18} />
                                    </div>
                                    <p className="text-xs font-black text-slate-800">{ev.title}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{ev.type} · {ev.size}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-8 h-full">
                           <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Vault Audit Log</h4>
                           <div className="space-y-4">
                               <div className="flex gap-3">
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1 shrink-0" />
                                  <p className="text-[10px] font-medium opacity-60">Officer R. Singh verified items at 14:00 PM</p>
                               </div>
                               <div className="flex gap-3">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1 shrink-0" />
                                  <p className="text-[10px] font-medium opacity-60">Dr. Sharma locked the vault at 10:15 AM</p>
                               </div>
                           </div>
                           <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20">Handover To Police</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* New MLC Modal */}
      {isNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-purple-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-white font-black text-lg">Register MLC Case</h2>
              <button onClick={() => setIsNewModal(false)} className="text-white/80 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase">Type of Incident</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {incidentTypes.map(it => (
                    <button key={it} onClick={() => setIncidentType(it)}
                      className={clsx('p-2 rounded-lg text-[11px] font-black border text-left transition-all',
                        incidentType === it ? 'bg-purple-700 text-white border-purple-700' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-purple-400')}>
                      {it}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase">Police Station Name</label>
                  <input type="text" className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase">FIR Number (if filed)</label>
                  <input type="text" placeholder="FIR#XXXX / NA" className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Incident Details / Preliminary Notes</label>
                  <textarea rows={3} className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/20 resize-none" placeholder="Brief clinical description of injuries / presentation..." />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsNewModal(false)} className="px-5 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm">Cancel</button>
                <button className="px-6 py-2.5 bg-purple-700 text-white rounded-xl font-black text-sm hover:bg-purple-800">Register &amp; Notify Police</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MLC;
