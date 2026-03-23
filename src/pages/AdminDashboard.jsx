import React, { useState, useEffect } from 'react';
import {
    Building,
    DollarSign,
    Users,
    Activity,
    AlertTriangle,
    BarChart2,
    CheckCircle,
    Bell,
    FileCheck,
    BedDouble,
    HeartPulse,
    TrendingUp
} from 'lucide-react';
import { clsx } from 'clsx';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    RadialBarChart,
    RadialBar,
    Legend
} from 'recharts';
import useStore from '../store/useStore';
import StatCard from '../components/dashboard/StatCard';
import HipaaFooter from '../components/layout/HipaaFooter';

// --- Mock Data (Premium Optimized) ---
const revenueData = [
    { name: 'Jan', revenue: 4200, expenses: 3100, profit: 1100 },
    { name: 'Feb', revenue: 4500, expenses: 3200, profit: 1300 },
    { name: 'Mar', revenue: 4800, expenses: 3400, profit: 1400 },
    { name: 'Apr', revenue: 5300, expenses: 3300, profit: 2000 },
    { name: 'May', revenue: 5100, expenses: 3500, profit: 1600 },
    { name: 'Jun', revenue: 5900, expenses: 3800, profit: 2100 },
    { name: 'Jul', revenue: 6200, expenses: 3700, profit: 2500 },
];

const occupancyData = [
    { name: 'ICU', value: 92, fill: '#EF4444' },
    { name: 'General', value: 78, fill: '#3B82F6' },
    { name: 'Private', value: 65, fill: '#10B981' },
    { name: 'Maternity', value: 55, fill: '#F59E0B' },
];

const patientFlowData = [
    { name: 'Mon', admitted: 45, discharged: 40 },
    { name: 'Tue', admitted: 52, discharged: 48 },
    { name: 'Wed', admitted: 48, discharged: 50 },
    { name: 'Thu', admitted: 61, discharged: 55 },
    { name: 'Fri', admitted: 55, discharged: 45 },
    { name: 'Sat', admitted: 30, discharged: 25 },
    { name: 'Sun', admitted: 25, discharged: 20 },
];

const satisfactionData = [
    { name: 'Promoters', value: 72, fill: '#10B981' },
    { name: 'Passives', value: 20, fill: '#F59E0B' },
    { name: 'Detractors', value: 8, fill: '#EF4444' },
];

