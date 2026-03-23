import React, { useState } from 'react';
import { AlertTriangle, Activity, HeartPulse, Thermometer, Droplets, Brain, Clock, Plus, Search, UserPlus, Zap, ShieldAlert, Ambulance } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const ESI_LEVELS = [
  { level: 1, label: 'Resuscitation', color: 'bg-red-600', text: 'text-white', border: 'border-red-700', desc: 'Immediate life threat' },
  { level: 2, label: 'Emergent', color: 'bg-orange-500', text: 'text-white', border: 'border-orange-600', desc: 'High risk / confused' },
  { level: 3, label: 'Urgent', color: 'bg-yellow-400', text: 'text-slate-900', border: 'border-yellow-500', desc: 'Stable but needs >2 resources' },
  { level: 4, label: 'Less Urgent', color: 'bg-green-500', text: 'text-white', border: 'border-green-600', desc: 'Stable, 1 resource needed' },
  { level: 5, label: 'Non-Urgent', color: 'bg-blue-500', text: 'text-white', border: 'border-blue-600', desc: 'Chronic, no resources needed' },
];

const triageQueue = [
  { id: 'TRG-001', name: 'Ramesh Kumar', age: 58, arrivalMode: 'Ambulance', esi: 1, vitals: { bp: '80/50', hr: 120, spo2: 88, temp: 101.2, rr: 28 }, mlc: true, gcs: 9, time: '14:32', physician: 'Dr. Sharma' },
  { id: 'TRG-002', name: 'Priya Singh', age: 34, arrivalMode: 'Walk-in', esi: 3, vitals: { bp: '130/85', hr: 96, spo2: 97, temp: 99.8, rr: 18 }, mlc: false, gcs: 15, time: '14:40', physician: 'Dr. Mehta' },
  { id: 'TRG-003', name: 'Arun Patel', age: 72, arrivalMode: 'Private Vehicle', esi: 2, vitals: { bp: '180/110', hr: 102, spo2: 94, temp: 100.1, rr: 22 }, mlc: false, gcs: 13, time: '14:45', physician: 'Unassigned' },
];

const EsiBadge = ({ level }) => {
  const cfg = ESI_LEVELS.find(e => e.level === level);
  return (
    <span className={clsx('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black border', cfg.color, cfg.text, cfg.border)}>
      ESI {level} — {cfg.label}
    </span>
  );
};

