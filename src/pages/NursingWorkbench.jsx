import React, { useState } from 'react';
import useStore from '../store/useStore';
import { 
  Clipboard, Activity, Thermometer, Droplets, Pill, 
  Plus, Search, Clock, CheckCircle, AlertTriangle, User,
  ArrowRight, FileText, Wind
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const patients = [
  { id: 'ADM-001', name: 'Ramesh Verma', bed: 'ICU-B1', status: 'Stable', diet: 'Soft Diet', allergies: 'Penicillin' },
  { id: 'ADM-002', name: 'Sita Devi', bed: 'Ward-A4', status: 'Critical', diet: 'Liquid Diet / NBM', allergies: 'None' },
  { id: 'ADM-003', name: 'John Doe', bed: 'ICU-B2', status: 'Stable', diet: 'Diabetic Diet', allergies: 'Sulfonamides' },
];

const NursingWorkbench = () => {
  const [activeTab, setActiveTab] = useState('mar');
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [privacyMode, setPrivacyMode] = useState(false);
  const logAction = useStore(state => state.logAction);

  const tabs = [
    { id: 'mar', label: 'MAR (Medication Admin)', icon: Pill },
    { id: 'vitals', label: 'Bedside Vitals', icon: Activity },
    { id: 'diet', label: 'Dietary Control', icon: Wind },
    { id: 'io', label: 'Intake / Output', icon: Droplets },
    { id: 'notes', label: 'Nursing Notes', icon: Clipboard },
    { id: 'handover', label: 'Shift Handover', icon: ArrowRight },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Clipboard size={28} className="text-blue-600" />
            Nursing Workbench
          </h1>
          <p className="text-slate-500 text-sm mt-1">Bedside Charts · MAR · Intake/Output · Nursing Notes</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setPrivacyMode(!privacyMode)}
             className={clsx(
               "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
               privacyMode ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-400 border-slate-200"
             )}
           >
              {privacyMode ? 'DISABLE PRIVACY' : 'ENABLE PRIVACY'}
           </button>
        </div>
      </div>

      {/* Patient Selection Bar */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {patients.map(p => (
          <button 
            key={p.id} 
            onClick={() => setSelectedPatient(p)}
            className={clsx(
              'flex-shrink-0 flex items-center gap-3 p-4 rounded-2xl border-2 transition-all',
              selectedPatient.id === p.id 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400'
            )}
          >
            <div className={clsx('w-10 h-10 rounded-full flex items-center justify-center font-black', selectedPatient.id === p.id ? 'bg-white/20' : 'bg-slate-100')}>
              {p.bed.split('-')[1]}
            </div>
            <div className="text-left">
              <p className="text-sm font-black">{privacyMode ? `BED ${p.bed.split('-')[1]}` : p.name}</p>
              <p className={clsx('text-[10px] font-bold uppercase', selectedPatient.id === p.id ? 'text-blue-100' : 'text-slate-400')}>
                {p.bed} · {p.status}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Patient Info Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap gap-8 items-center">
        <div className="flex items-center gap-2">
           <User size={16} className="text-slate-400" />
           <span className="text-[10px] font-black text-slate-400 uppercase">UHID:</span>
           <span className="text-xs font-bold text-slate-700">UHID-2024-0012</span>
        </div>
        <div className="flex items-center gap-2">
           <AlertTriangle size={16} className="text-red-500" />
           <span className="text-[10px] font-black text-slate-400 uppercase">Allergies:</span>
           <span className="text-xs font-bold text-red-600">{selectedPatient.allergies}</span>
        </div>
        <div className="flex items-center gap-2">
           <FileText size={16} className="text-slate-400" />
           <span className="text-[10px] font-black text-slate-400 uppercase">Diet:</span>
           <span className="text-xs font-bold text-slate-700">{selectedPatient.diet}</span>
        </div>
      </div>

      {/* Logic Tabs */}
      <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={clsx('flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all',
              activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50')}>
            <tab.icon size={15} />{tab.label}
          </button>
        ))}
      </div>

      {/* Content Panels */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab + selectedPatient.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {activeTab === 'mar' && <MARComponent patient={selectedPatient} />}
          {activeTab === 'vitals' && <BedsideVitals patient={selectedPatient} />}
          {activeTab === 'diet' && <DietComponent patient={selectedPatient} />}
          {activeTab === 'io' && <IntakeOutputComponent patient={selectedPatient} />}
          {activeTab === 'notes' && <NursingNotesComponent patient={selectedPatient} />}
          {activeTab === 'handover' && <HandoverComponent patient={selectedPatient} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Sub-Components ─────────────────────────────────────────────────────────

const DietComponent = ({ patient }) => {
  const meals = [
    { title: 'Breakfast', order: 'Oats & Milk', status: 'Delivered', time: '08:30 AM' },
    { title: 'Lunch', order: 'Soft Rice & Dal', status: 'Pre-Order Sent', time: '01:00 PM' },
    { title: 'Evening Tea', order: 'Suji Rusk', status: 'Scheduled', time: '04:30 PM' },
    { title: 'Dinner', order: 'Clear Soup', status: 'Scheduled', time: '08:00 PM' },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-1">Dietary Management</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Kitchen System Sync Active
          </p>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
           <p className="text-[9px] font-black text-blue-400 uppercase leading-none">Status: <br/> <span className="text-xs text-blue-700">{patient.diet}</span></p>
           <button 
              onClick={() => alert(`Modify Diet for ${patient.name}. Options: NBM, Soft, Liquid, Diabetic.`)}
              className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase rounded-xl"
           >
            Modify Diet
           </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100 p-4">
        {meals.map((m, i) => (
          <div key={i} className="p-6 space-y-4 hover:bg-slate-50 transition-all rounded-[2rem]">
             <div className="flex justify-between items-start">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.title}</p>
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-300">
                    <Clock size={14} />
                </div>
             </div>
             <div>
                <p className="text-sm font-black text-slate-800">{m.order}</p>
                <p className="text-[10px] font-bold text-slate-400">{m.time}</p>
             </div>
             <div className={clsx(
                'inline-flex px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border',
                m.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                m.status === 'Pre-Order Sent' ? 'bg-blue-50 text-blue-600 border-blue-100 animate-pulse' : 'bg-slate-50 text-slate-400 border-slate-100'
             )}>
                {m.status}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HandoverComponent = ({ patient }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
       <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-8">
             <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                 <h3 className="text-xl font-black text-slate-800 tracking-tight">Shift Handover Protocol (SBAR)</h3>
                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={14} className="text-blue-500" /> Sr. Anjali → Sr. Mary
                 </div>
             </div>

             <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Situation (S)</label>
                       <div className="bg-slate-50 p-4 rounded-3xl text-sm font-medium text-slate-700 italic border-l-4 border-blue-600">
                          {patient.name} admitted with c/o severe chest pain (Atypical). Currently stable on Meds.
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Background (B)</label>
                       <div className="bg-slate-50 p-4 rounded-3xl text-sm font-medium text-slate-700 border-l-4 border-slate-300">
                          History of HTN & DM-II. No previous CAD documented.
                       </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Assessment (A)</label>
                    <textarea 
                        className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 text-sm outline-none focus:ring-4 focus:ring-blue-500/10 min-h-[120px] resize-none"
                        defaultValue="Vitals: BP 130/80, HR 82. Pain Score: 2/10. IV Site healthy. Sleep adequate."
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Recommendation (R)</label>
                    <div className="bg-blue-600 p-6 rounded-[2rem] text-white space-y-3 shadow-xl shadow-blue-500/20">
                        <div className="flex items-center gap-2">
                           <AlertTriangle size={16} className="text-amber-300" />
                           <p className="text-xs font-black uppercase tracking-widest">Care Priorities for Next Shift</p>
                        </div>
                        <ul className="text-sm font-medium opacity-90 space-y-1 list-disc list-inside">
                           <li>Monitor BP every 2 hours</li>
                           <li>Pending Echo-cardiogram at 3 PM</li>
                           <li>Repeat ECG if patient complains of pain</li>
                        </ul>
                    </div>
                 </div>
             </div>
          </div>
       </div>

       <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-6">Security Check</h3>
             <p className="text-[10px] font-medium text-slate-400 leading-relaxed mb-8">
                Handovers must be signed by both nurses to authorize the transfer of care responsibility.
             </p>
             <div className="space-y-4">
                <input type="password" placeholder="ENTER SIGN-OFF PIN" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-center text-xs font-black text-blue-400 tracking-[0.3em] outline-none" />
                <button 
                  onClick={() => {
                    useStore.getState().logAction('HANDOVER_SIGNED', 'NURSING', { 
                      patient: patient.name, 
                      uhid: 'UHID-2024-0012',
                      from: 'Sr. Anjali',
                      to: 'Sr. Mary'
                    });
                    alert('Handover Successful & Signed.');
                  }}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Sign & Handover
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

// ─── Sub-Components ─────────────────────────────────────────────────────────

const MARComponent = ({ patient }) => {
  const medications = [
    { id: 1, time: '08:00 AM', name: 'Inj. Ceftriaxone 1gm', route: 'I.V', frequency: 'BD', status: 'Given', nurse: 'Sr. Anjali', allergyClass: 'Penicillin/Cephalosporin' },
    { id: 2, time: '10:00 AM', name: 'Tab. Paracetamol 500mg', route: 'Oral', frequency: 'TDS / SOS', status: 'Due', nurse: '-', allergyClass: 'None' },
    { id: 3, time: '12:00 PM', name: 'Inj. Pantoprazole 40mg', route: 'I.V', frequency: 'OD', status: 'Due', nurse: '-', allergyClass: 'None' },
  ];

  const handleAdminister = (med) => {
    // CLIN-002: Allergy Check
    if (patient.allergies !== 'None' && med.allergyClass !== 'None' && med.allergyClass.toLowerCase().includes(patient.allergies.toLowerCase())) {
        if (!window.confirm(`⚠️ ALLERGY WARNING: Patient is allergic to ${patient.allergies}. This medication belongs to ${med.allergyClass}. DO YOU WANT TO OVERRIDE AND ADMINISTER?`)) {
            return;
        }
    }
    useStore.getState().logAction('MED_ADMINISTERED', 'MAR', { med: med.name, patient: patient.name });
    alert(`Medication ${med.name} administered successfully.`);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-blue-50/50">
        <h3 className="font-black text-blue-900 text-xs uppercase tracking-widest">Medication Administration Record (MAR)</h3>
        <button className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase rounded-lg flex items-center gap-1.5 shadow-md shadow-blue-500/20">
          <Plus size={12} /> Add Standing Order
        </button>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b">
          <tr>
            <th className="px-6 py-4">Scheduled Time</th>
            <th className="px-6 py-4">Medication & Dose</th>
            <th className="px-6 py-4">Route</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Nurse</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {medications.map(med => (
            <tr key={med.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 font-mono font-bold text-slate-700">{med.time}</td>
              <td className="px-6 py-4">
                <div className="font-bold text-slate-900">{med.name}</div>
                <div className="text-[10px] text-slate-400">{med.frequency}</div>
              </td>
              <td className="px-6 py-4"><span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-black">{med.route}</span></td>
              <td className="px-6 py-4">
                <span className={clsx('px-2 py-0.5 rounded text-[10px] font-black uppercase border', 
                  med.status === 'Given' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100')}>
                  {med.status}
                </span>
              </td>
              <td className="px-6 py-4 text-xs font-bold text-slate-600">{med.nurse}</td>
              <td className="px-6 py-4 text-right">
                {med.status === 'Due' && (
                  <button 
                    onClick={() => handleAdminister(med)}
                    className="px-3 py-1 bg-green-600 text-white text-[10px] font-black uppercase rounded-lg hover:bg-green-700 shadow-md"
                  >
                    Administer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BedsideVitals = ({ patient }) => {
    const vitals = [
        { label: 'Temp (°F)', val: '98.6', icon: Thermometer, color: 'text-orange-500', bg: 'bg-orange-50', min: 96, max: 100 },
        { label: 'Pulse (bpm)', val: '78', icon: Activity, color: 'text-pink-500', bg: 'bg-pink-50', min: 60, max: 100 },
        { label: 'Resp (pm)', val: '18', icon: Wind, color: 'text-blue-500', bg: 'bg-blue-50', min: 12, max: 20 },
        { label: 'SpO2 (%)', val: '98', icon: Activity, color: 'text-green-500', bg: 'bg-green-50', min: 94, max: 100 },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vitals.map(v => {
                const isAbnormal = parseFloat(v.val) < v.min || parseFloat(v.val) > v.max;
                return (
                    <div key={v.label} className={clsx('p-5 rounded-3xl border shadow-sm flex items-center justify-between transition-all', 
                        isAbnormal ? 'bg-red-50 border-red-200 animate-pulse' : 'bg-white border-slate-200')}>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{v.label}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <p className={clsx('text-3xl font-black', isAbnormal ? 'text-red-600' : 'text-slate-800')}>{v.val}</p>
                                <span className={clsx('text-[10px] font-bold px-1.5 py-0.5 rounded uppercase', 
                                    isAbnormal ? 'bg-red-600 text-white' : 'text-slate-400')}>
                                    {isAbnormal ? 'ABNORMAL' : 'NORMAL'}
                                </span>
                            </div>
                        </div>
                        <div className={clsx('w-12 h-12 rounded-2xl flex items-center justify-center', isAbnormal ? 'bg-red-100' : v.bg)}>
                            <v.icon size={24} className={isAbnormal ? 'text-red-600' : v.color} />
                        </div>
                    </div>
                );
            })}
            <div className="md:col-span-2 lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="font-black text-slate-800 text-sm mb-4">6-Hour Vital History</h4>
                <div className="h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-xs font-bold italic">
                    Vital Trend Chart for {patient.name} (Real-time Streaming)
                </div>
            </div>
        </div>
    );
};

const IntakeOutputComponent = ({ patient }) => {
  const logs = [
    { time: '08:00 AM', intake: '500ml (I.V)', output: '200ml (Urine)', balance: '+300ml', nurse: 'Sr. Anjali' },
    { time: '12:00 PM', intake: '200ml (Liquid)', output: '150ml (Urine)', balance: '+50ml', nurse: 'Sr. Mary' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 bg-blue-50/30 flex justify-between items-center">
        <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest">Intake / Output Chart</h3>
        <div className="flex gap-4">
           <div className="text-right">
             <p className="text-[9px] font-black text-slate-400 uppercase">Total Intake</p>
             <p className="text-sm font-black text-blue-600">700 ml</p>
           </div>
           <div className="text-right">
             <p className="text-[9px] font-black text-slate-400 uppercase">Total Output</p>
             <p className="text-sm font-black text-orange-600">350 ml</p>
           </div>
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b">
          <tr>
            <th className="px-6 py-4">Time</th>
            <th className="px-6 py-4 text-blue-600">Intake</th>
            <th className="px-6 py-4 text-orange-600">Output</th>
            <th className="px-6 py-4 font-black">Net Balance</th>
            <th className="px-6 py-4">Recorded By</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
           {logs.map((log, i) => (
             <tr key={i} className="hover:bg-slate-50/50 transition-colors">
               <td className="px-6 py-4 font-mono font-bold text-slate-700">{log.time}</td>
               <td className="px-6 py-4 font-bold text-slate-700">{log.intake}</td>
               <td className="px-6 py-4 font-bold text-slate-700">{log.output}</td>
               <td className="px-6 py-4 font-black text-blue-600">{log.balance}</td>
               <td className="px-6 py-4 text-xs font-bold text-slate-500">{log.nurse}</td>
             </tr>
           ))}
        </tbody>
      </table>
    </div>
  );
};

const NursingNotesComponent = ({ patient }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        {[
          { time: '12 Mar, 11:30 AM', nurse: 'Sr. Anjali', note: 'Patient complained of mild nausea. Temp checked: 98.6. Informed Dr. Sharma. Advised SOS medication given.' },
          { time: '12 Mar, 08:15 AM', nurse: 'Sr. Mary', note: 'Bed bath given. Position changed to prevent ulcers. Routine vitals stable. IV site checked - healthy.' },
        ].map((n, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative">
             <div className="flex items-center gap-2 mb-2">
               <span className="text-xs font-black text-blue-600">{n.nurse}</span>
               <span className="text-[10px] font-bold text-slate-300">• {n.time}</span>
             </div>
             <p className="text-sm text-slate-700 leading-relaxed font-medium">{n.note}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-fit sticky top-6">
        <h4 className="font-black text-slate-800 text-sm mb-4">Post New Note</h4>
        <textarea 
          rows={5} 
          placeholder="Type nursing observations here..."
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 resize-none mb-4"
        />
        <button className="w-full py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/30">
          Save Observation
        </button>
      </div>
    </div>
  );
};

export default NursingWorkbench;
