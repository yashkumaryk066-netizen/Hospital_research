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
    const [stats, setStats] = useState({ patients: 0, appointments: 0, doctors: 0, revenue: '₹0' });
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { default: client } = await import('../api/client');
                const [patientsRes, apptsRes, doctorsRes] = await Promise.all([
                    client.get('patients/'),
                    client.get('appointments/'),
                    client.get('doctors/')
                ]);

                setStats({
                    patients: patientsRes.data.length || 0,
                    appointments: apptsRes.data.length || 0,
                    doctors: doctorsRes.data.length || 0,
                    revenue: '₹1.2M' // Hardcoded logic or fetch from invoices
                });

                // Get today's appointments for schedule
                setSchedule(apptsRes.data.slice(0, 5).map(a => ({
                    time: a.time_slot,
                    patient: a.patient_name,
                    type: a.reason,
                    status: a.status === 'SCHED' ? 'Scheduled' : 'In Consultation'
                })));

                setIsLoading(false);
            } catch (error) {
                console.error("Dashboard fetch error:", error);
                setIsLoading(false);
            }
        };

        fetchDashboardData();
        const interval = setInterval(fetchDashboardData, 30000); // Polling every 30s
        return () => clearInterval(interval);
    }, []);

    const roleData = {
        Doctor: {
            title: 'Medical Officer Workbench',
            stats: [
                { title: 'OPD Queue', val: stats.appointments.toString(), icon: Users, color: 'bg-blue-600' },
                { title: 'My Patients', val: stats.patients.toString(), icon: BedDouble, color: 'bg-indigo-600' },
                { title: 'Active Meds', val: '12', icon: Pill, color: 'bg-emerald-600' },
                { title: 'Surgeries', val: '02', icon: Activity, color: 'bg-rose-600' }
            ],
            schedule: schedule.length > 0 ? schedule : [
                { time: '10:30 AM', patient: 'Mrs. Sharma', type: 'Follow Up', status: 'In Waiting' },
            ]
        },
        'Super Admin': {
            title: 'Enterprise Hospital Monitor',
            stats: [
                { title: 'Total Revenue', val: stats.revenue, icon: Activity, color: 'bg-emerald-600' },
                { title: 'Bed Occupancy', val: '92%', icon: BedDouble, color: 'bg-blue-600' },
                { title: 'Total Doctors', val: stats.doctors.toString(), icon: Stethoscope, color: 'bg-amber-600' },
                { title: 'Asset Uptime', val: '99.9%', icon: Briefcase, color: 'bg-indigo-600' }
            ],
            schedule: [
                { time: '09:00 AM', task: 'Board Meeting', type: 'Strategic', status: 'Confirmed' },
                { time: '02:00 PM', task: 'Budget Review', type: 'Finance', status: 'Upcoming' },
            ]
        }
    };

    const [timeFilter, setTimeFilter] = useState('Today'); // BUG-023 fix

    const handleQuickAction = () => {
        alert("Quick Action triggered: Context-aware menu opening...");
    };

    const handleViewCalendar = () => {
        alert("Navigating to Clinical Calendar...");
    };

    const viewSystemStatus = () => {
        alert("Full System Status: All services operational (Green). Latency: 42ms.");
    };

    const currentData = roleData[user?.role] || roleData.Doctor;

    return (
        <div className="space-y-8 pb-12 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                   <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                      {currentData.title}
                   </h1>
                   <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
                      Portal Session Active • <span className="text-blue-600 dark:text-blue-400 font-bold uppercase text-[10px] tracking-widest">{user?.name} ({user?.role})</span>
                   </p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-1.5 shadow-sm">
                      <button 
                        onClick={() => setTimeFilter('Today')}
                        className={clsx("px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", timeFilter === 'Today' ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" : "text-slate-400 hover:text-slate-600")}
                      >
                          Today
                      </button>
                      <button 
                        onClick={() => setTimeFilter('Week')}
                        className={clsx("px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", timeFilter === 'Week' ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" : "text-slate-400 hover:text-slate-600")}
                      >
                          Week
                      </button>
                   </div>
                   <button 
                    onClick={handleQuickAction}
                    className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/30 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                   >
                       <Briefcase size={16} /> Quick Action
                   </button>
                </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentData.stats.map((s, i) => (
                   <StatCard key={i} title={s.title} value={s.val} icon={s.icon} color={s.color} trend="up" trendValue={timeFilter === 'Today' ? 'Live' : '+4.2%'} />
                ))}
            </div>

            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Schedule/Tasks */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                   <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                      <h3 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-widest">Active Schedule</h3>
                      <button 
                        onClick={handleViewCalendar}
                        className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline"
                      >
                          View Calendar
                      </button>
                   </div>
                   <div className="flex-1 p-4 space-y-2">
                      {currentData.schedule.map((item, i) => (
                         <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-[1.5rem] transition-all group cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                            <div className="flex items-center gap-6">
                               <div className="text-center min-w-[70px]">
                                  <p className="text-xs font-black text-slate-800 dark:text-white">{item.time.split(',')[0]}</p>
                                  <p className="text-[9px] font-bold text-slate-400 uppercase">{item.time.split(',')[1] || ''}</p>
                               </div>
                               <div className="w-px h-10 bg-slate-100 dark:bg-slate-800" />
                               <div>
                                  <p className="font-black text-slate-800 dark:text-white text-sm">{item.patient || item.doctor || item.task}</p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.type || item.dept || item.ward}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <span className={clsx('px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest', 
                                 item.status === 'Confirmed' || item.status === 'In Waiting' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400')}>
                                 {item.status}
                               </span>
                               <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
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

                   <button 
                    onClick={viewSystemStatus}
                    className="w-full mt-12 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition-all origin-bottom group-hover:scale-[1.02]"
                   >
                      Full System Status
                   </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
