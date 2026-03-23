import React, { useState } from 'react';
import {
    Search,
    Activity,
    Calendar,
    Monitor,
    HardDrive,
    AlertCircle,
    Maximize2,
    Minimize2,
    ZoomIn,
    ZoomOut,
    Move,
    Sun,
    Type,
    Ruler,
    Grid,
    LayoutGrid,
    FileText,
    Mic,
    Save,
    Share2,
    X,
    ChevronDown,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    ArrowLeft,
    Clock,
    User
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

// --- Sub-Components ---

const PACSViewer = ({ study, onClose }) => {
    const [currentTool, setCurrentTool] = useState('pointer');
    const [aiVision, setAiVision] = useState(true);
    const [notified, setNotified] = useState(false);

    const tools = [
        { id: 'pointer', icon: Move, label: 'Pan' },
        { id: 'zoom', icon: ZoomIn, label: 'Zoom' },
        { id: 'window', icon: Sun, label: 'Window/Level' },
        { id: 'measure', icon: Ruler, label: 'Measure' },
        { id: 'text', icon: Type, label: 'Annotate' },
        { id: 'cine', icon: Play, label: 'Cine' },
    ];

    const series = [
        { id: 1, name: 'Scout', img: 'https://prod-images-static.radiopaedia.org/images/54652273/cb885232b7067981df265d929949db_jumbo.jpeg' },
        { id: 2, name: 'Axial T1', img: 'https://prod-images-static.radiopaedia.org/images/54652274/a97752674251785566671078768050_jumbo.jpeg' },
        { id: 3, name: 'Axial T2', img: 'https://prod-images-static.radiopaedia.org/images/54652275/036067086884803565076633633215_jumbo.jpeg' },
        { id: 4, name: 'Sagittal T1', img: 'https://prod-images-static.radiopaedia.org/images/54652276/755255428676233261642875151241_jumbo.jpeg' },
        { id: 5, name: 'Coronal T2', img: 'https://prod-images-static.radiopaedia.org/images/54652277/157297920786012484542845604104_jumbo.jpeg' },
        { id: 6, name: 'DWI', img: 'https://prod-images-static.radiopaedia.org/images/54652278/671032333061730043812836263546_jumbo.jpeg' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-[#020617] text-slate-300 flex flex-col font-sans overflow-hidden"
        >
            {/* Header */}
            <div className="h-16 border-b border-white/5 bg-[#0f172a] flex items-center justify-between px-6 shrink-0 shadow-2xl">
                <div className="flex items-center gap-6">
                    <button onClick={onClose} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <h2 className="text-white font-black text-sm uppercase tracking-widest">{study.patient}</h2>
                            <span className="px-1.5 py-0.5 bg-red-500/10 text-red-500 text-[8px] font-black rounded border border-red-500/20">{study.urgency}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-black flex gap-3 uppercase tracking-tighter">
                            <span>UID: {study.id}</span>
                            <span className="text-slate-700">•</span>
                            <span>{study.exam}</span>
                            <span className="text-slate-700">•</span>
                            <span className="text-blue-500">DICOM 3.0 OK</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="flex bg-slate-900 border border-white/5 rounded-xl p-1 gap-1 mr-4">
                        {tools.map(tool => (
                            <button 
                                key={tool.id} 
                                onClick={() => setCurrentTool(tool.id)} 
                                className={clsx("p-2 transition-all rounded-lg", currentTool === tool.id ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "hover:bg-white/5 text-slate-500")}
                                title={tool.label}
                            >
                                <tool.icon size={18} />
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => setAiVision(!aiVision)}
                        className={clsx(
                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                            aiVision ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30" : "bg-white/5 text-slate-500 border border-white/10"
                        )}
                    >
                        <Activity size={14} /> AI VISION {aiVision ? 'ON' : 'OFF'}
                    </button>
                </div>
            </div>

            {/* Viewer Grid */}
            <div className="flex-1 flex overflow-hidden">
                <div className="w-24 bg-[#020617] border-r border-white/5 flex flex-col gap-3 p-3 overflow-y-auto shrink-0 scrollbar-none">
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1 text-center font-mono">Series</p>
                    {series.map(s => (
                        <div key={s.id} className="aspect-square bg-slate-900 rounded-xl cursor-pointer relative group overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all">
                            <img src={s.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100" alt="" />
                            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-[8px] text-center font-black">{s.name}</div>
                        </div>
                    ))}
                </div>
                
                <div className="flex-1 bg-black flex items-center justify-center relative select-none">
                    <img src={series[1].img} alt="" className="max-h-full max-w-full opacity-90 shadow-[0_0_100px_rgba(30,58,138,0.2)]" />
                    
                    {/* AI DETECTION OVERLAY */}
                    <AnimatePresence>
                        {aiVision && (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 pointer-events-none"
                            >
                                {/* Mock Detection Box 1 */}
                                <div className="absolute top-[35%] left-[42%] w-[12%] h-[15%] border-2 border-purple-500 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] flex flex-col items-start translate-x-[-50%] translate-y-[-50%]">
                                     <div className="bg-purple-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-br-lg">Nodule (88%)</div>
                                </div>
                                {/* Mock Detection Box 2 */}
                                <div className="absolute bottom-[28%] right-[38%] w-[18%] h-[22%] border-2 border-blue-500/40 rounded-[2rem] border-dashed" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Corner Metadata Overlay */}
                    <div className="absolute top-8 left-8 text-blue-400 font-mono text-[10px] space-y-1 drop-shadow-lg opacity-80">
                        <p className="font-black text-white">PROTECTED PHI - {study.id}</p>
                        <p>ID: {study.id}</p>
                        <p>ACC: 899122310</p>
                        <p>KV: 120 | mAs: 15.2</p>
                    </div>
                    <div className="absolute bottom-8 right-8 text-blue-400 font-mono text-[10px] space-y-1 text-right opacity-80">
                        <p>WW: 400 | WL: 40</p>
                        <p>ZOOM: 1.2x | ANGLE: 0.0°</p>
                        <p>SLICE: 42/112</p>
                        <p className="text-emerald-500 font-black">BIT DEPTH: 16-BIT</p>
                    </div>
                </div>

                {/* Professional Report Panel */}
                <div className="w-96 bg-[#0f172a] border-l border-white/5 p-8 flex flex-col gap-10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
                    <div>
                        <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                             <div className="w-1 h-3 bg-blue-500 rounded-full" /> Diagnostic Report
                        </h3>
                        <div className="space-y-6">
                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Findings</p>
                                <textarea 
                                    className="w-full bg-transparent border-none text-slate-300 text-sm font-medium p-0 outline-none resize-none min-h-[180px] scrollbar-none" 
                                    placeholder="Enter clinical findings... (AI auto-filling enabled)"
                                    defaultValue={aiVision ? "AI Detected: 1.2cm hyperdense nodule in the left upper lobe. Recommended: Contrast-enhanced study for further characterization." : ""}
                                ></textarea>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                                    <Mic className="text-red-500 mb-2 group-hover:scale-110 transition-all" size={20} />
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Dictate</p>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                                    <Save className="text-blue-500 mb-2" size={20} />
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Draft</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto space-y-4">
                        <button 
                            onClick={() => {
                                logAction('CRITICAL_RADIOLOGY_FINDING_FLAGGED', 'RADIOLOGY', { studyId: study.id });
                                setNotified(true);
                            }}
                            className={clsx(
                                "w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-2xl transform active:scale-95",
                                notified ? "bg-emerald-600 text-white" : "bg-rose-600 text-white shadow-rose-500/20"
                            )}
                        >
                            {notified ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                            {notified ? 'Physician Notified' : 'Flag Critical Finding'}
                        </button>
                        <button 
                            onClick={() => {
                                logAction('RADIOLOGY_REPORT_FINALIZED', 'RADIOLOGY', { studyId: study.id });
                                onClose();
                            }}
                            className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition-all">
                             Finalize & Sign Report
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const SchedulingView = () => {
    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
    const rooms = [
        { id: 'MRI-1', name: 'MRI Room 1 (3T)', type: 'MRI' },
        { id: 'CT-1', name: 'CT Room 1 (128 Slice)', type: 'CT' },
        { id: 'USG-1', name: 'Ultrasound Room 1', type: 'USG' },
    ];

    const appointments = [
        { id: 1, room: 'MRI-1', time: '09:00', patient: 'Jim Halpert', exam: 'MRI Knee', status: 'Checked In' },
        { id: 2, room: 'CT-1', time: '10:00', patient: 'Dwight Schrute', exam: 'CT Abdomen', status: 'Scheduled' },
        { id: 3, room: 'USG-1', time: '09:00', patient: 'Pam Beesly', exam: 'USG Obs', status: 'Completed' },
    ];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-700">Modality Schedule (Today)</h3>
                <button className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded">+ Book Slot</button>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="grid grid-cols-[100px_1fr] divide-x divide-slate-200">
                    <div className="bg-slate-50"></div> {/* Header Corner */}
                    <div className="grid grid-cols-3 divide-x divide-slate-200 bg-slate-50">
                        {rooms.map(room => (
                            <div key={room.id} className="p-3 text-center">
                                <span className="block text-xs font-bold text-slate-800">{room.name}</span>
                                <span className="block text-[10px] text-slate-500">{room.type}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="divide-y divide-slate-200">
                    {timeSlots.map(time => (
                        <div key={time} className="grid grid-cols-[100px_1fr] divide-x divide-slate-200 min-h-[80px]">
                            <div className="p-3 text-xs font-bold text-slate-500 bg-slate-50 flex items-center justify-center border-r border-slate-200">
                                {time}
                            </div>
                            <div className="grid grid-cols-3 divide-x divide-slate-200 relative">
                                {rooms.map(room => {
                                    const appt = appointments.find(a => a.room === room.id && a.time === time);
                                    return (
                                        <div key={room.id} className="p-1 relative group hover:bg-slate-50 transition-colors">
                                            {appt ? (
                                                <div className={clsx(
                                                    "h-full rounded p-2 text-xs border cursor-pointer transition-all shadow-sm",
                                                    appt.status === 'Completed' ? "bg-green-50 border-green-200 text-green-800" :
                                                        appt.status === 'Checked In' ? "bg-blue-50 border-blue-200 text-blue-800" :
                                                            "bg-white border-slate-200 text-slate-800 border-l-4 border-l-orange-400"
                                                )}>
                                                    <div className="font-bold truncate">{appt.patient}</div>
                                                    <div className="truncate opacity-75">{appt.exam}</div>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <button className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded hover:bg-slate-200 font-bold">Book</button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Radiology = () => {
    const [activeTab, setActiveTab] = useState('worklist'); // worklist, scheduling
    const [selectedStudy, setSelectedStudy] = useState(null);
    const logAction = useStore(state => state.logAction);

    const worklist = [
        { id: 'RAD-001', patient: 'Michael Scott', age: 45, exam: 'CT Brain Plain', status: 'Ready to Report', urgency: 'Stat' },
        { id: 'RAD-002', patient: 'Jim Halpert', age: 36, exam: 'MRI Knee Left', status: 'Image Acquired', urgency: 'Routine' },
        { id: 'RAD-003', patient: 'Pam Beesly', age: 34, exam: 'USG Abdomen', status: 'Scheduled', urgency: 'Routine' },
    ];

    return (
        <div className="space-y-6">
            <AnimatePresence>
                {selectedStudy && (
                    <PACSViewer study={selectedStudy} onClose={() => setSelectedStudy(null)} />
                )}
            </AnimatePresence>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Radiology Information System (RIS)</h1>
                    <p className="text-slate-500 text-sm mt-1">Workstation: RAD-Station-04 • Dr. Sarah Wilson</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button onClick={() => setActiveTab('worklist')} className={clsx("px-4 py-1.5 text-sm font-bold rounded-md transition-all", activeTab === 'worklist' ? "bg-white shadow-sm text-primary" : "text-slate-500")}>Worklist</button>
                    <button onClick={() => setActiveTab('scheduling')} className={clsx("px-4 py-1.5 text-sm font-bold rounded-md transition-all", activeTab === 'scheduling' ? "bg-white shadow-sm text-primary" : "text-slate-500")}>Scheduling</button>
                </div>
            </div>

            {/* Main Content Switcher */}
            {activeTab === 'worklist' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard title="Studies Today" value="45" trend="up" trendValue="12%" icon={Activity} color="bg-blue-500" />
                        <StatCard title="Pending Reports" value="8" trend="down" trendValue="2" icon={Calendar} color="bg-orange-500" />
                        <StatCard title="Storage Used" value="82%" trend="up" trendValue="1%" icon={HardDrive} color="bg-slate-500" />
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <h3 className="font-bold text-slate-700">Technologist Worklist</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input type="text" placeholder="Search Accession #" className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg w-64 shadow-sm" />
                            </div>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3">Accession #</th>
                                    <th className="px-6 py-3">Patient</th>
                                    <th className="px-6 py-3">Exam</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Urgency</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {worklist.map(item => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedStudy(item)}>
                                        <td className="px-6 py-4 font-mono font-medium text-slate-600">{item.id}</td>
                                        <td className="px-6 py-4 font-bold text-slate-900">{item.patient}</td>
                                        <td className="px-6 py-4">{item.exam}</td>
                                        <td className="px-6 py-4">
                                            <span className={clsx("px-2 py-1 rounded-full text-xs font-bold border",
                                                item.status === 'Ready to Report' ? "bg-green-50 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200"
                                            )}>{item.status}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.urgency === 'Stat'
                                                ? <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-100 flex w-fit items-center gap-1"><AlertCircle size={12} /> STAT</span>
                                                : <span className="text-slate-500">Routine</span>
                                            }
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 shadow-sm flex items-center gap-1 ml-auto">
                                                <Monitor size={12} /> Launch
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <SchedulingView />
                </motion.div>
            )}
        </div>
    );
};

export default Radiology;
