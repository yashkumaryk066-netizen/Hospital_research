import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, UserCircle, Sun, Moon, Grid, Command, Settings, LogOut, ChevronDown, HeartPulse } from 'lucide-react';
import useStore from '../../store/useStore';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ toggleSidebar }) {
    const { darkMode, toggleDarkMode, user, setUser } = useStore();
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    if (!user) return null;

    const handleLogout = () => {
        setUser(null);
        navigate('/landing');
    };

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 w-full px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-surface-border dark:border-slate-800 transition-colors duration-300">
            {/* Left Section */}
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-slate-500 hover:text-brand-dark dark:text-slate-400 dark:hover:text-white transition-colors lg:hidden"
                >
                    <Menu size={24} />
                </button>

                {/* Quick Access Grid */}
                <button className="hidden sm:flex items-center justify-center p-2 text-brand hover:bg-brand-subtle dark:hover:bg-slate-800 rounded-lg transition-colors group">
                    <Grid size={20} className="group-hover:scale-110 transition-transform" />
                </button>

                {/* Search Input */}
                <div className="relative hidden md:block w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search patients, doctors, records... (Cmd+K)"
                        className="w-full h-10 pl-10 pr-4 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 bg-surface-hover dark:bg-slate-950 border border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-brand-light focus:ring-4 focus:ring-brand-subtle rounded-xl transition-all outline-none"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50" title="Shortcut Command+K">
                        <Command size={12} />
                        <span className="text-[10px] font-bold">K</span>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 md:gap-6">
                
                {/* Language/Country Selector */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                   <div className="w-5 h-5 rounded-full overflow-hidden shadow-sm border border-white">
                      <img src="https://flagcdn.com/w40/in.png" alt="IN" className="w-full h-full object-cover scale-150" />
                   </div>
                   <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">IN</span>
                   <ChevronDown size={10} className="text-slate-400 group-hover:text-slate-600 transition-transform" />
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="p-2 text-slate-400 hover:text-amber-500 dark:text-slate-500 dark:hover:text-amber-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Toggle Theme"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Notifications */}
                <button className="relative p-2 text-slate-400 hover:text-brand transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800 group"
                    >
                        <div className="hidden text-right md:block">
                            <div className="text-sm font-bold text-slate-700 dark:text-white group-hover:text-brand transition-colors">{user.name}</div>
                            <div className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider text-right">{user.role}</div>
                        </div>
                        <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-br from-brand-light to-brand ring-2 ring-white dark:ring-slate-800 group-hover:ring-brand-subtle transition-all shadow-md">
                            <img
                                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=0F172A&color=fff&bold=true`}
                                alt="User"
                                className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-900"
                            />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
                        </div>
                        <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-transform duration-200" style={{ transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                                className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 p-2 z-50 origin-top-right"
                            >
                                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Signed in as</p>
                                     <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.email || 'admin@healcare.ai'}</p>
                                </div>
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                    <UserCircle size={16} /> My Profile
                                </button>
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                    <Settings size={16} /> Settings
                                </button>
                                <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
