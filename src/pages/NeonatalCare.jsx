import React, { useState } from 'react';
import {
  Heart, AlertTriangle, Baby, Activity, Clock, Plus,
  ChevronRight, CheckCircle, User, Shield
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

// APGAR Score Calculator
const APGAR_CRITERIA = [
  {
    name: 'Appearance (Skin Color)',
    options: [
      { score: 0, label: 'Blue/Pale all over' },
      { score: 1, label: 'Blue extremities, pink body' },
      { score: 2, label: 'Pink all over' },
    ]
  },
  {
    name: 'Pulse (Heart Rate)',
    options: [
      { score: 0, label: 'Absent' },
      { score: 1, label: '<100 bpm' },
      { score: 2, label: '≥100 bpm' },
    ]
  },
  {
    name: 'Grimace (Reflex)',
    options: [
      { score: 0, label: 'No response' },
      { score: 1, label: 'Grimace' },
      { score: 2, label: 'Cry / cough / sneeze' },
    ]
  },
  {
    name: 'Activity (Muscle Tone)',
    options: [
      { score: 0, label: 'Limp' },
      { score: 1, label: 'Some flexion' },
      { score: 2, label: 'Active motion' },
    ]
  },
  {
    name: 'Respiration',
    options: [
      { score: 0, label: 'Absent' },
      { score: 1, label: 'Weak / irregular' },
      { score: 2, label: 'Strong cry' },
    ]
  },
];

const partograph = [
  { time: '08:00', cervix: 3, fhr: 138, contractions: 2 },
  { time: '10:00', cervix: 5, fhr: 142, contractions: 3 },
  { time: '12:00', cervix: 7, fhr: 148, contractions: 4 },
  { time: '14:00', cervix: 9, fhr: 145, contractions: 4 },
  { time: '15:30', cervix: 10, fhr: 152, contractions: 5 },
];

const NeonatalCare = () => {
  const [activeTab, setActiveTab] = useState('partograph');
  const [apgar1, setApgar1] = useState([2, 2, 1, 2, 2]);
  const [apgar5, setApgar5] = useState([2, 2, 2, 2, 2]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const logAction = useStore(state => state.logAction);

  const sumApgar = (arr) => arr.reduce((a, b) => a + b, 0);

  const handleBirthSubmit = async () => {
    setIsRegistering(true);
    await new Promise(r => setTimeout(r, 1200));
    logAction('BIRTH_REGISTERED', 'NEONATAL', { 
      mother: 'Mrs. Priya Sharma', 
      apgar1: sumApgar(apgar1), 
      apgar5: sumApgar(apgar5),
      babySex: 'Female'
    });
    setIsRegistering(false);
    setIsRegistered(true);
  };

  const getApgarColor = (score) => {
    if (score >= 7) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 4) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  if (isRegistered) {
    return (
      <div className="p-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl p-12 text-center">
          <div className="w-20 h-20 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-2">Birth Registered Successfully!</h3>
          <p className="text-slate-500 font-bold mb-8">Baby UHID has been generated and linked to the Mother's medical record. Birth certificate draft is ready for HOD signature.</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setIsRegistered(false)} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Back to Dashboard</button>
            <button className="px-8 py-3 bg-pink-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-pink-500/20 hover:bg-pink-700 transition-all">Print Certificate</button>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'partograph', label: 'Partograph / Labour Monitoring', icon: Activity },
    { id: 'apgar', label: 'APGAR Score', icon: Baby },
    { id: 'birth-reg', label: 'Birth Registration', icon: CheckCircle },
    { id: 'vaccination', label: 'Vaccination (BCG/Hep-B)', icon: Heart },
    { id: 'growth', label: 'Growth Tracking (WHO)', icon: Activity },
    { id: 'shield', label: 'Mother-Baby Security', icon: Shield },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Baby className="text-pink-500" size={28} />
            Neonatal &amp; Labour Care
          </h1>
          <p className="text-slate-500 text-sm mt-1">Partograph · APGAR Assessment · Birth Registration · Vaccination</p>
        </div>
        <button className="px-5 py-2.5 bg-pink-600 text-white rounded-xl text-sm font-black hover:bg-pink-700 shadow-lg shadow-pink-500/30 flex items-center gap-2">
          <Plus size={16} /> Admit Labour Patient
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={clsx('flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all',
              activeTab === tab.id ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50')}>
            <tab.icon size={15} />{tab.label}
          </button>
        ))}
      </div>

      {/* Partograph */}
      {activeTab === 'partograph' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-pink-50 flex items-center gap-3">
              <Activity className="text-pink-500" size={18} />
              <div>
                <h3 className="font-black text-slate-800">Partograph — Mrs. Priya Sharma</h3>
                <p className="text-[11px] text-slate-500">G2P1 · 39 weeks · Active Labour since 07:00 AM</p>
              </div>
            </div>
            <div className="p-6 overflow-x-auto">
              <div className="min-w-[600px]">
                {/* Simple visual partograph */}
                <div className="flex items-end gap-1 h-48 mb-4 bg-slate-50 rounded-xl p-4 relative border border-slate-200">
                  <div className="absolute left-4 top-4 text-[9px] font-black text-slate-400 uppercase">Cervical Dilation (cm)</div>
                  {partograph.map((entry, i) => (
                    <div key={i} className="flex flex-col items-center flex-1 gap-1">
                      <div className="relative w-full flex flex-col items-center justify-end" style={{ height: '140px' }}>
                        <div
                          className="w-full bg-pink-500 rounded-t transition-all"
                          style={{ height: `${(entry.cervix / 10) * 140}px` }}
                        />
                      </div>
                      <div className="text-[9px] font-bold text-slate-500">{entry.time}</div>
                      <div className="text-[11px] font-black text-pink-600">{entry.cervix} cm</div>
                    </div>
                  ))}
                </div>

                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border">
                    <tr>
                      <th className="px-4 py-2">Time</th>
                      <th className="px-4 py-2">Cervix (cm)</th>
                      <th className="px-4 py-2">FHR (bpm)</th>
                      <th className="px-4 py-2">Contractions/10min</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {partograph.map((entry, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-2 font-mono font-bold">{entry.time}</td>
                        <td className="px-4 py-2 font-black text-pink-600">{entry.cervix} cm</td>
                        <td className="px-4 py-2 font-bold text-slate-800">{entry.fhr} bpm</td>
                        <td className="px-4 py-2 font-bold text-slate-600">{entry.contractions}</td>
                        <td className="px-4 py-2">
                          {entry.cervix >= 10
                            ? <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[9px] font-black uppercase">Delivery Imminent</span>
                            : <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[9px] font-black uppercase">Active</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* APGAR Score Calculator */}
      {activeTab === 'apgar' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* 1-minute */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-black text-slate-800 mb-1 flex items-center gap-2">
                <Clock size={16} className="text-orange-500" /> APGAR at 1 Minute
              </h3>
              <div className={clsx('text-4xl font-black text-center my-4 py-3 rounded-xl border', getApgarColor(sumApgar(apgar1)))}>
                {sumApgar(apgar1)} / 10
              </div>
              <div className="space-y-3">
                {APGAR_CRITERIA.map((crit, ci) => (
                  <div key={ci}>
                    <div className="text-[10px] font-black text-slate-500 uppercase mb-1">{crit.name}</div>
                    <div className="flex gap-2">
                      {crit.options.map(opt => (
                        <button key={opt.score} onClick={() => setApgar1(p => { const n = [...p]; n[ci] = opt.score; return n; })}
                          className={clsx('flex-1 py-1.5 rounded-lg text-[10px] font-black border transition-all',
                            apgar1[ci] === opt.score ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400')}>
                          {opt.score} – {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5-minute */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-black text-slate-800 mb-1 flex items-center gap-2">
                <Clock size={16} className="text-green-500" /> APGAR at 5 Minutes
              </h3>
              <div className={clsx('text-4xl font-black text-center my-4 py-3 rounded-xl border', getApgarColor(sumApgar(apgar5)))}>
                {sumApgar(apgar5)} / 10
              </div>
              <div className="space-y-3">
                {APGAR_CRITERIA.map((crit, ci) => (
                  <div key={ci}>
                    <div className="text-[10px] font-black text-slate-500 uppercase mb-1">{crit.name}</div>
                    <div className="flex gap-2">
                      {crit.options.map(opt => (
                        <button key={opt.score} onClick={() => setApgar5(p => { const n = [...p]; n[ci] = opt.score; return n; })}
                          className={clsx('flex-1 py-1.5 rounded-lg text-[10px] font-black border transition-all',
                            apgar5[ci] === opt.score ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400')}>
                          {opt.score} – {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Birth Registration */}
      {activeTab === 'birth-reg' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <h3 className="font-black text-slate-800 text-lg">Birth Certificate Registration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase">Mother's UHID</label>
                <input type="text" placeholder="e.g. UHID-2026-0012" className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-pink-500/20" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase">Date & Time of Birth</label>
                <input type="datetime-local" className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-pink-500/20" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase">Baby's Sex</label>
                <select className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-pink-500/20">
                  <option>Male</option><option>Female</option><option>Indeterminate</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase">Birth Weight (grams)</label>
                <input type="number" placeholder="e.g. 3200" className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-pink-500/20" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase">Mode of Delivery</label>
                <select className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-pink-500/20">
                  <option>Normal Vaginal Delivery</option><option>Caesarean Section</option><option>Instrumental (Forceps/Vacuum)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase">Baby UHID (Auto-Generated)</label>
                <input type="text" placeholder="Auto-linked to Mother UHID" readOnly className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 cursor-not-allowed text-slate-400" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button 
                onClick={handleBirthSubmit}
                disabled={isRegistering}
                className={clsx(
                    "px-6 py-2.5 bg-pink-600 text-white rounded-xl font-black text-sm shadow-lg shadow-pink-500/30 hover:bg-pink-700 transition-all active:scale-95 disabled:opacity-50",
                    isRegistering && "animate-pulse"
                )}
              >
                {isRegistering ? 'GENERATING UHID...' : 'Register Birth & Generate UHID'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Vaccination */}
      {activeTab === 'vaccination' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-green-50 flex items-center gap-3">
              <Heart className="text-green-500" size={18} />
              <h3 className="font-black text-slate-800">At-Birth Vaccination Schedule</h3>
            </div>
            <div className="p-6 space-y-4">
              {[
                { vaccine: 'BCG (Bacillus Calmette-Guérin)', dose: '0.05 ml', route: 'Intradermal (Left arm)', timing: 'At Birth', status: 'Pending' },
                { vaccine: 'Hepatitis B (1st dose)', dose: '0.5 ml', route: 'Intramuscular (Thigh)', timing: 'Within 24 hours', status: 'Pending' },
                { vaccine: 'OPV-0 (Polio Drops)', dose: '2 drops', route: 'Oral', timing: 'At Birth', status: 'Pending' },
              ].map((v, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <div className="font-bold text-slate-900">{v.vaccine}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{v.dose} · {v.route} · {v.timing}</div>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white text-[10px] font-black uppercase rounded-xl hover:bg-green-700 shadow-sm">
                    Mark Given
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Growth Tracking (WHO Standards) */}
      {activeTab === 'growth' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
             <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                 <div className="px-8 py-6 border-b border-slate-100 bg-blue-50/30 flex justify-between items-center">
                     <div>
                         <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">WHO Growth Percentiles</h3>
                         <p className="text-[10px] font-black text-blue-500 uppercase">Age: 1 Week · Sex: Female</p>
                     </div>
                     <div className="flex gap-4 text-right">
                         <div><p className="text-[10px] font-black text-slate-400">Birth Weight</p><p className="text-sm font-black">3.2 kg</p></div>
                         <div><p className="text-[10px] font-black text-slate-400">Current Weight</p><p className="text-sm font-black text-blue-600">3.4 kg</p></div>
                     </div>
                 </div>
                 <div className="p-10">
                     <div className="h-64 bg-white border border-slate-100 rounded-3xl relative p-6">
                         <div className="w-full h-full border-l-2 border-b-2 border-slate-200 relative">
                             {/* Simulated Percentile Lines */}
                             <div className="absolute inset-x-0 bottom-[20%] h-px bg-slate-100" />
                             <div className="absolute inset-x-0 bottom-[50%] h-px bg-slate-100" />
                             <div className="absolute inset-x-0 bottom-[80%] h-px bg-slate-100" />
                             
                             {/* WHO 50th Percentile Curve */}
                             <svg className="absolute inset-0 w-full h-full overflow-visible">
                                <path d="M 0 200 Q 150 180 300 120" stroke="#94a3b8" fill="transparent" strokeWidth="2" strokeDasharray="5 5" />
                                <circle cx="150" cy="180" r="6" fill="#2563eb" stroke="white" strokeWidth="2" />
                             </svg>
                             <div className="absolute bottom-[-20px] left-0 text-[10px] text-slate-400 font-bold uppercase">Birth</div>
                             <div className="absolute bottom-[-20px] left-[50%] text-[10px] text-slate-400 font-bold uppercase translate-x-[-50%]">1 Week</div>
                             <div className="absolute bottom-[-20px] right-0 text-[10px] text-slate-400 font-bold uppercase">2 Weeks</div>
                         </div>
                     </div>
                     <p className="mt-8 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Velocity: Normal (50th Percentile)</p>
                 </div>
             </div>
        </motion.div>
      )}

      {/* Mother-Baby Security Pairing */}
      {activeTab === 'shield' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Shield size={120} className="text-emerald-500" />
                 </div>
                 <div className="flex items-center gap-6 mb-12">
                     <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-500">
                         <Shield size={32} />
                     </div>
                     <div>
                         <h3 className="text-2xl font-black tracking-tight">Biometric Pairing Protocol</h3>
                         <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">NFC/RFID Tag Monitoring System</p>
                     </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Mother Tag ID</p>
                           <div className="flex items-center justify-between">
                              <span className="text-white font-black font-mono">RFID-M-889012</span>
                              <span className="text-emerald-500 text-[10px] font-black uppercase flex items-center gap-1"><CheckCircle size={14} /> LINKED</span>
                           </div>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Baby Tag ID</p>
                           <div className="flex items-center justify-between">
                              <span className="text-white font-black font-mono">RFID-B-889012</span>
                              <span className="text-emerald-500 text-[10px] font-black uppercase flex items-center gap-1"><CheckCircle size={14} /> LINKED</span>
                           </div>
                        </div>
                    </div>
                    <div className="space-y-6 flex flex-col justify-center">
                        <div className="text-center p-8 border-2 border-dashed border-white/20 rounded-[3rem]">
                           <p className="text-xs font-medium text-slate-400 leading-relaxed italic mb-6">
                              "Safety check performed every 6 hours. Last verified by Sr. Anjali at 10:00 AM."
                           </p>
<button 
                               onClick={() => {
                                   logAction('MOTHER_BABY_TAG_VERIFIED', 'SECURITY', { motherTag: 'RFID-M-889012', babyTag: 'RFID-B-889012' });
                                   alert('Mother-Baby Tag Match Verified. Security Check Logged.');
                               }}
                               className="px-8 py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all"
                            >
                                Manual Verification Scan
                            </button>
                        </div>
                    </div>
                 </div>
             </div>
        </motion.div>
      )}
    </div>
  );
};

export default NeonatalCare;
