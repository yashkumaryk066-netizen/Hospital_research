import React, { useState } from 'react';
import { 
  TrendingUp, Activity, Users, DollarSign, 
  Download, Filter, Calendar, BarChart3, 
  PieChart, ArrowUpRight, ArrowDownRight,
  Clock, Bed, TestTube, ScanLine, Pill
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area,
  PieChart as RePieChart, Pie, Cell 
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 45.2, visits: 1200 },
  { name: 'Feb', revenue: 52.8, visits: 1450 },
  { name: 'Mar', revenue: 48.9, visits: 1380 },
  { name: 'Apr', revenue: 61.2, visits: 1800 },
  { name: 'May', revenue: 55.4, visits: 1620 },
  { name: 'Jun', revenue: 68.7, visits: 2100 },
];

const deptRevenue = [
  { name: 'OPD', value: 25.4, color: '#3B82F6' },
  { name: 'IPD', value: 42.8, color: '#10B981' },
  { name: 'Lab', value: 15.2, color: '#8B5CF6' },
  { name: 'Rad', value: 12.6, color: '#F59E0B' },
  { name: 'Pharma', value: 18.9, color: '#EF4444' },
];

const bedStats = [
  { name: 'General Ward', occupied: 45, total: 60 },
  { name: 'Semi-Private', occupied: 22, total: 25 },
  { name: 'Private Room', occupied: 14, total: 15 },
  { name: 'ICU / CCU', occupied: 11, total: 12 },
  { name: 'Emergency', occupied: 6, total: 10 },
];

const MISReports = () => {
  const [timeRange, setTimeRange] = useState('This Month');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <BarChart3 className="text-blue-600" size={28} />
            Executive MIS & BI Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1 uppercase font-black tracking-widest text-[10px]">Strategic Insights · Revenue Analysis · Operational Metrics</p>
        </div>
        <div className="flex gap-2">
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition-all">
               <Calendar size={16} className="text-slate-400" />
               <span className="text-xs font-black text-slate-700">{timeRange}</span>
            </div>
            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/30 flex items-center gap-2 hover:bg-blue-700">
               <Download size={16} /> Export Master Report
            </button>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <ReportMetric label="Consolidated Revenue" value="₹ 1.24 Cr" trend="+15.2%" isUp={true} icon={DollarSign} color="blue" />
         <ReportMetric label="Patient Footfall" value="12,482" trend="+8.4%" isUp={true} icon={Users} color="emerald" />
         <ReportMetric label="Bed Occupancy" value="82.4%" trend="-2.1%" isUp={false} icon={Bed} color="indigo" />
         <ReportMetric label="Average TAT (Min)" value="42.8" trend="-5.0%" isUp={true} icon={Clock} color="purple" reverseColor={true} />
      </div>

      {/* Chart Section 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                  <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Revenue vs Patient Visits Trend</h3>
                  <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-400" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visits</span>
                      </div>
                  </div>
              </div>
              <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                          <defs>
                              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                              </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" tick={{fontSize:10, fontWeight:900, fill:'#94a3b8'}} axisLine={false} tickLine={false} />
                          <YAxis tick={{fontSize:10, fontWeight:900, fill:'#94a3b8'}} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{borderRadius:'12px', border:'none', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                          <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                          <Area type="monotone" dataKey="visits" stroke="#10B981" strokeWidth={3} fill="none" strokeDasharray="5 5" />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-8 text-center">Revenue Breakdown by Source</h3>
              <div className="h-64 relative">
                  <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                          <Pie
                            data={deptRevenue}
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {deptRevenue.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                      </RePieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</span>
                      <span className="text-xl font-black text-slate-800">114.9 L</span>
                  </div>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
                  {deptRevenue.map(dept => (
                      <div key={dept.name} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{backgroundColor:dept.color}} />
                          <span className="text-[10px] font-black text-slate-800 uppercase">{dept.name}</span>
                          <span className="text-[10px] font-bold text-slate-400">₹{dept.value}L</span>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Bed Occupancy MIS Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest">Real-time Bed Census MIS</h3>
                  <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase">Live Update</span>
              </div>
              <div className="p-4 space-y-4">
                  {bedStats.map(stat => (
                      <div key={stat.name} className="space-y-1.5">
                          <div className="flex justify-between items-end">
                              <span className="text-xs font-black text-slate-700">{stat.name}</span>
                              <span className="text-[10px] font-bold text-slate-400">{stat.occupied} / {stat.total} Occupied ({( (stat.occupied/stat.total)*100 ).toFixed(1)}%)</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(stat.occupied/stat.total)*100}%` }}
                                className={clsx('h-full transition-all', (stat.occupied/stat.total) > 0.9 ? 'bg-red-500' : 'bg-blue-500')}
                              />
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest">Turnaround Time (TAT) Analytics</h3>
              </div>
              <div className="p-4 space-y-4">
                  {[
                    { label: 'OPD Reg. to Triage', current: '12m', target: '10m', pct: 85, color: 'bg-green-500' },
                    { label: 'Triage to Consultation', current: '28m', target: '20m', pct: 65, color: 'bg-orange-500' },
                    { label: 'Consultation to Pharmacy', current: '15m', target: '15m', pct: 100, color: 'bg-blue-500' },
                    { label: 'Sample to Lab Result', current: '120m', target: '90m', pct: 55, color: 'bg-red-500' },
                    { label: 'IPD Discharge Clearance', current: '55m', target: '60m', pct: 105, color: 'bg-indigo-500' },
                  ].map(tat => (
                    <div key={tat.label} className="space-y-1.5">
                        <div className="flex justify-between items-end">
                            <span className="text-xs font-black text-slate-700">{tat.label}</span>
                            <span className="text-[10px] font-bold text-slate-400">Current: {tat.current} · Target: {tat.target}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(tat.pct, 100)}%` }}
                                className={clsx('h-full', tat.color)}
                            />
                        </div>
                    </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

const ReportMetric = ({ label, value, trend, isUp, icon: Icon, color, reverseColor = false }) => {
  const getColors = () => {
    switch(color) {
      case 'blue': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'emerald': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'indigo': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'purple': return 'bg-purple-50 text-purple-600 border-purple-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const trendUp = isUp ? !reverseColor : reverseColor;

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
       <div className={clsx('w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border transition-all group-hover:scale-110', getColors())}>
          <Icon size={24} />
       </div>
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
       <div className="flex items-center gap-3 mt-1">
          <span className="text-2xl font-black text-slate-900">{value}</span>
          <div className={clsx('flex items-center text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border', 
            trendUp ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100')}>
            {isUp ? <ArrowUpRight size={10} className="mr-1" /> : <ArrowDownRight size={10} className="mr-1" />}
            {trend}
          </div>
       </div>
       <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-slate-50 rounded-full -z-10 opacity-50 group-hover:scale-150 transition-all duration-700" />
    </div>
  );
};

export default MISReports;
