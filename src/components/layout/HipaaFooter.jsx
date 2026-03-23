import React from 'react';
import { Lock, Eye, History, ArrowRight } from 'lucide-react';

const HipaaFooter = () => {
    return (
        <div className="border-t border-slate-200 mt-8 pt-6 pb-2 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div className="flex items-center gap-2">
                <Lock size={12} className="text-slate-400" />
                <span className="font-bold text-slate-500 uppercase tracking-widest">Role Based Access Control (RBAC) Active</span>
            </div>

            <div className="flex items-center gap-6 font-mono">
                <span>Last Modified: 16 Feb 2026, 10:42 AM</span>
                <div className="flex items-center gap-1.5">
                    <Eye size={12} />
                    Last Viewed By: <span className="text-slate-600 font-bold">Ravi Raj</span>
                </div>
            </div>

            <button className="flex items-center gap-1 text-primary hover:underline font-bold transition-colors group">
                View Audit Log <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
        </div>
    );
};

export default HipaaFooter;
