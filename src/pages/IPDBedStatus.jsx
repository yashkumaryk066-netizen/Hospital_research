import React, { useState } from 'react';
import {
    BedDouble,
    CheckCircle,
    Clock,
    AlertTriangle,
    Filter,
    Search,
    RefreshCw,
    MoreVertical,
    SprayCan, // For Cleaning
    Wrench,   // For Maintenance
    User
} from 'lucide-react';
import { clsx } from 'clsx';
import StatCard from '../components/dashboard/StatCard';

const IPDBedStatus = () => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedFloor, setSelectedFloor] = useState('Floor 2 - Orthopedics');

    // Bed Status: Available, Occupied, Cleaning, Maintenance
    const beds = [
        { id: '201', ward: 'General', status: 'Occupied', patient: 'John Doe', gender: 'M', time: '2d 4h' },
        { id: '202', ward: 'General', status: 'Available', patient: null },
        { id: '203', ward: 'General', status: 'Cleaning', patient: null, timeLeft: '15m' },
        { id: '204', ward: 'General', status: 'Occupied', patient: 'Sam Smith', gender: 'M', time: '5h' },
        { id: '205', ward: 'General', status: 'Maintenance', patient: null, issue: 'AC Repair' },
        { id: '206', ward: 'General', status: 'Available', patient: null },
        { id: '207', ward: 'General', status: 'Occupied', patient: 'Alex R.', gender: 'M', time: '1d' },
        { id: '208', ward: 'General', status: 'Cleaning', patient: null, timeLeft: '30m' },
        { id: '301', ward: 'Private', status: 'Occupied', patient: 'Sarah C.', gender: 'F', time: '4d' },
        { id: '302', ward: 'Private', status: 'Available', patient: null },
        { id: '303', ward: 'Private', status: 'Occupied', patient: 'Ellen R.', gender: 'F', time: '12h' },
        { id: '304', ward: 'ICU', status: 'Occupied', patient: 'Kyle R.', gender: 'M', time: 'Critical' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available': return 'bg-white border-green-200 text-green-700 hover:bg-green-50';
            case 'Occupied': return 'bg-blue-50 border-blue-200 text-blue-700';
            case 'Cleaning': return 'bg-amber-50 border-amber-200 text-amber-700';
            case 'Maintenance': return 'bg-slate-100 border-slate-200 text-slate-500 opacity-75';
            default: return 'bg-white border-slate-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Available': return <CheckCircle size={16} />;
            case 'Occupied': return <User size={16} />;
            case 'Cleaning': return <SprayCan size={16} />;
            case 'Maintenance': return <Wrench size={16} />;
            default: return <BedDouble size={16} />;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                        <BedDouble size={26} className="text-teal-600" />
                        Live Bed Status Board
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
                        Real-time housekeeping and occupancy view
                    </p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button className="px-4 py-2 bg-white text-teal-600 text-sm font-bold rounded-lg shadow-sm">Floor 2</button>
                    <button className="px-4 py-2 text-slate-500 text-sm font-bold hover:text-slate-700">Floor 3</button>
                    <button className="px-4 py-2 text-slate-500 text-sm font-bold hover:text-slate-700">ICU</button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-100 flex items-center justify-between">
                    <div>
                        <div className="text-xs font-bold text-green-600 uppercase">Available</div>
                        <div className="text-2xl font-black text-slate-800">3</div>
                    </div>
                    <CheckCircle className="text-green-500" size={24} />
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                    <div>
                        <div className="text-xs font-bold text-blue-600 uppercase">Occupied</div>
                        <div className="text-2xl font-black text-slate-800">6</div>
                    </div>
                    <User className="text-blue-500" size={24} />
                </div>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-between">
                    <div>
                        <div className="text-xs font-bold text-amber-600 uppercase">Cleaning</div>
                        <div className="text-2xl font-black text-slate-800">2</div>
                    </div>
                    <SprayCan className="text-amber-500" size={24} />
                </div>
                <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                        <div className="text-xs font-bold text-slate-500 uppercase">Maintenance</div>
                        <div className="text-2xl font-black text-slate-800">1</div>
                    </div>
                    <Wrench className="text-slate-400" size={24} />
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {['All', 'Available', 'Occupied', 'Cleaning', 'Maintenance'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={clsx(
                            "px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap",
                            filterStatus === status
                                ? "bg-slate-800 text-white border-slate-800"
                                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                        )}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Bed Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {beds.filter(b => filterStatus === 'All' || b.status === filterStatus).map((bed) => (
                    <div key={bed.id} className={`relative p-5 rounded-2xl border-2 transition-all group ${getStatusColor(bed.status)}`}>

                        <div className="flex justify-between items-start mb-4">
                            <span className="text-2xl font-black opacity-80">{bed.id}</span>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${bed.status === 'Available' ? 'bg-green-100 text-green-700' :
                                    bed.status === 'Cleaning' ? 'bg-amber-100 text-amber-700' :
                                        'bg-white/50'
                                }`}>
                                {getStatusIcon(bed.status)} {bed.status}
                            </span>
                        </div>

                        <div className="min-h-[60px]">
                            {bed.status === 'Occupied' && (
                                <div>
                                    <div className="font-bold text-lg leading-tight">{bed.patient}</div>
                                    <div className="text-xs opacity-70 mt-1">{bed.gender} • Admitted: {bed.time}</div>
                                </div>
                            )}
                            {bed.status === 'Available' && (
                                <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                                    <span className="text-xs font-medium">Ready for Admission</span>
                                </div>
                            )}
                            {bed.status === 'Cleaning' && (
                                <div>
                                    <div className="font-bold text-sm">Housekeeping Assigned</div>
                                    <div className="text-xs opacity-70 mt-1">Ready in ~{bed.timeLeft}</div>
                                    <div className="w-full bg-amber-200/50 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div className="h-full bg-amber-500 w-2/3 animate-pulse"></div>
                                    </div>
                                </div>
                            )}
                            {bed.status === 'Maintenance' && (
                                <div>
                                    <div className="font-bold text-sm text-slate-600">Blocked</div>
                                    <div className="text-xs text-slate-500 mt-1">Reason: {bed.issue}</div>
                                </div>
                            )}
                        </div>

                        {/* Actions Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-white via-white/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-2 rounded-b-2xl">
                            {bed.status === 'Cleaning' && (
                                <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg shadow-lg hover:bg-green-700">Mark Ready</button>
                            )}
                            {bed.status === 'Available' && (
                                <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-lg hover:bg-black">Admin</button>
                            )}
                            <button className="p-1.5 text-slate-400 hover:text-slate-800"><MoreVertical size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IPDBedStatus;
