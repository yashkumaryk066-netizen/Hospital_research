import React, { useState } from 'react';
import {
  HeartPulse, AlertTriangle, Settings, Wind, Activity,
  Thermometer, Brain, TrendingUp, Clock, CheckSquare, X
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SURGICAL_CHECKLIST = {
  'Sign In (Before Anaesthesia)': [
    'Patient identity confirmed (name, DOB, UHID)',
    'Surgical site marked (if applicable)',
    'Anaesthesia machine and medications checked',
    'Known allergies confirmed',
    'Pulse oximeter functioning',
  ],
  'Time Out (Before Incision)': [
    'Team introductions completed',
    'Correct site, procedure and patient confirmed',
    'Antibiotic prophylaxis given within 60 min',
    'Imaging displayed (if relevant)',
    'Critical steps and blood availability reviewed',
  ],
  'Sign Out (Before Patient Leaves OT)': [
    'Procedure performed recorded correctly',
    'Instrument / sponge count confirmed',
    'Specimen labeled properly',
    'Equipment issues noted',
    'Recovery / ICU handover planned',
  ],
};

const ventData = [
  { time: '10:00', fio2: 40, peep: 5, pip: 18, vt: 450 },
  { time: '10:30', fio2: 45, peep: 6, pip: 20, vt: 460 },
  { time: '11:00', fio2: 50, peep: 6, pip: 22, vt: 470 },
  { time: '11:30', fio2: 45, peep: 5, pip: 19, vt: 455 },
  { time: '12:00', fio2: 40, peep: 5, pip: 18, vt: 450 },
];

const RASS_SCALE = [
  { score: '+4', label: 'Combative', color: 'bg-red-700 text-white' },
  { score: '+3', label: 'Very Agitated', color: 'bg-red-500 text-white' },
  { score: '+2', label: 'Agitated', color: 'bg-orange-500 text-white' },
  { score: '+1', label: 'Restless', color: 'bg-yellow-400 text-slate-900' },
  { score: '0',  label: 'Alert & Calm', color: 'bg-green-500 text-white' },
  { score: '-1', label: 'Drowsy', color: 'bg-blue-400 text-white' },
  { score: '-2', label: 'Light Sedation', color: 'bg-blue-500 text-white' },
  { score: '-3', label: 'Moderate Sedation', color: 'bg-blue-600 text-white' },
  { score: '-4', label: 'Deep Sedation', color: 'bg-blue-800 text-white' },
  { score: '-5', label: 'Unarousable', color: 'bg-slate-900 text-white' },
];

const OTICUManagement = () => {
  const [activeTab, setActiveTab] = useState('checklist');
  const [checklistState, setChecklistState] = useState({});
  const [selectedRass, setSelectedRass] = useState('0');

  const toggleCheck = (section, item) => {
    const key = `${section}|${item}`;
    setChecklistState(p => ({ ...p, [key]: !p[key] }));
  };

  const totalItems = Object.values(SURGICAL_CHECKLIST).reduce((a, b) => a + b.length, 0);
  const checkedItems = Object.values(checklistState).filter(Boolean).length;

  const tabs = [
    { id: 'checklist', label: 'WHO Safety Checklist', icon: CheckSquare },
    { id: 'ventilator', label: 'Ventilator Settings (ICU)', icon: Wind },
    { id: 'rass', label: 'RASS Score', icon: Brain },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <HeartPulse className="text-indigo-600" size={28} />
            OT &amp; ICU Critical Care Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">WHO Surgical Checklist · Ventilator Settings · RASS Score · Fluid Balance</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 flex gap-2 flex-wrap">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={clsx('flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all',
              activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50')}>
            <tab.icon size={15} />{tab.label}
          </button>
        ))}
      </div>

      {/* WHO Surgical Checklist */}
      {activeTab === 'checklist' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <div>
              <h3 className="font-black text-indigo-900">WHO Surgical Safety Checklist</h3>
              <p className="text-indigo-700 text-xs">Patient: Arun Verma · Procedure: Right Knee Arthroplasty · OT-2</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-indigo-700">{checkedItems} / {totalItems}</div>
              <div className="text-[10px] text-indigo-500 font-bold uppercase">Items Confirmed</div>
            </div>
          </div>

          {Object.entries(SURGICAL_CHECKLIST).map(([phase, items]) => (
            <div key={phase} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className={clsx('px-6 py-3 flex items-center justify-between',
                phase.includes('Sign In') ? 'bg-blue-50' : phase.includes('Time Out') ? 'bg-orange-50' : 'bg-green-50'
              )}>
                <h4 className={clsx('font-black text-sm',
                  phase.includes('Sign In') ? 'text-blue-800' : phase.includes('Time Out') ? 'text-orange-800' : 'text-green-800'
                )}>{phase}</h4>
                <span className={clsx('text-[10px] font-black uppercase px-2 py-0.5 rounded',
                  phase.includes('Sign In') ? 'bg-blue-100 text-blue-700' : phase.includes('Time Out') ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                )}>
                  {items.filter(item => checklistState[`${phase}|${item}`]).length} / {items.length}
                </span>
              </div>
              <div className="p-4 space-y-2">
                {items.map(item => (
                  <label key={item} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={!!checklistState[`${phase}|${item}`]}
                      onChange={() => toggleCheck(phase, item)}
                      className="w-5 h-5 rounded accent-indigo-600 cursor-pointer"
                    />
                    <span className={clsx('text-sm font-medium transition-colors',
                      checklistState[`${phase}|${item}`] ? 'text-slate-400 line-through' : 'text-slate-700 group-hover:text-slate-900')}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Ventilator Settings */}
      {activeTab === 'ventilator' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'FiO₂ (%)', value: '45', status: 'stable', limit: '≤60%' },
              { label: 'PEEP (cmH₂O)', value: '6', status: 'stable', limit: '5-8' },
              { label: 'Peak IP (cmH₂O)', value: '22', status: 'warning', limit: '<30' },
              { label: 'Tidal Volume (ml)', value: '470', status: 'stable', limit: '6 ml/kg IBW' },
            ].map(v => (
              <div key={v.label} className={clsx('p-5 rounded-2xl border-2',
                v.status === 'warning' ? 'border-orange-300 bg-orange-50' : 'border-slate-200 bg-white')}>
                <div className="text-[10px] font-black text-slate-400 uppercase">{v.label}</div>
                <div className={clsx('text-3xl font-black mt-1', v.status === 'warning' ? 'text-orange-600' : 'text-slate-800')}>{v.value}</div>
                <div className="text-[9px] text-slate-400 mt-1 font-bold">Target: {v.limit}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2"><Wind size={16} className="text-blue-500" /> 6-Hour Ventilator Trend</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ventData}>
                  <defs>
                    <linearGradient id="peep" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,.10)' }} />
                  <Area type="monotone" dataKey="pip" stroke="#6366F1" strokeWidth={2} fill="url(#peep)" name="Peak Pressure" />
                  <Area type="monotone" dataKey="peep" stroke="#10B981" strokeWidth={2} fill="none" name="PEEP" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* RASS Score */}
      {activeTab === 'rass' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2"><Brain size={16} className="text-indigo-500" /> RASS (Richmond Agitation-Sedation Scale)</h3>
              <div className="space-y-2">
                {RASS_SCALE.map(r => (
                  <button key={r.score} onClick={() => setSelectedRass(r.score)}
                    className={clsx('w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all',
                      selectedRass === r.score ? `${r.color} border-transparent scale-[1.02] shadow-lg` : 'bg-white border-slate-100 hover:border-slate-300')}>
                    <span className={clsx('text-lg font-black w-8 text-center tabular-nums', selectedRass === r.score ? '' : 'text-slate-700')}>
                      {r.score}
                    </span>
                    <span className={clsx('text-sm font-bold', selectedRass === r.score ? '' : 'text-slate-700')}>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h4 className="font-black text-slate-800 mb-4">Current ICU Patient Scores</h4>
              <div className="space-y-3">
                {[
                  { name: 'Sarah Connor', bed: 'ICU-1', rass: '0', alert: false },
                  { name: 'Arun Kumar', bed: 'ICU-2', rass: '-3', alert: true },
                  { name: 'Ellen Ripley', bed: 'ICU-3', rass: '+2', alert: true },
                ].map(pt => {
                  const cfg = RASS_SCALE.find(r => r.score === pt.rass);
                  return (
                    <div key={pt.bed} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{pt.name}</div>
                        <div className="text-[10px] text-slate-400">{pt.bed}</div>
                      </div>
                      <span className={clsx('px-3 py-1 rounded-full text-[10px] font-black', cfg?.color || 'bg-slate-200 text-slate-700')}>
                        RASS {pt.rass} — {cfg?.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OTICUManagement;
