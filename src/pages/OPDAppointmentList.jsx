import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Clock,
    Calendar,
    CheckCircle,
    XCircle,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    User,
    Phone,
    FileText,
    Activity,
    Printer,
    Edit2,
    Trash2,
    ArrowRight
} from 'lucide-react';

const mockAppointments = [
    {
        id: "OPD-2024-001",
        patient: "Rajesh Kumar",
        age: 45,
        gender: "Male",
        mobile: "+91 98765 43210",
        doctor: "Dr. Sarah Wilson",
        dept: "Cardiology",
        date: "2024-03-15",
        time: "09:30 AM",
        status: "Completed",
        token: 12,
        payment: "Paid"
    },
    {
        id: "OPD-2024-002",
        patient: "Priya Singh",
        age: 28,
        gender: "Female",
        mobile: "+91 98123 45678",
        doctor: "Dr. James House",
        dept: "Neurology",
        date: "2024-03-15",
        time: "10:15 AM",
        status: "In Progress",
        token: 14,
        payment: "Paid"
    },
    {
        id: "OPD-2024-003",
        patient: "Amit Shah",
        age: 62,
        gender: "Male",
        mobile: "+91 99887 76655",
        doctor: "Dr. Emily Stones",
        dept: "General Medicine",
        date: "2024-03-15",
        time: "11:00 AM",
        status: "Pending",
        token: 18,
        payment: "Unpaid"
    },
    {
        id: "OPD-2024-004",
        patient: "Sita Devi",
        age: 55,
        gender: "Female",
        mobile: "+91 88776 65544",
        doctor: "Dr. Sarah Wilson",
        dept: "Cardiology",
        date: "2024-03-15",
        time: "11:45 AM",
        status: "Cancelled",
        token: 21,
        payment: "Refunded"
    },
    {
        id: "OPD-2024-005",
        patient: "Vikram Malhotra",
        age: 34,
        gender: "Male",
        mobile: "+91 77665 54433",
        doctor: "Dr. James House",
        dept: "Neurology",
        date: "2024-03-15",
        time: "12:30 PM",
        status: "Pending",
        token: 25,
        payment: "Paid"
    }
];

const StatusBadge = ({ status }) => {
    const styles = {
        'Completed': 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
        'In Progress': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
        'Pending': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
        'Cancelled': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status] || styles['Pending']} flex items-center justify-center w-24`}>
            {status}
        </span>
    );
};

const OPDAppointmentList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    return (
        <div className="space-y-6 animate-fade-in pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                        <FileText size={24} className="text-blue-600" />
                        Manage Appointments
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
                        View, edit, and track patient consultations
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Patient, ID..."
                            className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">
                        <Filter size={18} />
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
                        <Printer size={16} /> Export List
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Visits Today', value: '42', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                    { label: 'Completed', value: '28', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
                    { label: 'Waiting', value: '14', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                    { label: 'Cancelled', value: '3', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
                ].map((stat, i) => (
                    <div key={i} className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 ${stat.bg} transition-colors`}>
                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">{stat.label}</div>
                        <div className={`text-2xl font-black ${stat.color} mt-1`}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4">Appt ID</th>
                                <th className="px-6 py-4">Patient Details</th>
                                <th className="px-6 py-4">Doctor & Dept</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4 text-center">Token</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {mockAppointments.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-500">{row.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs ring-2 ring-white dark:ring-slate-900">
                                                {row.patient.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800 dark:text-white">{row.patient}</div>
                                                <div className="text-xs text-slate-500">{row.age}Y • {row.gender}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-700 dark:text-slate-300">{row.doctor}</div>
                                        <div className="text-xs text-slate-500">{row.dept}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                                            <Calendar size={14} className="text-slate-400" />
                                            {row.date}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                            <Clock size={14} className="text-slate-400" />
                                            {row.time}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-black text-lg text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                                            {row.token}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex justify-center">
                                        <StatusBadge status={row.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View/Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Cancel">
                                                <Trash2 size={16} />
                                            </button>
                                            <button className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-bold text-xs flex items-center gap-1 border border-transparent hover:border-purple-200">
                                                Convert to IPD <ArrowRight size={12} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/30">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Showing 1-5 of 45 appointments</span>
                    <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 text-slate-500 transition-all disabled:opacity-50">
                            <ChevronLeft size={18} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 text-slate-500 transition-all">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OPDAppointmentList;
