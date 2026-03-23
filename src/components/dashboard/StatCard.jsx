import React from 'react';
import { ArrowUp, ArrowDown, Activity } from 'lucide-react';
import { clsx } from 'clsx';

export default function StatCard({ title, value, trend, trendValue, icon: Icon, color, loading, subtext }) {
    if (loading) return <div className="animate-pulse bg-slate-200 h-32 rounded-xl w-full"></div>;

    // Extract raw color prompt to map to our new semantic tokens if needed, 
    // but for now we'll assume 'color' prop passes Tailwind classes like 'bg-blue-500'
    // We will enhance the wrapper to use the new 'surface' and 'border' tokens.

    const isPositive = trend === 'up';

    return (
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-300 group">

            {/* Background Decor */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 ${color?.replace('bg-', 'bg-').replace('shadow-', '')}`}></div>

            <div className="flex justify-between items-start relative z-10">
                <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                        {title}
                        {trend && (
                            <span className={clsx(
                                "flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-black",
                                isPositive
                                    ? "text-medical-green bg-green-50 dark:bg-green-900/20"
                                    : "text-medical-red bg-red-50 dark:bg-red-900/20"
                            )}>
                                {isPositive ? <ArrowUp size={8} strokeWidth={4} /> : <ArrowDown size={8} strokeWidth={4} />}
                                {trendValue}
                            </span>
                        )}
                    </p>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">{value}</h3>
                    {subtext && <p className="text-xs text-slate-400 font-medium mt-1">{subtext}</p>}
                </div>

                <div className={clsx(
                    "p-3 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12",
                    color // e.g., 'bg-blue-500 shadow-blue-500/30'
                )}>
                    <Icon size={22} className="text-white" strokeWidth={2.5} />
                </div>
            </div>

            {/* Micro-chart or sparkline placeholder */}
            <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-400">
                <Activity size={12} className="text-slate-300" />
                <span>Live Data</span>
            </div>
        </div>
    );
}
