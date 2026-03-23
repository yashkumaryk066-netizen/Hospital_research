import React, { useState } from 'react';
import {
    Calendar as CalendarIcon,
    Clock,
    User,
    Search,
    Filter,
    Plus,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    MapPin,
    Phone,
    Video,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

const Appointments = () => {
    const [view, setView] = useState('week'); // day, week, month
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Mock Data
    const stats = [
        { title: "Total Appointments", value: "124", trend: "up", trendValue: "12%", icon: CalendarIcon, color: "bg-blue-500" },
        { title: "Confirmed", value: "86", trend: "up", trendValue: "5%", icon: CheckCircle, color: "bg-green-500" },
        { title: "Pending Request", value: "28", trend: "down", trendValue: "2%", icon: Clock, color: "bg-orange-500" },
        { title: "Cancelled", value: "10", trend: "down", trendValue: "1%", icon: XCircle, color: "bg-red-500" },
    ];

    const appointments = [
        { id: 1, patient: "Sarah Connor", doctor: "Dr. Silberman", type: "In-Person", time: "09:00 AM", status: "Confirmed", department: "Psychiatry" },
        { id: 2, patient: "Kyle Reese", doctor: "Dr. Venture", type: "Video", time: "10:30 AM", status: "Pending", department: "Orthopedics" },
        { id: 3, patient: "Ellen Ripley", doctor: "Dr. Ash", type: "In-Person", time: "11:45 AM", status: "Confirmed", department: "Cardiology" },
        { id: 4, patient: "Rick Deckard", doctor: "Dr. Tyrell", type: "Emergency", time: "02:15 PM", status: "Cancelled", department: "Ophthalmology" },
    ];

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Appointment Scheduling</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage patient bookings and doctor schedules</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                        {['Day', 'Week', 'Month'].map(v => (
                            <button
                                key={v}
                                onClick={() => setView(v.toLowerCase())}
                                className={clsx(
                                    "px-4 py-1.5 text-sm font-bold rounded-lg transition-all",
                                    view === v.toLowerCase() ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                    <button className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-blue-600 shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] flex items-center gap-2">
                        <Plus size={18} />
                        Book Appointment
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-320px)] min-h-[600px]">
                {/* Calendar Grid */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                    {/* Calendar Header */}
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ChevronLeft size={20} /></button>
                            <h2 className="text-lg font-bold text-slate-800">February 2024</h2>
                            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ChevronRight size={20} /></button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><Filter size={18} /></button>
                            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><Search size={18} /></button>
                        </div>
                    </div>

                    {/* Calendar Body (Week View) */}
                    <div className="flex-1 overflow-y-auto flex flex-col">
                        <div className="grid grid-cols-8 border-b border-slate-100 sticky top-0 bg-white z-10">
                            <div className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center border-r border-slate-50">Time</div>
                            {weekDays.map((day, i) => (
                                <div key={day} className="p-4 text-center border-r border-slate-50 last:border-0 relative group cursor-pointer hover:bg-slate-50">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{day}</div>
                                    <div className={clsx(
                                        "w-8 h-8 rounded-full flex items-center justify-center mx-auto text-sm font-bold transition-colors",
                                        i === 2 ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-slate-700 group-hover:bg-slate-200"
                                    )}>
                                        {12 + i}
                                    </div>
                                    {i === 2 && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary mb-1"></div>}
                                </div>
                            ))}
                        </div>
                        <div className="flex-1 relative">
                            {/* Grid Lines */}
                            {timeSlots.map((time, i) => (
                                <div key={time} className="grid grid-cols-8 border-b border-slate-50 h-24">
                                    <div className="p-2 text-xs font-bold text-slate-400 text-center border-r border-slate-50 relative -top-3 bg-white">{time}</div>
                                    {weekDays.map((day, d) => (
                                        <div key={`${day}-${time}`} className="border-r border-slate-50 last:border-0 relative hover:bg-slate-50/50 transition-colors group">
                                            <button className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                                <Plus size={16} className="text-primary/50" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            {/* Events Overlay (Mock) */}
                            <div className="absolute top-[10px] left-[12.5%] w-[12.5%] h-20 p-1 z-10">
                                <div className="w-full h-full bg-blue-50 border-l-4 border-blue-500 rounded p-2 text-xs hover:scale-105 transition-transform cursor-pointer shadow-sm">
                                    <div className="font-bold text-blue-900 truncate">Sarah Connor</div>
                                    <div className="text-blue-700 truncate">Dr. Silberman</div>
                                </div>
                            </div>
                            <div className="absolute top-[110px] left-[37.5%] w-[12.5%] h-20 p-1 z-10">
                                <div className="w-full h-full bg-purple-50 border-l-4 border-purple-500 rounded p-2 text-xs hover:scale-105 transition-transform cursor-pointer shadow-sm">
                                    <div className="font-bold text-purple-900 truncate">Kyle Reese</div>
                                    <div className="text-purple-700 truncate">Video Consult</div>
                                </div>
                            </div>
                            <div className="absolute top-[210px] left-[62.5%] w-[12.5%] h-20 p-1 z-10">
                                <div className="w-full h-full bg-red-50 border-l-4 border-red-500 rounded p-2 text-xs hover:scale-105 transition-transform cursor-pointer opacity-60 grayscale shadow-sm">
                                    <div className="font-bold text-red-900 truncate">Rick Deckard</div>
                                    <div className="text-red-700 truncate">Cancelled</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Panel: Upcoming List */}
                <div className="w-full lg:w-80 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                    <div className="p-5 border-b border-slate-100">
                        <h3 className="font-bold text-slate-800">Upcoming Schedule</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {appointments.map(apt => (
                            <div key={apt.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-bold text-slate-900">{apt.patient}</div>
                                    <div className={clsx(
                                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide",
                                        apt.status === 'Confirmed' ? "bg-green-100 text-green-700" :
                                            apt.status === 'Pending' ? "bg-orange-100 text-orange-700" :
                                                "bg-red-100 text-red-700"
                                    )}>{apt.status}</div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                                    <Clock size={12} /> {apt.time}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                    <User size={12} /> {apt.doctor}
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
                                    <div className="text-xs font-bold text-primary">{apt.department}</div>
                                    {apt.type === 'Video' ? <Video size={14} className="text-purple-500" /> : <MapPin size={14} className="text-slate-400" />}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-slate-100">
                        <button className="w-full py-2.5 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                            View Full Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointments;