const Triage = () => {
  const [selectedEsi, setSelectedEsi] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [formVitals, setFormVitals] = useState({ bp: '', hr: '', spo2: '', temp: '', rr: '', gcs: 15 });
  const [mlcFlag, setMlcFlag] = useState(false);
  const [chosenEsi, setChosenEsi] = useState(null);
  const [arrivalMode, setArrivalMode] = useState('Walk-in');

  const filtered = selectedEsi ? triageQueue.filter(t => t.esi === selectedEsi) : triageQueue;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <ShieldAlert className="text-red-500" size={28} />
            Emergency Triage
          </h1>
          <p className="text-slate-500 text-sm mt-1">ESI Level Assignment · Vital Recording · MLC Flagging</p>
        </div>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-black hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 flex items-center gap-2"
        >
          <UserPlus size={18} /> Register Emergency Patient
        </button>
      </div>

      {/* ESI Level Filter Cards */}
      <div className="grid grid-cols-5 gap-3">
        {ESI_LEVELS.map(esi => (
          <button
            key={esi.level}
            onClick={() => setSelectedEsi(prev => prev === esi.level ? null : esi.level)}
            className={clsx(
              'p-4 rounded-xl border-2 text-center transition-all hover:scale-105',
              selectedEsi === esi.level ? `${esi.color} ${esi.text} shadow-xl` : 'bg-white border-slate-200 hover:border-slate-300'
            )}
          >
            <div className={clsx('text-3xl font-black', selectedEsi === esi.level ? esi.text : 'text-slate-800')}>
              {triageQueue.filter(t => t.esi === esi.level).length}
            </div>
            <div className={clsx('text-[10px] font-black uppercase mt-1', selectedEsi === esi.level ? esi.text : 'text-slate-500')}>
              ESI {esi.level}
            </div>
            <div className={clsx('text-[9px] mt-0.5', selectedEsi === esi.level ? esi.text + '/80' : 'text-slate-400')}>
              {esi.label}
            </div>
          </button>
        ))}
      </div>

      {/* Triage Queue Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
            <Zap size={14} className="text-red-500" />
            Live Triage Queue — {filtered.length} Patients
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-slate-400 font-bold uppercase">Live</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b">
              <tr>
                <th className="px-6 py-4">Arrival Time</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Arrival Mode</th>
                <th className="px-6 py-4">ESI Priority</th>
                <th className="px-6 py-4">Key Vitals</th>
                <th className="px-6 py-4">GCS</th>
                <th className="px-6 py-4">Flags</th>
                <th className="px-6 py-4">Physician</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((pt) => (
                <motion.tr
                  key={pt.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={clsx(
                    'transition-colors hover:bg-slate-50/70',
                    pt.esi === 1 && 'bg-red-50/30',
                    pt.esi === 2 && 'bg-orange-50/20',
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-mono text-sm text-slate-700 font-bold">
                      <Clock size={14} className="text-slate-400" />
                      {pt.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{pt.name}</div>
                    <div className="text-[10px] text-slate-400">{pt.age} yrs · {pt.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {pt.arrivalMode === 'Ambulance' && <Ambulance size={14} className="text-red-500" />}
                      <span className="text-xs font-bold text-slate-600">{pt.arrivalMode}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><EsiBadge level={pt.esi} /></td>
                  <td className="px-6 py-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px] font-bold">
                      <span className="text-slate-500">BP: <span className={clsx(pt.vitals.bp === '80/50' ? 'text-red-600' : 'text-slate-800')}>{pt.vitals.bp}</span></span>
                      <span className="text-slate-500">HR: <span className={clsx(pt.vitals.hr > 100 ? 'text-orange-600' : 'text-slate-800')}>{pt.vitals.hr}</span></span>
                      <span className="text-slate-500">SpO₂: <span className={clsx(pt.vitals.spo2 < 95 ? 'text-red-600' : 'text-slate-800')}>{pt.vitals.spo2}%</span></span>
                      <span className="text-slate-500">Temp: <span className="text-slate-800">{pt.vitals.temp}°F</span></span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx('inline-block px-2 py-0.5 rounded text-[11px] font-black', pt.gcs <= 8 ? 'bg-red-100 text-red-700' : pt.gcs <= 12 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700')}>
                      GCS: {pt.gcs}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {pt.mlc && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 border border-purple-200 rounded text-[9px] font-black uppercase">
                        <AlertTriangle size={10} /> MLC
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx('text-xs font-bold', pt.physician === 'Unassigned' ? 'text-orange-600' : 'text-slate-700')}>
                      {pt.physician}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Patient Modal */}
      <AnimatePresence>
        {isNewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-red-600 px-6 py-4 flex items-center justify-between">
                <h2 className="text-white font-black text-lg flex items-center gap-2"><ShieldAlert size={20} /> Emergency Triage Registration</h2>
                <button onClick={() => setIsNewModalOpen(false)} className="text-white/80 hover:text-white text-2xl leading-none">&times;</button>
              </div>
              <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                {/* MLC Flag */}
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-purple-800 text-sm">MLC (Medico-Legal Case)</h4>
                    <p className="text-purple-600 text-xs">Toggle if this is a road accident, assault, poisoning, or suspicious injury</p>
                  </div>
                  <button
                    onClick={() => setMlcFlag(p => !p)}
                    className={clsx('w-12 h-6 rounded-full transition-colors relative', mlcFlag ? 'bg-purple-600' : 'bg-slate-300')}
                  >
                    <div className={clsx('absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all', mlcFlag ? 'left-7' : 'left-1')} />
                  </button>
                </div>

                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-black text-slate-600 uppercase tracking-wider">Arrival Mode</label>
                    <div className="flex gap-2 mt-1.5">
                      {['Walk-in', 'Ambulance', 'Private Vehicle', 'Referral'].map(m => (
                        <button
                          key={m}
                          onClick={() => setArrivalMode(m)}
                          className={clsx('px-3 py-1.5 rounded-lg text-[11px] font-black border transition-all', arrivalMode === m ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400')}
                        >{m}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-black text-slate-600 uppercase tracking-wider">Full Name / Unknown</label>
                    <input type="text" placeholder="Patient name or 'Unknown Male'" className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-black text-slate-600 uppercase tracking-wider">Approx. Age</label>
                    <input type="number" placeholder="Age in years" className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 outline-none" />
                  </div>
                </div>

                {/* Vitals */}
                <div>
                  <h4 className="text-xs font-black text-slate-600 uppercase tracking-wider mb-3">Initial Vitals</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: 'bp', label: 'BP (mmHg)', placeholder: '120/80' },
                      { key: 'hr', label: 'Heart Rate (bpm)', placeholder: '80' },
                      { key: 'spo2', label: 'SpO₂ (%)', placeholder: '98' },
                      { key: 'temp', label: 'Temperature (°F)', placeholder: '98.6' },
                      { key: 'rr', label: 'Resp. Rate', placeholder: '16' },
                      { key: 'gcs', label: 'GCS (3–15)', placeholder: '15' },
                    ].map(v => (
                      <div key={v.key}>
                        <label className="text-[10px] font-black text-slate-500 uppercase">{v.label}</label>
                        <input
                          type="text"
                          placeholder={v.placeholder}
                          value={formVitals[v.key]}
                          onChange={e => setFormVitals(p => ({ ...p, [v.key]: e.target.value }))}
                          className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-500/20"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* ESI Level */}
                <div>
                  <h4 className="text-xs font-black text-slate-600 uppercase tracking-wider mb-3">Assign ESI Level</h4>
                  <div className="flex gap-2 flex-wrap">
                    {ESI_LEVELS.map(esi => (
                      <button
                        key={esi.level}
                        onClick={() => setChosenEsi(esi.level)}
                        className={clsx(
                          'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black border-2 transition-all',
                          chosenEsi === esi.level ? `${esi.color} ${esi.text} border-transparent shadow-lg scale-105` : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                        )}
                      >
                        <span className={clsx('w-6 h-6 rounded-full flex items-center justify-center text-xs font-black', esi.color, esi.text)}>{esi.level}</span>
                        {esi.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => setIsNewModalOpen(false)} className="px-5 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200">Cancel</button>
                  <button className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-black text-sm shadow-lg shadow-red-500/30 hover:bg-red-700">
                    Register &amp; Assign Bed
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Triage;
