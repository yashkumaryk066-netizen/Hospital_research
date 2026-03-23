import React, { useState, useEffect } from 'react';
import {
    Users, Activity, BedDouble, Calendar, Briefcase, 
    Stethoscope, Pill, TestTube, FileText, ChevronRight,
    Search, Bell, User
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import useStore from '../store/useStore';
import { clsx } from 'clsx';
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
    const { darkMode, user } = useStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const roleData = {
        Doctor: {
            title: 'Medical Officer Workbench',
            stats: [
                { title: 'OPD Queue', val: '12', icon: Users, color: 'bg-blue-600' },
                { title: 'IPD Rounds', val: '08', icon: BedDouble, color: 'bg-indigo-600' },
                { title: 'Pending Reports', val: '05', icon: FileText, color: 'bg-emerald-600' },
                { title: 'Surgeries', val: '02', icon: Activity, color: 'bg-rose-600' }
            ],
            schedule: [
                { time: '10:30 AM', patient: 'Mrs. Sharma', type: 'Follow Up', status: 'In Waiting' },
                { time: '11:15 AM', patient: 'Mr. Khan', type: 'New Case', status: 'Scheduled' },
                { time: '12:00 PM', patient: 'Ravi Teja', type: 'Consultation', status: 'Scheduled' },
            ]
        },
        Patient: {
            title: 'Patient Health Portal',
            stats: [
                { title: 'Appointments', val: '02', icon: Calendar, color: 'bg-blue-600' },
                { title: 'Lab Results', val: '01', icon: TestTube, color: 'bg-purple-600' },
                { title: 'Prescriptions', val: '04', icon: Pill, color: 'bg-emerald-600' },
                { title: 'Balance Due', val: '₹0', icon: FileText, color: 'bg-slate-600' }
            ],
            schedule: [
                { time: 'Today, 04:00 PM', doctor: 'Dr. Sarah Wilson', dept: 'Cardiology', status: 'Confirmed' },
                { time: '22 Mar, 10:00 AM', doctor: 'Dr. House', dept: 'Diagnostics', status: 'Pending' },
            ]
        },
        Nurse: {
            title: 'Nursing Operations Hub',
            stats: [
                { title: 'Active Beds', val: '42', icon: BedDouble, color: 'bg-blue-600' },
                { title: 'MAR Dues', val: '15', icon: Pill, color: 'bg-rose-600' },
                { title: 'New Admissions', val: '04', icon: User, color: 'bg-indigo-600' },
                { title: 'Sample Collection', val: '12', icon: TestTube, color: 'bg-emerald-600' }
            ],
            schedule: [
                { time: '02:00 PM', task: 'Medication Round', ward: 'Floor 3', status: 'Due' },
                { time: '03:15 PM', task: 'Vitals Check', ward: 'ICU-B', status: 'Scheduled' },
            ],
            inbound: [
                { time: '10m ETA', unit: 'AMB-04', condition: 'STEMI', priority: 'P1' },
                { time: '18m ETA', unit: 'AMB-12', condition: 'Trauma', priority: 'P1' },
            ]
        },
        'Super Admin': {
            title: 'Enterprise Hospital Monitor',
            stats: [
                { title: 'Est. Revenue', val: '$5.4M', icon: Activity, color: 'bg-emerald-600' },
                { title: 'Bed Occupancy', val: '92%', icon: BedDouble, color: 'bg-blue-600' },
                { title: 'Avg. Wait Time', val: '14m', icon: Users, color: 'bg-amber-600' },
                { title: 'Asset Uptime', val: '99.9%', icon: Briefcase, color: 'bg-indigo-600' }
            ],
            schedule: [
                { time: '09:00 AM', task: 'Board Meeting', type: 'Strategic', status: 'Confirmed' },
                { time: '02:00 PM', task: 'Budget Review', type: 'Finance', status: 'Upcoming' },
            ]
        }
    };

    const currentData = roleData[user?.role] || roleData.Doctor;

    return (
        <div className="space-y-8 pb-12 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                   <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                      {currentData.title}
                   </h1>
                   <p className="text-slate-500 font-medium mt-1">
                      Portal Session Active • <span className="text-blue-600 font-bold uppercase text-[10px] tracking-widest">{user?.name} ({user?.role})</span>
                   </p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="hidden sm:flex items-center gap-2 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm">
                      <div className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-xl">Today</div>
                      <div className="px-4 py-1.5 text-slate-400 text-[10px] font-black uppercase tracking-widest cursor-pointer">Week</div>
                   </div>
                   <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/30 flex items-center gap-2">
                       <Briefcase size={16} /> Quick Action
                   </button>
                </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentData.stats.map((s, i) => (
                   <StatCard key={i} title={s.title} value={s.val} icon={s.icon} color={s.color} trend="up" trendValue="Live" />
                ))}
            </div>

            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Schedule/Tasks */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                   <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest">Active Schedule</h3>
                      <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View Calendar</button>
                   </div>
                   <div className="flex-1 p-4 space-y-2">
                      {currentData.schedule.map((item, i) => (
                         <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50 rounded-[1.5rem] transition-all group cursor-pointer border border-transparent hover:border-slate-100">
                            <div className="flex items-center gap-6">
                               <div className="text-center min-w-[70px]">
                                  <p className="text-xs font-black text-slate-800">{item.time.split(',')[0]}</p>
                                  <p className="text-[9px] font-bold text-slate-400 uppercase">{item.time.split(',')[1] || ''}</p>
                               </div>
                               <div className="w-px h-10 bg-slate-100" />
                               <div>
                                  <p className="font-black text-slate-800 text-sm">{item.patient || item.doctor || item.task}</p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.type || item.dept || item.ward}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <span className={clsx('px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest', 
                                 item.status === 'Confirmed' || item.status === 'In Waiting' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600')}>
                                 {item.status}
                               </span>
                               <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                  <ChevronRight size={16} />
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* Right: Quick Context */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                   <h3 className="text-xl font-black mb-1 relative z-10">AI Insights</h3>
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-8 relative z-10">Smart System Optimization</p>
                   
                   <div className="space-y-6 relative z-10">
                      <div className="p-5 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                         <p className="text-xs text-blue-400 font-black uppercase tracking-widest mb-2">Efficiency Rating</p>
                         <div className="flex items-end gap-3">
                            <span className="text-4xl font-black">94%</span>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase mb-1">+2% vs LY</span>
                         </div>
                      </div>

                      <div className="p-5 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                         <p className="text-xs text-purple-400 font-black uppercase tracking-widest mb-2">System Alerts</p>
                         <p className="text-xs font-medium text-slate-300">No critical issues detected in your current shift. All clinical parameters stable.</p>
                      </div>
                   </div>

                   <button className="w-full mt-12 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition-all origin-bottom group-hover:scale-[1.02]">
                      Full System Status
                   </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
