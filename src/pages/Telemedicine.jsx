import React, { useState } from 'react';
import {
    Video,
    Mic,
    MicOff,
    VideoOff,
    PhoneOff,
    MessageSquare,
    FileText,
    User,
    Info,
    Paperclip,
    Send,
    X,
    Clock,
    Check,
    Wifi
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const Telemedicine = () => {
    const [activeCall, setActiveCall] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [showChat, setShowChat] = useState(true);
    const [ehrOverlay, setEhrOverlay] = useState(false);
    const logAction = useStore(state => state.logAction);

    if (!activeCall) {
        return (
            <div className="min-h-[85vh] p-8 space-y-10 animate-fade-in bg-slate-50/50 rounded-[3rem]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-left">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/20">Live System</div>
                            <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Unified Video Engine Active
                            </div>
                        </div>
                        <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Tele-Health Control Center</h1>
                        <p className="text-slate-500 dark:text-slate-400 max-w-lg mt-3 font-medium">
                            Execute HIPAA-compliant video consultations with integrated EHR synchronization 
                            and automated e-Pharmacy dispensing.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-4 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                        <div className="text-right">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1 mb-1">Queue Status</p>
                           <p className="text-2xl font-black text-slate-800 dark:text-white">04 <span className="text-xs font-bold text-slate-400">Waiting</span></p>
                        </div>
                        <div className="w-px h-10 bg-slate-100 dark:bg-slate-800" />
                        <button className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
                             <MessageSquare size={24} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Active Queue */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Patient Priority Queue</h3>
                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Refresh List</button>
                        </div>
                        
                        <div className="space-y-4">
                            {[
                                { name: 'John Doe', type: 'Follow-up (Post Op)', time: '10:30 AM', status: 'Ready', color: 'purple' },
                                { name: 'Mary Jane', type: 'New Consultation', time: '11:00 AM', status: 'In Waiting', color: 'blue' },
                                { name: 'Steve Rogers', type: 'Chronic Medicine Refill', time: '11:15 AM', status: 'Pending Pay', color: 'emerald' },
                            ].map((patient, i) => (
                                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-6 transition-all group hover:border-blue-500/30">
                                    <div className="flex items-center gap-6">
                                        <div className={clsx(
                                            "w-16 h-16 rounded-3xl flex items-center justify-center font-black text-xl shadow-lg",
                                            patient.color === 'purple' ? "bg-purple-100 text-purple-600 shadow-purple-500/10" :
                                            patient.color === 'blue' ? "bg-blue-100 text-blue-600 shadow-blue-500/10" : "bg-emerald-100 text-emerald-600 shadow-emerald-500/10"
                                        )}>{patient.name.split(' ').map(n => n[0]).join('')}</div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-xl font-black text-slate-800 dark:text-white">{patient.name}</h4>
                                                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[9px] font-black uppercase rounded-lg">#PAT-9912</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                <span className="flex items-center gap-1"><Clock size={12} /> {patient.time}</span>
                                                <span className="flex items-center gap-1 text-blue-500 italic lowercase normal-case">{patient.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl hover:bg-emerald-50 hover:text-emerald-500 transition-all" title="Invite via WhatsApp">
                                             <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5 opacity-40 group-hover:opacity-100" alt="WA" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                logAction('TELEMED_SESSION_STARTED', 'TELEMEDICINE', { patientId: 'PAT-9912' });
                                                setActiveCall(true);
                                            }}
                                            className={clsx(
                                                "px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-xl",
                                                patient.status === 'Ready' ? "bg-blue-600 text-white shadow-blue-500/30 hover:scale-105" : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                            )}
                                        >
                                            <Video size={18} /> Connect Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Tools & Policy */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                           <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-8 border-b border-white/10 pb-4">Device Diagnostics</h3>
                           <div className="space-y-6">
                               <div className="flex justify-between items-center px-4 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md transition-all group-hover:border-white/20">
                                   <div className="flex items-center gap-3 text-slate-300">
                                       <Video size={18} className="text-blue-400" /> <span className="text-[10px] font-black uppercase tracking-widest">4K Camera</span>
                                   </div>
                                   <span className="text-emerald-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1"><Check size={12} /> READY</span>
                               </div>
                               <div className="flex justify-between items-center px-4 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                                   <div className="flex items-center gap-3 text-slate-300">
                                       <Wifi size={18} className="text-blue-400" /> <span className="text-[10px] font-black uppercase tracking-widest">Latency (12ms)</span>
                                   </div>
                                   <span className="text-emerald-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1"><Check size={12} /> EXCELLENT</span>
                               </div>
                           </div>
                           <p className="mt-12 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-relaxed text-center">
                              HIPAA Sealed • TLS 1.3 Encryption<br/>Auto-Scribe AI Ready
                           </p>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[3rem] p-10 text-white shadow-2xl shadow-blue-500/20">
                            <h3 className="text-xl font-black mb-4">Patient UX Portal</h3>
                            <p className="text-indigo-100 text-xs font-medium leading-relaxed mb-8 opacity-80">
                                WhatsApp notifications sent automatically to patients with unique join links. 
                                No login required for patients.
                            </p>
                            <button 
                                onClick={() => {
                                    logAction('TELEMED_REMINDER_SENT', 'TELEMEDICINE', { method: 'Manual' });
                                    alert('Secure patient join link re-sent via SMS/WhatsApp.');
                                }}
                                className="w-full py-4 bg-white/10 border border-white/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                                Send Manual Reminder
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-100px)] flex gap-4 overflow-hidden relative">
            {/* Main Video Area */}
            <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden relative flex flex-col shadow-2xl shadow-black/50">
                {/* Main Feed (Patient) */}
                <div className="flex-1 relative">
                    <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=2788&ixlib=rb-4.0.3"
                        alt="Patient"
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute top-4 left-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-2 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        REC 04:23
                    </div>
                    <div className="absolute bottom-4 left-4 text-white text-lg font-bold drop-shadow-md bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
                        John Doe (Patient)
                    </div>

                    {/* Review Panel Overlay (Draggable placeholder) */}
                    <div className="absolute top-4 right-4 w-64 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-lg p-4 shadow-xl border border-white/20 dark:border-white/10">
                        <h4 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Vitals (Live)</h4>
                        <div className="grid grid-cols-2 gap-2 text-center">
                            <div className="bg-slate-100 dark:bg-slate-800 rounded p-1 border border-slate-200 dark:border-slate-700">
                                <div className="text-lg font-bold text-slate-800 dark:text-white">72</div>
                                <div className="text-[10px] text-slate-400">BPM</div>
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-800 rounded p-1 border border-slate-200 dark:border-slate-700">
                                <div className="text-lg font-bold text-slate-800 dark:text-white">98%</div>
                                <div className="text-[10px] text-slate-400">SpO2</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls Bar */}
                <div className="h-24 bg-slate-900/90 backdrop-blur border-t border-slate-800 flex items-center justify-center gap-6 px-6">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={clsx("p-4 rounded-full transition-all border border-transparent",
                            isMuted ? "bg-red-500 text-white shadow-lg shadow-red-500/30" : "bg-slate-800 text-white hover:bg-slate-700 border-slate-700 hover:border-slate-600"
                        )}
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>
                    <button
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={clsx("p-4 rounded-full transition-all border border-transparent",
                            isVideoOff ? "bg-red-500 text-white shadow-lg shadow-red-500/30" : "bg-slate-800 text-white hover:bg-slate-700 border-slate-700 hover:border-slate-600"
                        )}
                        title={isVideoOff ? "Turn Video On" : "Turn Video Off"}
                    >
                        {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                    </button>
                    <button
                        onClick={() => {
                            logAction('TELEMED_SESSION_ENDED', 'TELEMEDICINE', { duration: '04:23' });
                            setActiveCall(false);
                        }}
                        className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all shadow-lg shadow-red-600/40 transform hover:scale-105"
                        title="End Call"
                    >
                        <PhoneOff size={24} />
                    </button>
                    <button
                        onClick={() => setShowChat(!showChat)}
                        className={clsx("p-4 rounded-full transition-all ml-4 border border-transparent",
                            showChat ? "bg-primary text-white shadow-lg shadow-blue-500/30" : "bg-slate-800 text-white hover:bg-slate-700 border-slate-700 hover:border-slate-600"
                        )}
                        title="Chat"
                    >
                        <MessageSquare size={24} />
                    </button>
                </div>
            </div>

            {/* Side Panel (Chat / Records) */}
            {showChat && (
                <div className="w-80 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col transition-colors">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 rounded-t-xl">
                        <h3 className="font-bold text-slate-700 dark:text-slate-200">Consultation Notes</h3>
                        <button onClick={() => setShowChat(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={18} /></button>
                    </div>

                    {/* Tabs placeholder */}
                    <div className="flex border-b border-slate-100 dark:border-slate-800">
                        <button className="flex-1 py-3 text-sm font-bold text-primary border-b-2 border-primary bg-blue-50/50 dark:bg-blue-900/10">Chat</button>
                        <button className="flex-1 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">History</button>
                        <button className="flex-1 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">Labs</button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 dark:bg-black/10 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-300 shrink-0 border border-blue-200 dark:border-blue-800">Dr</div>
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-tr-xl rounded-b-xl shadow-sm border border-slate-100 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 max-w-[85%]">
                                Hello John, how is the pain in your lower back today?
                            </div>
                        </div>
                        <div className="flex gap-3 flex-row-reverse">
                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-xs font-bold text-purple-600 dark:text-purple-300 shrink-0 border border-purple-200 dark:border-purple-800">JD</div>
                            <div className="bg-primary text-white p-3 rounded-tl-xl rounded-b-xl shadow-sm border border-primary text-sm max-w-[85%]">
                                It's a bit better than yesterday, visible redness is gone.
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-300 shrink-0 border border-blue-200 dark:border-blue-800">Dr</div>
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-tr-xl rounded-b-xl shadow-sm border border-slate-100 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 max-w-[85%]">
                                That's good to hear. Are you taking the medication as prescribed?
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-dark-card rounded-b-xl">
                        <div className="relative">
                            <input type="text" placeholder="Type a message..." className="w-full pl-4 pr-10 py-3 bg-slate-100 dark:bg-slate-800 border-transparent rounded-full text-sm focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 transition-all text-slate-800 dark:text-white" />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-full hover:bg-blue-600 transition-colors shadow-sm">
                                <Send size={14} />
                            </button>
                        </div>
                        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
                            {['Prescribe', 'Refer', 'Lab Request'].map(action => (
                                <button key={action} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 whitespace-nowrap transition-colors">
                                    + {action}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Telemedicine;
