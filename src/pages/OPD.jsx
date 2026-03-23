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
    Monitor
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { clsx } from 'clsx';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import OPDRegistrationModal from '../components/modals/OPDRegistrationModal';

const OPD = () => {
    const [view, setView] = useState('dashboard');
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [department, setDepartment] = useState('All');

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
        { id: 'OPD-1002', token: '#12', name: 'Rajesh Kumar', age: 45, gender: 'Male', mobile: '+91 9876543210', symptoms: 'Fever, body ache, mild cough for 3 days', date: '22/01/2026', time: '12:30PM', doctor: 'Dr. Ram Sharma', status: 'In Consultation', bp: '120/80', spo2: '98%', fee: '₹950' },
        { id: 'OPD-1003', token: '#13', name: 'Sunita Devi', age: 35, gender: 'Female', mobile: '+91 9876543211', symptoms: 'Chest pain, shortness of breath', date: '22/01/2026', time: '12:30PM', doctor: 'Dr. Patel', status: 'Checked In', bp: '130/85', spo2: '97%', fee: '₹950' },
        { id: 'OPD-1004', token: '#14', name: 'Amit Singh', age: 28, gender: 'Male', mobile: '+91 9876543212', symptoms: 'Knee pain after sports injury', date: '22/01/2026', time: '12:30PM', doctor: 'Dr. Kumar', status: 'Scheduled', bp: '110/75', spo2: '99%', fee: '₹950' },
        { id: 'OPD-1005', token: '#15', name: 'Priya Sharma', age: 8, gender: 'Female', mobile: '+91 9876543213', symptoms: 'High fever, vomiting', date: '22/01/2026', time: '12:30PM', doctor: 'Dr. Khan', status: 'Completed', bp: '100/70', spo2: '98%', fee: '₹950' },
    ];

    return (
        <div className="space-y-6 pb-20 animate-fade-in px-4">
            {/* Top Bar with Search and Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative w-full max-w-md group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search patients, appointments..." 
                            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 text-sm font-medium transition-all"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            <Filter size={18} />
                        </button>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
                        <select className="bg-transparent text-xs font-bold px-4 py-2 outline-none appearance-none cursor-pointer">
                            <option>Select Department</option>
                            <option>Cardiology</option>
                            <option>Orthopedics</option>
                        </select>
                        <ChevronDown size={14} className="mr-2 text-slate-400" />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-slate-800 transition-all">
                        <Monitor size={16} /> Clinic Queue Display
                    </button>
                    <button className="px-6 py-3 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 flex items-center gap-2 hover:scale-105 transition-all">
                        <AlertCircle size={16} /> Emergency
                    </button>
                    <button 
                        onClick={() => setIsRegModalOpen(true)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/30 flex items-center gap-2 hover:scale-105 transition-all"
                    >
                        <Plus size={16} /> New Appointment
                    </button>
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
                
                {/* Doctor Availability - Left */}
                <div className="lg:col-span-3 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest">Doctor Availability</h3>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                           Dept <ChevronDown size={10} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {doctors.map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs border border-white shadow-sm overflow-hidden">
                                        <img src={`https://ui-avatars.com/api/?name=${doc.name}&background=f1f5f9&color=64748b&bold=true`} alt={doc.name} className="w-full h-full" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800">{doc.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{doc.specialty}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={clsx(
                                        "text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border",
                                        doc.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                        doc.status === 'On Break' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                        doc.status === 'Offline' ? 'bg-slate-50 text-slate-400 border-slate-100' : 'bg-purple-50 text-purple-600 border-purple-100'
                                    )}>{doc.status === 'Under Observation' ? 'Observation' : doc.status}</p>
                                    <p className="text-[9px] font-bold text-slate-400 mt-1">{doc.queue} in queue</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Revenue Insights - Center */}
                <div className="lg:col-span-5 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest px-2 border-l-4 border-blue-600">OPD Revenue Insights</h3>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button className="px-3 py-1 bg-white shadow-sm text-[10px] font-black uppercase rounded-lg">Monthly</button>
                            <button className="px-3 py-1 text-[10px] font-black uppercase text-slate-500">Quarterly</button>
                        </div>
                    </div>
                    <div className="flex-1 min-h-[250px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData} barGap={4}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f8fafc' }}
                                />
                                <Bar dataKey="profit" fill="#0284C7" radius={[4, 4, 0, 0]} barSize={8} />
                                <Bar dataKey="expenses" fill="#FB7185" radius={[4, 4, 0, 0]} barSize={8} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Patient Source - Right */}
                <div className="lg:col-span-4 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 overflow-hidden flex flex-col relative">
                    <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-2">OPD Patient Source</h3>
                    <div className="flex-1 flex flex-col items-center justify-center mt-4">
                        <div className="relative w-full h-[220px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sourceData}
                                        innerRadius={65}
                                        outerRadius={90}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {sourceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className="text-3xl font-black text-slate-800 leading-none">Walk-In</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Primary Source</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full mt-6">
                            {sourceData.map((s, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{s.name}</span>
                                    <span className="text-[10px] font-black text-slate-900 ml-auto">{s.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Appointments Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
                    <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest">Recent Appointments</h3>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mr-4">
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Follow-up</span>
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500" /> Emergency</span>
                        </div>
                        <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View all</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-4"><input type="checkbox" className="rounded" /></th>
                                <th className="px-2 py-4">OPD No</th>
                                <th className="px-6 py-4">Token</th>
                                <th className="px-6 py-4">Patient Info</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Doctor</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Vitals</th>
                                <th className="px-6 py-4">Fees</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {appointments.map((app) => (
                                <tr key={app.id} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="px-8 py-6"><input type="checkbox" className="rounded" /></td>
                                    <td className="px-2 py-6">
                                        <div className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">{app.id}</div>
                                    </td>
                                    <td className="px-6 py-6 font-black text-slate-500">{app.token}</td>
                                    <td className="px-6 py-6 min-w-[200px]">
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <div className="font-black text-slate-700 text-sm flex items-center gap-2">
                                                   {app.name} <div className={clsx("w-1.5 h-1.5 rounded-full", app.gender === 'Male' ? 'bg-blue-400' : 'bg-rose-400')} title={app.gender} />
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-1">
                                                   {app.age}y, {app.gender} • <Phone size={10} className="text-slate-300" /> {app.mobile}
                                                </div>
                                                <div className="text-[9px] font-medium text-slate-400 mt-2 line-clamp-1 italic max-w-[180px]">Symptoms: {app.symptoms}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="text-xs font-black text-slate-600">{app.date}</div>
                                        <div className="text-[10px] font-bold text-slate-400 mt-1">{app.time}</div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="text-xs font-black text-slate-700">{app.doctor}</div>
                                        <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Clinician</div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className={clsx(
                                            "inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                            app.status === 'In Consultation' ? 'bg-purple-50 text-purple-600' : 
                                            app.status === 'Checked In' ? 'bg-amber-50 text-amber-600' : 
                                            app.status === 'Scheduled' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                                        )}>
                                            {app.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex flex-col gap-1">
                                           <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">BP: <span className="text-slate-700">{app.bp}</span></div>
                                           <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">SpO2: <span className="text-slate-700">{app.spo2}</span></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="text-sm font-black text-slate-700">{app.fee}</div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <OPDRegistrationModal isOpen={isRegModalOpen} onClose={() => setIsRegModalOpen(false)} />
        </div>
    );
};

export default OPD;
