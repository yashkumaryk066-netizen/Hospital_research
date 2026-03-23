import React, { useState } from 'react';
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    CreditCard,
    PieChart as PieChartIcon,
    Activity,
    Calendar,
    Filter,
    Download,
    Shield,
    Eye,
    EyeOff
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';
import { clsx } from 'clsx';

const Finance = () => {
    const [dateRange, setDateRange] = useState('monthly'); // weekly, monthly, yearly
    const [isPrivacyMode, setIsPrivacyMode] = useState(true); // HIPAA Blind Mode

    // Mock Data - World Class Financials
    const revenueData = [
        { name: 'Jan', revenue: 4.2, expenses: 3.1, profit: 1.1 },
        { name: 'Feb', revenue: 3.8, expenses: 2.9, profit: 0.9 },
        { name: 'Mar', revenue: 4.5, expenses: 3.2, profit: 1.3 },
        { name: 'Apr', revenue: 4.1, expenses: 3.0, profit: 1.1 },
        { name: 'May', revenue: 4.8, expenses: 3.4, profit: 1.4 },
        { name: 'Jun', revenue: 5.2, expenses: 3.6, profit: 1.6 },
        { name: 'Jul', revenue: 4.9, expenses: 3.3, profit: 1.6 },
        { name: 'Aug', revenue: 5.5, expenses: 3.8, profit: 1.7 },
        { name: 'Sep', revenue: 5.1, expenses: 3.5, profit: 1.6 },
        { name: 'Oct', revenue: 5.8, expenses: 3.9, profit: 1.9 },
        { name: 'Nov', revenue: 5.4, expenses: 3.7, profit: 1.7 },
        { name: 'Dec', revenue: 6.1, expenses: 4.1, profit: 2.0 },
    ];

    const payerMixData = [
        { name: 'Private Insurance', value: 45 },
        { name: 'Medicare/Govt', value: 30 },
        { name: 'Self-Pay', value: 15 },
        { name: 'Corporate', value: 10 },
    ];

    const deptProfitData = [
        { name: 'Surgery (OT)', value: 1.2, visits: 150 },
        { name: 'IPD/Wards', value: 0.9, visits: 420 },
        { name: 'Radiology', value: 0.5, visits: 800 },
        { name: 'Laboratory', value: 0.4, visits: 1200 },
        { name: 'Pharmacy', value: 0.3, visits: 2500 },
        { name: 'OPD Consult', value: 0.2, visits: 1800 },
    ];

    const COLORS = ['#0076CE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    // Format helpers
    const formatCurrency = (val) => {
        if (isPrivacyMode) return '****';
        return `$${val}M`;
    };

    const [settlementModal, setSettlementModal] = useState(false);

    return (
        <div className="space-y-6 pb-20 animate-fade-in px-4 relative">
            
            {/* SETTLEMENT & BILLING OVERLAY */}
            <AnimatePresence>
                {settlementModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[130] bg-slate-950/90 backdrop-blur-3xl flex items-center justify-center p-6">
                         <div className="bg-white rounded-[3rem] p-12 max-w-3xl w-full border border-slate-200 shadow-2xl space-y-10 relative">
                             <button onClick={() => setSettlementModal(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-800 transition-colors"><CreditCard size={28} /></button>
                             
                             <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30 font-black text-2xl">$</div>
                                <div>
                                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Patient Settlement Hub</h2>
                                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1">IPD Discharge Billing · Advance Refunds · Discount Matrix</p>
                                </div>
                             </div>

                             <div className="grid grid-cols-2 gap-6 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Billing Summary</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm"><span className="text-slate-500 font-medium">Total Billable:</span> <span className="text-slate-800 font-black tracking-tight">$8,450.00</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-slate-500 font-medium">Advance Paid:</span> <span className="text-blue-600 font-black tracking-tight">- $2,000.00</span></div>
                                        <div className="flex justify-between text-sm border-t border-slate-200 pt-2"><span className="text-slate-800 font-black uppercase text-[10px]">Net Payable:</span> <span className="text-emerald-600 font-black tracking-tight text-lg">$6,450.00</span></div>
                                    </div>
                                </div>
                                <div className="space-y-4 flex flex-col justify-end">
                                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Process Credit Card</button>
                                    <button className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">Generate Final Invoice (PDF)</button>
                                </div>
                             </div>

                             <div className="flex gap-4">
                                <div className="flex-1 p-6 border-2 border-dashed border-slate-200 rounded-[2rem] text-center space-y-3 group hover:border-blue-400 transition-all cursor-pointer">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Corporate Clearance</p>
                                    <p className="text-xs font-bold text-slate-600 uppercase">Awaiting TPA Response</p>
                                </div>
                                <div className="flex-1 p-6 border-2 border-dashed border-slate-200 rounded-[2rem] text-center space-y-3 group hover:border-emerald-400 transition-all cursor-pointer">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Refund Status</p>
                                    <p className="text-xs font-bold text-slate-600 uppercase">No Refunds Pending</p>
                                </div>
                             </div>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header with HIPAA Privacy Toggle */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                         <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                         CFO Financial Command Center
                    </h2>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-1 ml-4 leading-none">Global Revenue Cycle · TPA Intelligence · SAP / Tally ERP Integrated</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsPrivacyMode(!isPrivacyMode)}
                        className={clsx(
                            "flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border shadow-sm",
                            isPrivacyMode ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        )}
                    >
                        {isPrivacyMode ? <EyeOff size={14} /> : <Eye size={14} />}
                        {isPrivacyMode ? "HIPAA Blind" : "Reveal PII"}
                    </button>
                    <button 
                        onClick={() => setSettlementModal(true)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 flex items-center gap-4 hover:scale-105 active:scale-95 transition-all"
                    >
                        <CreditCard size={14} /> PATIENT SETTLEMENT Hub
                    </button>
                </div>
            </div>

            {/* KPI Cards - Executive Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Net Patient Revenue (YTD)"
                    value={isPrivacyMode ? "$**,***,***" : "$58,450,200"}
                    trend="up"
                    trendValue="12.5%"
                    icon={DollarSign}
                    color="bg-green-500"
                />
                <StatCard
                    title="Operating Expenses"
                    value={isPrivacyMode ? "$**,***,***" : "$42,120,000"}
                    trend="down"
                    trendValue="2.1%"
                    icon={TrendingDown}
                    color="bg-red-500"
                    inverseTrend // Down is good for expenses
                />
                <StatCard
                    title="Net Profit Margin"
                    value={isPrivacyMode ? "**%" : "28.4%"}
                    trend="up"
                    trendValue="4.2%"
                    icon={TrendingUp}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Days in A/R (Cash Flow)"
                    value="24 Days"
                    trend="down"
                    trendValue="3 Days"
                    icon={CreditCard}
                    color="bg-purple-500"
                    inverseTrend // Down is good for A/R days
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue vs Expenses Trend */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Financial Performance (Revenue vs Expenses)</h3>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Revenue</span>
                            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-400"></div> Expenses</span>
                            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-400"></div> Profit</span>
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `$${val}M`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => isPrivacyMode ? '****' : `$${value}M`}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                                <Line type="monotone" dataKey="expenses" stroke="#f87171" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                <Area type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Payer Mix (Risk Analysis) */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Payer Mix (Revenue Source)</h3>
                    <p className="text-xs text-slate-500 mb-6">Distribution of revenue by insurance type</p>
                    <div className="flex-1 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={payerMixData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {payerMixData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <div className="text-2xl font-bold text-slate-800">100%</div>
                            <div className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Collection</div>
                        </div>
                    </div>
                    <div className="space-y-3 mt-4">
                        {payerMixData.map((entry, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                    {entry.name}
                                </div>
                                <span className="font-bold text-slate-800">{entry.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Department Profitability & Claims */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Departmental Profitability (Profit Drivers)</h3>
                    <div className="space-y-4">
                        {deptProfitData.map((dept, index) => (
                            <div key={dept.name}>
                                <div className="flex justify-between items-end mb-1">
                                    <span className="font-medium text-slate-700">{dept.name}</span>
                                    <span className="text-sm font-bold text-green-600">{isPrivacyMode ? '$****' : `$${dept.value}M`} <span className="text-slate-400 font-normal text-xs">Profit</span></span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${(dept.value / 1.5) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs text-slate-400 mt-1">{dept.visits} annual encounters • High Margin Svc</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-800">Claims Status (RCM)</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">94% Clean Rate</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Claims Submitted</div>
                            <div className="text-xl font-bold text-slate-800 mt-1">12,450</div>
                        </div>
                        <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                            <div className="text-xs text-red-500 font-medium uppercase tracking-wide">Denied (Action Req)</div>
                            <div className="text-xl font-bold text-red-700 mt-1">342</div>
                        </div>
                    </div>

                    <h4 className="text-sm font-bold text-slate-700 mb-3">Recent Denials (Require Attention)</h4>
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                                <tr>
                                    <th className="px-4 py-2">Claim ID</th>
                                    <th className="px-4 py-2">Amount</th>
                                    <th className="px-4 py-2">Reason</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { id: '#CLM-9021', amt: '$4,200', reason: 'Missing Auth', status: 'Pealing' },
                                    { id: '#CLM-9034', amt: '$1,850', reason: 'Coding Err', status: 'Review' },
                                    { id: '#CLM-9088', amt: '$12,500', reason: 'Not Covered', status: 'Final' },
                                ].map(row => (
                                    <tr key={row.id} className="bg-white">
                                        <td className="px-4 py-2 font-medium text-slate-700">{row.id}</td>
                                        <td className="px-4 py-2">{isPrivacyMode ? '****' : row.amt}</td>
                                        <td className="px-4 py-2 text-slate-500">{row.reason}</td>
                                        <td className="px-4 py-2"><span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">{row.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Shield size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-black tracking-tight mb-1">Financial Reconciliation Hub</h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Enterprise Tally & ERP Sync Status</p>
                            </div>
                            <div className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/30 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Synchronized
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl group hover:border-blue-500/30 transition-all cursor-pointer">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Tally Prime Sync</p>
                                <p className="text-xl font-black mb-1">98.4%</p>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[98%]" />
                                </div>
                                <p className="text-[8px] font-bold text-slate-400 mt-3 uppercase">Last Sync: 12m ago</p>
                            </div>
                            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl group hover:border-emerald-500/30 transition-all cursor-pointer">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Revenue Leakage AI</p>
                                <p className="text-xl font-black mb-1 text-emerald-400">0.05%</p>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[99%]" />
                                </div>
                                <p className="text-[8px] font-bold text-slate-400 mt-3 uppercase">All Anomalies Cleared</p>
                            </div>
                            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl group hover:border-rose-500/30 transition-all cursor-pointer">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Internal Audit Score</p>
                                <p className="text-xl font-black mb-1">A+</p>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-[95%]" />
                                </div>
                                <p className="text-[8px] font-bold text-slate-400 mt-3 uppercase">Target: ISO 27001</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 flex flex-col justify-center">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-6 font-black">Quick Actions</h4>
                    <div className="space-y-3">
                        <button className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100">Prepare Tax (GST) Filing</button>
                        <button className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100">Vendor Payment Audit</button>
                        <button className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">Trigger Global Reconciliation</button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center p-4">
                <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Shield size={12} />
                    HIPAA Secured: Financial data is encrypted at rest. Patient identifiers are masked in this view.
                </p>
            </div>
        </div>
    );
};

export default Finance;
