import React, { useState } from 'react';
import { User, Activity, AlertTriangle, ShieldCheck, Droplet, Stethoscope, History } from 'lucide-react';
import { clsx } from 'clsx';

const PatientHeader = ({
    patient = {
        name: "Sarah Connor",
        age: 35,
        gender: "Female",
        dob: "12 Aug 1989",
        uhid: "UHID-992-8832",
        encounterId: "ENC-2026-001245",
        primaryDoctor: "Dr. Ram Sharma",
        bloodGroup: "B+",
        allergy: "NKDA", // or 'Penicillin'
        status: "Stable", // or 'Critical'
        isHighRisk: false
    }
}) => {
    const isCritical = patient.status === 'Critical' || patient.isHighRisk;
    const hasAllergy = patient.allergy && patient.allergy !== 'NKDA';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-5 w-full">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 border-2 border-slate-100 shadow-inner">
                            <User size={40} />
                        </div>
                        {isCritical && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white border-2 border-white animate-pulse shadow-sm">
                                <AlertTriangle size={12} fill="white" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-slate-900 leading-tight">{patient.name}</h1>

                            {/* Badges */}
                            <span className={clsx(
                                "text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider flex items-center gap-1",
                                hasAllergy ? "bg-red-50 text-red-600 border-red-200" : "bg-green-50 text-green-600 border-green-200"
                            )}>
                                <ShieldCheck size={10} /> Allergy: {patient.allergy}
                            </span>

                            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                                <Droplet size={10} className="fill-blue-700" /> Blood: {patient.bloodGroup}
                            </span>

                            {isCritical && (
                                <span className="bg-red-100 text-red-700 border border-red-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 animate-pulse">
                                    <Activity size={10} /> Critical
                                </span>
                            )}
                        </div>

                        {/* Demographics */}
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500 font-medium mb-2">
                            <div className="flex items-center gap-2">
                                <span>{patient.dob} ({patient.age}y)</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span>{patient.gender}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400">UHID:</span>
                                <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-xs">{patient.uhid}</span>
                            </div>
                        </div>

                        {/* Medical Context */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 font-medium border-t border-slate-100 pt-2 w-full max-w-2xl">
                            <div className="flex items-center gap-1.5">
                                <span className="text-slate-400 uppercase tracking-wide text-[10px] font-bold">Encounter:</span>
                                <span className="font-mono text-slate-600 bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">{patient.encounterId}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-slate-400 uppercase tracking-wide text-[10px] font-bold">Primary Dr:</span>
                                <span className="text-slate-900 font-bold flex items-center gap-1"><Stethoscope size={12} className="text-primary" /> {patient.primaryDoctor}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientHeader;
