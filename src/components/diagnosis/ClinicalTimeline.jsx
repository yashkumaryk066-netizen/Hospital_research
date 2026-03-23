import React from 'react';
import {
    Activity,
    FileText,
    Pill,
    FlaskConical,
    Stethoscope,
    Calendar,
    AlertCircle
} from 'lucide-react';
import { clsx } from 'clsx';

const TimelineItem = ({ icon: Icon, color, title, date, subtitle, urgency }) => (
    <div className="relative pl-8 pb-8 last:pb-0 border-l border-slate-200 dark:border-slate-700 ml-3">
        <div className={clsx(
            "absolute -left-3 top-0 w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center bg-white dark:bg-slate-900",
            color || "text-slate-400"
        )}>
            <Icon size={12} />
        </div>
        <div className="flex flex-col gap-1">
            <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">{date}</span>
                {urgency && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 uppercase tracking-wide">
                        {urgency}
                    </span>
                )}
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{title}</h4>
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
    </div>
);

const ClinicalTimeline = () => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden h-full flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-sm">
                    <Activity size={16} className="text-blue-500" /> Clinical Timeline
                </h3>
                <button className="text-[10px] uppercase font-bold text-blue-600 hover:underline">View All</button>
            </div>

            <div className="p-5 overflow-y-auto max-h-[400px] scrollbar-hide">
                <TimelineItem
                    icon={FlaskConical}
                    color="text-red-500 bg-red-50"
                    date="Today, 10:45 AM"
                    title="Critical Lab Result"
                    subtitle="Potassium: 2.8 mmol/L (Low)"
                    urgency="Critical"
                />
                <TimelineItem
                    icon={Stethoscope}
                    color="text-blue-500 bg-blue-50"
                    date="Today, 09:30 AM"
                    title="Cardiology Consult"
                    subtitle="Dr. Strange: 'Evidence of LVH on ECG'"
                />
                <TimelineItem
                    icon={Pill}
                    color="text-emerald-500 bg-emerald-50"
                    date="Yesterday, 20:00"
                    title="Medication Administered"
                    subtitle="Lisinopril 10mg PO given by Nurse Jackie"
                />
                <TimelineItem
                    icon={FileText}
                    color="text-slate-500 bg-slate-50"
                    date="14 Feb, 14:20"
                    title="Discharge Summary"
                    subtitle="Previous admission (Pneumonia)"
                />
                <TimelineItem
                    icon={AlertCircle}
                    color="text-orange-500 bg-orange-50"
                    date="12 Feb, 08:00"
                    title="Allergy Reaction"
                    subtitle="Mild rash reported after Penicillin"
                />
            </div>
        </div>
    );
};

export default ClinicalTimeline;
