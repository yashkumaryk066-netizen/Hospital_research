import React, { useState } from 'react';
import {
    BedDouble,
    Users,
    Clock,
    FileText,
    MoreVertical,
    Plus,
    Search,
    Filter,
    ArrowRight,
    AlertCircle,
    CheckCircle,
    LayoutGrid,
    List
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import { clsx } from 'clsx';

const IPDDashboard = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('list'); // list, grid (bed view)
    const [filterCategory, setFilterCategory] = useState('All');

    // Mock Active Patients (Admitted)
    const activePatients = [
        { id: 'IPD-2024-001', name: 'Sarah Connor', age: 35, ward: 'General Ward', bed: 'GW-104', doctor: 'Dr. Silberman', admitted: '12 Feb, 10:00 AM', status: 'Stable', type: 'Direct' },
        { id: 'IPD-2024-002', name: 'Kyle Reese', age: 42, ward: 'Trauma Center', bed: 'ICU-02', doctor: 'Dr. Venture', admitted: '13 Feb, 02:15 PM', status: 'Critical', type: 'Emergency' },
        { id: 'IPD-2024-003', name: 'Ellen Ripley', age: 32, ward: 'Private Room', bed: 'PR-301', doctor: 'Dr. Ash', admitted: '14 Feb, 09:30 AM', status: 'Recovering', type: 'Planned' },
        { id: 'IPD-2024-004', name: 'John Rambo', age: 38, ward: 'General Ward', bed: 'GW-105', doctor: 'Dr. Trautman', admitted: '15 Feb, 11:45 PM', status: 'Stable', type: 'Transfer' },
    ];

    return (
        <div className="space-y-6 animate-fade-in pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                        <BedDouble size={26} className="text-indigo-600" />
                        IPD Admission Desk
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
                        Manage in-patients, bed occupancy, and admissions
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/dashboard/ipd/request')}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                        <FileText size={18} /> View Requests
                    </button>
                    <button
                        onClick={() => navigate('/dashboard/ipd/new')}
                        className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
                    >
                        <Plus size={20} /> Direct Admission
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="Total Admitted"
                    value="142"
                    trend="stable"
                    trendValue="94% Occupancy"
                    icon={Users}
                    color="bg-blue-500 shadow-blue-500/30"
                />
                <StatCard
                    title="Available Beds"
                    value="18"
                    trend="down"
                    trendValue="Critically Low"
                    icon={BedDouble}
                    color="bg-emerald-500 shadow-emerald-500/30"
                />
                <StatCard
                    title="Discharges Due"
                    value="12"
                    trend="up"
                    trendValue="Today"
                    icon={Clock}
                    color="bg-orange-500 shadow-orange-500/30"
                />
                <StatCard
                    title="Pending Requests"
                    value="5"
                    trend="up"
                    trendValue="Needs Action"
                    icon={AlertCircle}
                    color="bg-red-500 shadow-red-500/30"
                />
            </div>

            {/* Main Content Area */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[500px]">

                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-800/20">
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                        {['All', 'General', 'Private', 'ICU', 'Emergency'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={clsx(
                                    "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                                    filterCategory === cat
                                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                                        : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search Patient / Bed..."
                                className="pl-9 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-indigo-500 bg-white dark:bg-slate-800"
                            />
                        </div>
                        <div className="flex bg-slate-200 dark:bg-slate-700 p-1 rounded-lg">
                            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}><List size={18} /></button>
                            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}><LayoutGrid size={18} /></button>
                        </div>
                    </div>
                </div>

                {/* Patient List View */}
                {viewMode === 'list' && (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4">Patient Info</th>
                                <th className="px-6 py-4">Location (Bed)</th>
                                <th className="px-6 py-4">Admitted Details</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {activePatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <Link to="/dashboard/diagnosis" className="flex items-center gap-3 group-hover:translate-x-1 transition-transform">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 text-sm">
                                                {patient.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800 dark:text-white group-hover:text-indigo-600">{patient.name}</div>
                                                <div className="text-xs text-slate-500">{patient.id} • {patient.age}Y</div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800 dark:text-white">{patient.bed}</div>
                                        <div className="text-xs text-slate-500">{patient.ward}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-700 dark:text-slate-300 font-medium">{patient.admitted}</div>
                                        <div className="text-xs text-slate-500 flex items-center gap-1">
                                            <span className={`w-1.5 h-1.5 rounded-full ${patient.type === 'Emergency' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                                            {patient.type} Admission
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={clsx(
                                            "px-2.5 py-1 rounded-full text-xs font-bold border",
                                            patient.status === 'Critical' ? "bg-red-50 text-red-700 border-red-200 animate-pulse" :
                                                "bg-green-50 text-green-700 border-green-200"
                                        )}>
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Grid/Bed View Mockup */}
                {viewMode === 'grid' && (
                    <div className="p-8 text-center text-slate-500">
                        <BedDouble size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-bold">Bed Management View</h3>
                        <p>Interactive floor map loaded here...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IPDDashboard;