const AdminDashboard = () => {
    const { darkMode } = useStore();
    const [isLoading, setIsLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('Month');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const CHART_TEXT = darkMode ? '#94A3B8' : '#64748B';
    const CHART_GRID = darkMode ? '#334155' : '#E2E8F0';

    if (isLoading) return <DashboardSkeleton />;

    return (
        <div className="space-y-8 animate-fade-in pb-10">

            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Building size={32} className="text-brand" />
                        Executive Command Center
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-medical-green animate-pulse"></span>
                        Live Operations • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden lg:flex items-center bg-surface-hover dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-lg p-1">
                        {['Day', 'Week', 'Month', 'Year'].map(range => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={clsx(
                                    "px-4 py-1.5 text-xs font-bold rounded-md transition-all",
                                    timeRange === range
                                        ? "bg-white dark:bg-slate-700 text-brand-dark dark:text-white shadow-sm"
                                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                )}
                            >
                                {range}
                            </button>
                        ))}
                    </div>

                    <button className="px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-bold shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95">
                        <FileCheck size={18} /> CEO Report
                    </button>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value="$6.2M"
                    trend="up"
                    trendValue="18%"
                    icon={DollarSign}
                    color="bg-medical-teal shadow-medical-teal/30"
                    subtext="Target: $5.8M (Exceeded)"
                />
                <StatCard
                    title="Avg Daily Census"
                    value="245"
                    trend="up"
                    trendValue="12"
                    icon={BedDouble}
                    color="bg-brand shadow-brand/30"
                    subtext="92% Capacity Utilization"
                />
                <StatCard
                    title="Patient Satisfaction"
                    value="4.8/5"
                    trend="stable"
                    trendValue="Top 5%"
                    icon={HeartPulse}
                    color="bg-medical-purple shadow-medical-purple/30"
                    subtext="Based on 450 Reviews"
                />
                <StatCard
                    title="Wait Efficiency"
                    value="94%"
                    trend="up"
                    trendValue="15%"
                    icon={Activity}
                    color="bg-medical-amber shadow-medical-amber/30"
                    subtext="Arg Wait: 12 mins"
                />
            </div>

            {/* Main Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Revenue (2/3) */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <BarChart2 size={20} className="text-medical-teal" />
                            Financial Performance
                        </h3>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400">
                                <span className="w-2 h-2 rounded-full bg-medical-teal"></span> Revenue
                            </span>
                            <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400">
                                <span className="w-2 h-2 rounded-full bg-medical-red opacity-50"></span> Expenses
                            </span>
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0D9488" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={CHART_GRID} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: CHART_TEXT, fontSize: 11, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: CHART_TEXT, fontSize: 11, fontWeight: 600 }} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)', backgroundColor: darkMode ? '#1E293B' : '#fff', color: darkMode ? '#fff' : '#000' }}
                                    formatter={(value) => [`$${value}`, '']}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#0D9488" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" fill="none" opacity={0.5} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Occupancy (1/3) */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <BedDouble size={100} />
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Live Bed Status</h3>
                    <p className="text-xs text-slate-500 mb-6 font-medium">Real-time ward utilization</p>

                    <div className="flex-1 w-full min-h-[220px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart innerRadius="60%" outerRadius="100%" barSize={12} data={occupancyData} startAngle={180} endAngle={0} cx="50%" cy="70%">
                                <RadialBar background clockWise dataKey="value" cornerRadius={10} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                <Legend iconSize={8} layout="horizontal" verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pb-4">
                            <div className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">92%</div>
                            <div className="text-[10px] uppercase font-bold text-medical-red bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded animate-pulse">Critical</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 3: Bottom Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Patient Flow */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                        <Users size={20} className="text-brand" /> Patient Flow
                    </h3>
                    <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={patientFlowData} barGap={4}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={CHART_GRID} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: CHART_TEXT, fontSize: 10, fontWeight: 600 }} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                <Bar dataKey="admitted" fill="#3B82F6" radius={[4, 4, 4, 4]} name="In" barSize={8} />
                                <Bar dataKey="discharged" fill="#10B981" radius={[4, 4, 4, 4]} name="Out" barSize={8} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Satisfaction */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                        <CheckCircle size={20} className="text-medical-purple" /> Quality of Care
                    </h3>
                    <div className="flex items-center justify-center h-60 relative">
                        <PieChart width={200} height={200}>
                            <Pie
                                data={satisfactionData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {satisfactionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                        </PieChart>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <div className="text-3xl font-black text-slate-800 dark:text-white">4.8</div>
                            <div className="text-[10px] uppercase font-bold text-slate-400">Stars</div>
                        </div>
                    </div>
                </div>

                {/* Alerts */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-0 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
                    <div className="p-4 bg-red-50 dark:bg-red-900/10 border-b border-red-100 dark:border-red-900/20 flex justify-between items-center">
                        <h3 className="font-bold text-red-700 dark:text-red-300 flex items-center gap-2">
                            <AlertTriangle size={18} /> Critical Alerts
                        </h3>
                        <span className="bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-100 dark:border-slate-700 shadow-sm">3 Active</span>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {[
                            { title: "ER Capacity Reached", time: "NOW", desc: "Wait time > 45m. Triage Level Orange.", urgent: true },
                            { title: "Oxygen Tank B Low", time: "14:00", desc: "Level at 15%. Refill scheduled.", urgent: false },
                            { title: "Staff Shortage (Ward 3)", time: "Shift 2", desc: "Req: 2 RNs. Agency notified.", urgent: true }
                        ].map((alert, i) => (
                            <div key={i} className="p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                                <div className="flex justify-between mb-1">
                                    <span className={`text-sm font-bold ${alert.urgent ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{alert.title}</span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${alert.urgent ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>{alert.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors">{alert.desc}</p>
                            </div>
                        ))}
                    </div>
                    <button className="p-3 text-xs font-bold text-slate-500 hover:text-brand hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-t border-slate-100 dark:border-slate-800 uppercase tracking-wider">
                        View System Log
                    </button>
                </div>

            </div>

            {/* Footer */}
            <HipaaFooter />
        </div>
    );
};

const DashboardSkeleton = () => (
    <div className="space-y-6 animate-pulse p-6">
        <div className="h-10 w-48 bg-slate-200 rounded-lg"></div>
        <div className="grid grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>)}
        </div>
        <div className="h-64 bg-slate-200 rounded-2xl"></div>
    </div>
);

export default AdminDashboard;
