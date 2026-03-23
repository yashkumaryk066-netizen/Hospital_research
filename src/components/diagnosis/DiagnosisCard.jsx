import React, { useState } from 'react';
import {
    Search,
    AlertTriangle,
    Trash2,
    Plus,
    Stethoscope,
    FileText,
    Calendar,
    Activity,
    ShieldAlert
} from 'lucide-react';
import { clsx } from 'clsx';

const EnhancedDiagnosisCard = () => {
    const [secondaryDiagnoses, setSecondaryDiagnoses] = useState([
        { id: 1, name: "Hypertension", icd: "I10", type: "Confirmed" }
    ]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative group transition-all hover:shadow-md">
            {/* Header Strip */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Stethoscope size={18} className="text-primary" />
                    Assessment & Diagnosis
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">
                    ICD-10 / SNOMED Enabled
                </span>
            </div>

            <div className="p-6 space-y-6">

                {/* PRIMARY DIAGNOSIS ROW */}
                <div className="grid grid-cols-1 gap-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        Primary Diagnosis <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search diagnosis by name or ICD-10 code..."
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                            <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">ICD-10</span>
                            <span className="text-[10px] font-bold text-slate-400">SNOMED</span>
                        </div>
                    </div>
                </div>

                {/* ROW 2: Type & Severity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type</label>
                        <div className="relative">
                            <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary/20">
                                <option>Confirmed</option>
                                <option>Provisional</option>
                                <option>Differential</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Severity</label>
                        <div className="relative">
                            <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary/20">
                                <option>Mild</option>
                                <option>Moderate</option>
                                <option>Severe</option>
                                <option>Critical</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ROW 3: Onset & Laterality */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Onset Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="date"
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Laterality</label>
                        <div className="flex gap-2">
                            {['Left', 'Right', 'Bilateral', 'N/A'].map((opt) => (
                                <button key={opt} className="flex-1 py-2.5 text-xs font-bold border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-600 focus:bg-primary focus:text-white focus:border-primary">
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ROW 4: Clinical Notes */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <FileText size={12} /> Clinical Notes
                    </label>
                    <textarea
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm min-h-[96px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-shadow"
                        placeholder="Enter detailed clinical findings, observations, and supporting evidence..."
                    ></textarea>
                </div>

                {/* ROW 5: Secondary Diagnosis Repeater */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Secondary Diagnoses</label>
                        <button className="text-xs font-bold text-primary hover:text-blue-700 flex items-center gap-1 transition-colors">
                            <Plus size={14} /> Add Secondary
                        </button>
                    </div>

                    {secondaryDiagnoses.map((diag) => (
                        <div key={diag.id} className="flex items-center gap-2 animate-fade-in group">
                            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 flex items-center justify-between shadow-sm group-hover:border-slate-300">
                                <span className="flex items-center gap-2">
                                    {diag.name}
                                    <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold border border-blue-200">{diag.icd}</span>
                                </span>
                                <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-100">{diag.type}</span>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}

                    <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-xs font-bold hover:border-primary hover:text-primary hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                        <Plus size={16} /> Add Co-morbidity / Secondary Diagnosis
                    </button>
                </div>

            </div>
        </div>
    );
};

export default EnhancedDiagnosisCard;
