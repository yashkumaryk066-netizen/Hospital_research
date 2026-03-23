import React, { useState } from 'react';
import {
    FileText,
    Search,
    Filter,
    ArrowRight,
    Stethoscope,
    Clock,
    AlertCircle,
    CheckCircle,
    MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IPDRequestList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Requests Data
    const requests = [
        { id: 'REQ-2024-089', name: 'John Doe', age: 55, gender: 'Male', reason: 'Chest Pain', requestedBy: 'Emergency', department: 'Cardiology', priority: 'Critical', date: 'Today, 10:30 AM' },
        { id: 'REQ-2024-090', name: 'Jane Smith', age: 28, gender: 'Female', reason: 'Migraine', requestedBy: 'OPD (Dr. Lee)', department: 'Neurology', priority: 'Normal', date: 'Today, 11:45 AM' },
        { id: 'REQ-2024-091', name: 'Robert Brown', age: 62, gender: 'Male', reason: 'Fracture', requestedBy: 'Orthopedics', department: 'Orthopedics', priority: 'High', date: 'Yesterday, 04:20 PM' },
    ];

    return (
        <div className="space-y-6 animate-fade-in pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                        <FileText size={24} className="text-blue-600" />
                        IPD Admission Requests
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
                        Manage pending admission requests from OPD, ER, and Referrals
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search Request ID..."
                            className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
                    <div>
                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Total Pending</div>
                        <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">12</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        <Clock size={20} />
                    </div>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30 flex items-center justify-between">
                    <div>
                        <div className="text-xs font-bold text-red-600 dark:text-red-400 uppercase">Critical Priority</div>
                        <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">3</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold animate-pulse">
                        <AlertCircle size={20} />
                    </div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900/30 flex items-center justify-between">
                    <div>
                        <div className="text-xs font-bold text-green-600 dark:text-green-400 uppercase">Processed Today</div>
                        <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">8</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                        <CheckCircle size={20} />
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="px-6 py-4">Request ID</th>
                            <th className="px-6 py-4">Patient Details</th>
                            <th className="px-6 py-4">Clinical Info</th>
                            <th className="px-6 py-4">Source</th>
                            <th className="px-6 py-4 text-center">Priority</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {requests.map((req) => (
                            <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                <td className="px-6 py-4 font-mono font-medium text-slate-500">{req.id}</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-800 dark:text-white">{req.name}</div>
                                    <div className="text-xs text-slate-500">{req.age}Y • {req.gender}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-700 dark:text-slate-300">{req.reason}</div>
                                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                        <Stethoscope size={12} /> {req.department}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs font-bold">
                                        {req.requestedBy}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${req.priority === 'Critical' ? 'bg-red-100 text-red-700 border-red-200' :
                                            req.priority === 'High' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                                'bg-blue-100 text-blue-700 border-blue-200'
                                        }`}>
                                        {req.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => navigate('/ipd/admission')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-colors flex items-center gap-1 ml-auto"
                                    >
                                        Process Admit <ArrowRight size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default IPDRequestList;
