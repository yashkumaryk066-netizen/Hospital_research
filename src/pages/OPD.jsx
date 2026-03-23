import React, { useState } from 'react';
import { 
    Plus, 
    Search, 
    Filter, 
    MoreVertical, 
    User, 
    Clock, 
    Calendar,
    Phone,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ChevronDown,
    Activity,
    Stethoscope,
    Monitor,
    ShieldAlert,
    Lock
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { clsx } from 'clsx';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import OPDRegistrationModal from '../components/modals/OPDRegistrationModal';
import useStore from '../store/useStore';

const OPD = () => {
    const { user } = useStore();
    const [view, setView] = useState('dashboard');
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [department, setDepartment] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // HIPAA-002: Access Control
    const isAuthorized = ['Doctor', 'Nurse', 'Super Admin'].includes(user?.role);

    const revenueData = [
        { month: 'Jan', profit: 400, expenses: 240 },
        { month: 'Feb', profit: 300, expenses: 139 },
        { month: 'Mar', profit: 200, expenses: 980 },
        { month: 'Apr', profit: 278, expenses: 390 },
        { month: 'May', profit: 189, expenses: 480 },
        { month: 'Jun', profit: 239, expenses: 380 },
        { month: 'Jul', profit: 349, expenses: 430 },
        { month: 'Aug', profit: 200, expenses: 980 },
        { month: 'Sep', profit: 278, expenses: 390 },
        { month: 'Oct', profit: 189, expenses: 480 },
    ];

    const sourceData = [
        { name: 'Walk-In', value: 45, color: '#2DD4BF' },
        { name: 'Emergency', value: 30, color: '#FCD34D' },
        { name: 'Referral', value: 15, color: '#FB7185' },
        { name: 'Online', value: 10, color: '#60A5FA' },
    ];

    const doctors = [
        { name: 'Dr. Patel', specialty: 'Cardiology', status: 'Available', queue: 3, avatar: 'P' },
        { name: 'Dr. Sharma', specialty: 'Orthopedics', status: 'On Break', queue: 2, avatar: 'S' },
        { name: 'Dr. Khanna', specialty: 'General Medicine', status: 'Under Observation', queue: 5, avatar: 'K' },
        { name: 'Dr. Singh', specialty: 'Orthopedics', status: 'Available', queue: 1, avatar: 'S' },
        { name: 'Dr. Reddy', specialty: 'Cardiology', status: 'Offline', queue: 0, avatar: 'R' },
    ];

    const appointments = [
        { id: 'OPD-1002', token: '#12', name: 'Robert Miller',  age: 45, gender: 'Male',   mobile: '+91 98765 43210', symptoms: 'Fever, body ache, mild cough for 3 days',   date: '22/01/2026', time: '12:30PM', doctor: 'Dr. Ram Sharma', status: 'In Consultation', bp: '120/80', spo2: '98%', fee: '₹950'  },
        { id: 'OPD-1003', token: '#13', name: 'Sarah Jenkins',   age: 35, gender: 'Female', mobile: '+91 98765 43211', symptoms: 'Chest pain, shortness of breath',            date: '22/01/2026', time: '01:00PM', doctor: 'Dr. Patel',     status: 'Checked In',     bp: '130/85', spo2: '97%', fee: '₹1,500'},
        { id: 'OPD-1004', token: '#14', name: 'James Wilson',    age: 28, gender: 'Male',   mobile: '+91 98765 43212', symptoms: 'Knee pain after sports injury',               date: '22/01/2026', time: '01:30PM', doctor: 'Dr. Kumar',     status: 'Scheduled',      bp: '110/75', spo2: '99%', fee: '₹750'  },
        { id: 'OPD-1005', token: '#15', name: 'Linda Carter',  age: 8,  gender: 'Female', mobile: '+91 98765 43213', symptoms: 'High fever, vomiting since yesterday',        date: '22/01/2026', time: '02:00PM', doctor: 'Dr. Khan',      status: 'Completed',      bp: '100/70', spo2: '98%', fee: '₹600'  },
    ];

    const filteredAppointments = appointments.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-20 animate-fade-in px-4">
            {/* Top Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative w-full max-w-md group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search patients, appointments..."
                            className="w-full h-12 pl-12 pr-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 text-sm font-medium transition-all dark:text-white"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-slate-800 transition-all">
                        <Monitor size={16} /> Clinic Queue Display
                    </button>
                    {isAuthorized && (
                        <button 
                            onClick={() => setIsRegModalOpen(true)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/30 flex items-center gap-2 hover:scale-105 transition-all"
                        >
                            <Plus size={16} /> New Appointment
                        </button>
                    )}
                </div>
            </div>

            {/* Stat Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatCard title="Today's Appointments" value="48" icon={Calendar} color="bg-blue-600" trend="up" trendValue="Live" />
                <StatCard title="Scheduled" value="32" icon={Clock} color="bg-teal-500" />
                <StatCard title="In Progress" value="4" icon={Activity} color="bg-purple-500" />
                <StatCard title="Completed" value="10" icon={CheckCircle2} color="bg-emerald-500" />
                <StatCard title="Cancelled" value="10" icon={XCircle} color="bg-rose-500" />
                <StatCard title="Available Doctors" value="12" icon={Stethoscope} color="bg-indigo-500" />
            </div>

            {/* Content Mid-Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm p-6 overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-widest">Doctor Availability</h3>
                    </div>
                    <div className="space-y-4">
                        {doctors.map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 text-xs border border-white dark:border-slate-700 shadow-sm overflow-hidden">
                                        <img src={`https://ui-avatars.com/api/?name=${doc.name}&background=f1f5f9&color=64748b&bold=true`} alt={doc.name} className="w-full h-full" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800 dark:text-white">{doc.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{doc.specialty}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={clsx(
                                        "text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border",
                                        doc.status === 'Available' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40' : 
                                        doc.status === 'Offline' ? 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/40'
                                    )}>{doc.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-9 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm p-8 overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-widest px-2 border-l-4 border-blue-600">Patient Volume Metrics</h3>
                    </div>
                    <div className="flex-1 min-h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData} barGap={8}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                                <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#fff' }} />
                                <Bar dataKey="profit" fill="#0284C7" radius={[4, 4, 0, 0]} barSize={12} />
                                <Bar dataKey="expenses" fill="#FB7185" radius={[4, 4, 0, 0]} barSize={12} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Appointments Table - Restricted BUG-HIPAA-002 */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                    <h3 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-widest">Clinical Patient Repository</h3>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                            <Lock size={12} className={isAuthorized ? "text-green-500" : "text-amber-500"} />
                            {isAuthorized ? "Clinical Access Active" : "Restricted View"}
                        </span>
                    </div>
                </div>

                {!isAuthorized ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                        <div className="w-20 h-20 rounded-[2rem] bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 shadow-xl shadow-amber-500/10">
                            <ShieldAlert size={40} />
                        </div>
                        <h4 className="text-2xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">Access Restricted (HIPAA)</h4>
                        <p className="max-w-md text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed">
                            The Patient Repository contains Protected Health Information (PHI). Your current role 
                            (<span className="text-blue-600 dark:text-blue-400 font-extrabold">{user?.role}</span>) does not have clinical privileges to view this sensitive dataset.
                        </p>
                        <button className="mt-8 px-8 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Request Privileged Access</button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Patient Info (PHI)</th>
                                    <th className="px-6 py-4">Scheduled For</th>
                                    <th className="px-6 py-4">Clinician</th>
                                    <th className="px-6 py-4">Vitals Summary</th>
                                    <th className="px-6 py-4">Billing</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredAppointments.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                                        <td className="px-6 py-6 font-black text-slate-500">
                                            <div className={clsx(
                                                "inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                                app.status === 'In Consultation' ? 'bg-purple-50 text-purple-600 border-purple-100' : 
                                                app.status === 'Checked In' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                                app.status === 'Scheduled' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            )}>
                                                {app.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 min-w-[240px]">
                                            <div className="flex flex-col">
                                                <div className="font-extrabold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                                                    {app.name} <div className={clsx("w-1.5 h-1.5 rounded-full", app.gender === 'Male' ? 'bg-blue-400' : 'bg-rose-400')} />
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 mt-1 uppercase">
                                                    {app.id} • {app.age}Y • <Phone size={10} className="text-slate-300" /> 
                                                    {isAuthorized ? app.mobile : "XXXXX-XXXXX"}
                                                </div>
                                                <div className="text-[10px] font-medium text-slate-400 mt-2 italic max-w-xs">{app.symptoms}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="text-xs font-black text-slate-700 dark:text-slate-300">{app.date}</div>
                                            <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{app.time}</div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="text-xs font-black text-slate-800 dark:text-white">{app.doctor}</div>
                                            <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Medical Officer</div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col gap-1 text-[10px] font-black uppercase text-slate-400">
                                                <div className="flex justify-between w-20"><span>BP:</span> <span className="text-slate-700 dark:text-slate-300">{app.bp}</span></div>
                                                <div className="flex justify-between w-20"><span>SpO2:</span> <span className="text-slate-700 dark:text-slate-300">{app.spo2}</span></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="text-xs font-black text-slate-800 dark:text-white">{app.fee}</div>
                                            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Paid (Digital)</div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-300 hover:text-blue-600 rounded-xl transition-all">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <OPDRegistrationModal isOpen={isRegModalOpen} onClose={() => setIsRegModalOpen(false)} />
        </div>
    );
};

export default OPD;
