import React, { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    Activity,
    Calendar,
    FileText,
    LogOut,
    Settings,
    TestTube,
    ScanLine,
    Pill,
    DollarSign,
    Menu,
    X,
    Building,
    ClipboardList,
    Shield,
    BedDouble,
    ChevronDown,
    ChevronRight,
    Circle,
    UserPlus,
    FileInput,
    ArrowRightLeft,
    LogOut as DischargeIcon,
    BarChart3,
    HeartPulse as BrandIcon
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';

const SidebarItem = ({ icon: Icon, label, to, active, hasSubItems, isOpen, onToggle }) => (
    <div className="mx-3 mb-1">
        {hasSubItems ? (
            <button
                onClick={onToggle}
                className={clsx(
                    "w-full group flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 rounded-xl relative overflow-hidden",
                    active
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                )}
            >
                <Icon
                    size={20}
                    strokeWidth={active ? 2.5 : 2}
                    className={clsx(
                        "transition-colors duration-300",
                        active ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                    )}
                />
                <span className={clsx("tracking-wide z-10 flex-1 text-left", active && "font-semibold")}>{label}</span>
                <ChevronRight size={16} className={clsx("transition-transform duration-300", isOpen && "rotate-90")} />
            </button>
        ) : (
            <Link
                to={to}
                className={clsx(
                    "group flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 rounded-xl relative overflow-hidden",
                    active
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/20"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                )}
            >
                {active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                <Icon
                    size={20}
                    strokeWidth={active ? 2.5 : 2}
                    className={clsx(
                        "transition-colors duration-300",
                        active ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                    )}
                />
                <span className={clsx("tracking-wide z-10", active && "font-semibold")}>{label}</span>
                {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
                )}
            </Link>
        )}
    </div>
);

const SubMenuItem = ({ label, to, active }) => (
    <Link
        to={to}
        className={clsx(
            "flex items-center gap-3 px-4 py-2 pl-12 mx-3 text-sm transition-all duration-200 rounded-lg group relative",
            active ? "text-blue-400 bg-blue-500/10" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
        )}
    >
        <div className={clsx("w-1.5 h-1.5 rounded-full transition-all duration-300", active ? "bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]" : "bg-slate-600 group-hover:bg-slate-500")} />
        <span className="font-medium">{label}</span>
    </Link>
);

const Sidebar = ({ isOpen, onClose }) => {
    const { darkMode, user, setUser } = useStore();
    const location = useLocation();
    const navigate = useNavigate();
    const [expandedGroups, setExpandedGroups] = useState({
        'OPD Appointment': true,
        'IPD Admission': true
    });

    const handleLogout = () => {
        setUser(null);
        navigate('/landing');
    };

    const toggleGroup = (groupLabel) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupLabel]: !prev[groupLabel]
        }));
    };

    // RBAC Filter Logic
    const canAccess = (item) => {
        if (!user || user.role === 'Super Admin') return true;
        
        const rolePermissions = {
            'Doctor': ['/opd', '/triage', '/mlc', '/ipd', '/diagnosis', '/nursing', '/ot', '/neonatal', '/mortuary', '/organ-donation', '/laboratory', '/radiology', '/blood-bank', '/doctors', '/patients/profile'],
            'Nurse': ['/ipd/dashboard', '/ipd/beds', '/nursing', '/triage', '/neonatal', '/mortuary', '/patients/profile'],
            'Pharmacy': ['/pharmacy', '/stores', '/blood-bank'],
            'Patient': ['/dashboard', '/patients/profile', '/opd/list', '/laboratory']
        };

        const allowedPaths = rolePermissions[user.role] || [];
        
        if (item.subItems) {
            return item.subItems.some(sub => allowedPaths.some(path => sub.to.startsWith(path)));
        }
        
        return allowedPaths.some(path => item.to.startsWith(path));
    };

    const menuStructure = [
        {
            group: "MAIN SERVICES",
            items: [
                {
                    label: "OPD Appointment",
                    icon: ClipboardList,
                    isDropdown: true,
                    subItems: [
                        { label: "New Appointment", to: "/dashboard/opd/new" },
                        { label: "Manage Appointments", to: "/dashboard/opd/list" },
                        { label: "Emergency Triage", to: "/dashboard/triage" },
                        { label: "Ambulance Hub", to: "/dashboard/ambulance" },
                        { label: "MLC Cases", to: "/dashboard/mlc" }
                    ]
                },
                {
                    label: "IPD Management",
                    icon: BedDouble,
                    isDropdown: true,
                    subItems: [
                        { label: "IPD Dashboard", to: "/dashboard/ipd/dashboard" },
                        { label: "New Admission", to: "/dashboard/ipd/new" },
                        { label: "IPD Requests", to: "/dashboard/ipd/request" },
                        { label: "Ward Floor Map", to: "/dashboard/ipd/floormap" },
                        { label: "Bed Management", to: "/dashboard/ipd/beds" },
                        { label: "Physiotherapy & Rehab", to: "/dashboard/physio" },
                        { label: "Nursing (MAR/I&O)", to: "/dashboard/nursing" },
                        { label: "OT & ICU Management", to: "/dashboard/ot-icu" },
                        { label: "OT Booking", to: "/dashboard/ot" },
                        { label: "Patient Transfer", to: "/dashboard/ipd/transfer" },
                        { label: "Discharge", to: "/dashboard/ipd/discharge" }
                    ]
                },
                {
                    label: "Neonatal & Labour",
                    icon: Activity,
                    to: "/dashboard/neonatal",
                    isDropdown: false
                },
                {
                    label: "Death & Mortuary",
                    icon: FileText,
                    to: "/dashboard/mortuary",
                    isDropdown: false
                },
                {
                    label: "Organ Donation",
                    icon: Shield,
                    to: "/dashboard/organ-donation",
                    isDropdown: false
                }
            ]
        },
        {
            group: "CLINICAL & ANCILLARY",
            items: [
                {
                    label: "Laboratory",
                    to: "/dashboard/laboratory",
                    icon: TestTube,
                    isDropdown: false
                },
                {
                    label: "Radiology (RIS/PACS)",
                    to: "/dashboard/radiology",
                    icon: ScanLine,
                    isDropdown: false
                },
                {
                    label: "Pharmacy",
                    to: "/dashboard/pharmacy",
                    icon: Pill,
                    isDropdown: false
                },
                {
                    label: "Blood Bank",
                    icon: Activity,
                    to: "/dashboard/blood-bank",
                    isDropdown: false
                },
                {
                    label: "Stores & Warehouse",
                    to: "/dashboard/stores",
                    icon: Building,
                    isDropdown: false
                }
            ]
        },
        {
            group: "FINANCE & ADMIN",
            items: [
                {
                    label: "Billing & Finance",
                    to: "/dashboard/finance",
                    icon: DollarSign,
                    isDropdown: false
                },
                {
                    label: "Refund Management",
                    to: "/dashboard/refunds",
                    icon: DollarSign,
                    isDropdown: false
                },
                {
                    label: "Insurance & TPA",
                    to: "/dashboard/insurance",
                    icon: Shield,
                    isDropdown: false
                },
                {
                    label: "HR & Payroll",
                    to: "/dashboard/hr",
                    icon: Users,
                    isDropdown: false
                },
                {
                    label: "Asset & Maintenance",
                    to: "/dashboard/assets",
                    icon: LayoutDashboard,
                    isDropdown: false
                },
                {
                    label: "MIS & BI Reports",
                    to: "/dashboard/reports",
                    icon: BarChart3,
                    isDropdown: false
                },
                {
                    label: "Masters",
                    icon: ClipboardList,
                    isDropdown: true,
                    subItems: [
                        { label: "Doctor Master", to: "/dashboard/doctors" },
                        { label: "Service Master", to: "/dashboard/masters/services" },
                        { label: "Medication Master", to: "/dashboard/masters/medications" },
                        { label: "Ward & Bed Master", to: "/dashboard/masters/wards" },
                        { label: "Diagnosis (ICD-10)", to: "/dashboard/masters/diagnosis" }
                    ]
                },
                {
                    label: "Settings",
                    to: "/dashboard/settings",
                    icon: Settings,
                    isDropdown: false
                }
            ]
        }
    ].map(group => ({
        ...group,
        items: group.items.filter(canAccess)
    })).filter(group => group.items.length > 0);

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={clsx(
                    "fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm lg:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            <aside
                className={clsx(
                    "fixed top-0 left-0 z-50 h-screen w-[280px] bg-[#020617] border-r border-white/5 transition-transform duration-500 lg:translate-x-0 flex flex-col antialiased",
                    isOpen ? "translate-x-0 shadow-[40px_0_60px_-15px_rgba(0,0,0,0.5)]" : "-translate-x-full"
                )}
            >
                {/* Brand Header */}
                <div className="relative h-28 px-7 flex items-center gap-4 border-b border-white/[0.05] bg-gradient-to-b from-slate-950/80 to-transparent backdrop-blur-md">
                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-blue-500/30 blur-2xl group-hover:bg-blue-400/40 transition-all duration-700" />
                        <div className="relative w-12 h-12 bg-white flex items-center justify-center rounded-[1.25rem] shadow-2xl shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                            <BrandIcon size={24} className="text-blue-600" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-white tracking-tight leading-none">
                            Heal<span className="text-blue-500 italic">Care</span>
                            <span className="ml-1 text-[10px] font-black bg-blue-600 px-1.5 py-0.5 rounded-md align-middle">AI</span>
                        </span>
                        <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-[0.3em] font-mono">{user?.role || 'SYSTEM'}</p>
                    </div>
                </div>

                {/* Scrollable Menu */}
                <div className="flex-1 overflow-y-auto py-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent hover:scrollbar-thumb-slate-600">
                    {menuStructure.map((group, groupIndex) => (
                        <div key={group.group} className={clsx("mb-8 relative", groupIndex !== 0 && "pt-2")}>
                            {groupIndex !== 0 && (
                                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent opacity-50" />
                            )}
                            <div className="flex items-center gap-3 px-6 mb-3 group/header">
                                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest group-hover/header:text-blue-400 transition-colors duration-300">
                                    {group.group}
                                </span>
                                <div className="h-px flex-1 bg-slate-800 group-hover/header:bg-blue-900/50 transition-colors" />
                            </div>

                            <nav className="space-y-1">
                                {group.items.map((item) => (
                                    <React.Fragment key={item.label}>
                                        <SidebarItem
                                            icon={item.icon}
                                            label={item.label}
                                            to={item.to}
                                            active={item.isDropdown ? expandedGroups[item.label] : location.pathname === item.to}
                                            hasSubItems={item.isDropdown}
                                            isOpen={expandedGroups[item.label]}
                                            onToggle={() => toggleGroup(item.label)}
                                        />

                                        {/* Sub Items Animation */}
                                        <AnimatePresence initial={false}>
                                            {item.isDropdown && expandedGroups[item.label] && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                                    className="overflow-hidden space-y-0.5"
                                                >
                                                    {item.subItems.map((subItem) => (
                                                        <SubMenuItem
                                                            key={subItem.label}
                                                            label={subItem.label}
                                                            to={subItem.to}
                                                            active={location.pathname === subItem.to}
                                                        />
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </React.Fragment>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>

                {/* User Profile Footer */}
                <div className="p-4 border-t border-slate-800/60 bg-slate-900/50 backdrop-blur-xl">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group shadow-lg shadow-black/20"
                    >
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-slate-700 p-0.5 ring-2 ring-slate-700 group-hover:ring-blue-500/50 transition-all duration-300">
                                <img
                                    src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=0F172A&color=3B82F6&bold=true"}
                                    alt="User"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-200 group-hover:text-white truncate transition-colors text-left">
                                {user?.name || 'Guest User'}
                            </h4>
                            <p className="text-[10px] font-medium text-blue-400 truncate text-left">
                                {user?.role || 'Portal Access'}
                            </p>
                        </div>

                        <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center group-hover:bg-red-500/10 group-hover:text-red-400 transition-all">
                            <LogOut size={16} className="text-slate-400 transition-colors" />
                        </div>
                    </button>
                </div>

                {/* Pro Tier Card */}
                <div className="mx-3 mb-4">
                    <div className="relative bg-gradient-to-br from-blue-600/20 to-indigo-800/30 rounded-[1.5rem] p-5 border border-blue-500/20 overflow-hidden group">
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-700" />
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Shield size={16} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-white text-[10px] font-black uppercase tracking-widest leading-none">Enterprise Plan</p>
                                    <p className="text-blue-400 text-[8px] font-bold uppercase tracking-widest">HealCare AI Pro</p>
                                </div>
                            </div>
                            <p className="text-slate-400 text-[9px] font-bold leading-relaxed mb-4">
                                Unlock AI diagnostics, HL7 FHIR, & full audit suite for your hospital network.
                            </p>
                            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 transition-all text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/25 active:scale-95">
                                Upgrade to Pro →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                   <div className="flex items-center gap-2">
                      <BrandIcon size={14} className="text-slate-700" />
                      <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]">HealCare AI v2.0</p>
                   </div>
                   <p className="text-[8px] font-bold text-slate-700 mt-1">HIPAA · NABH · JCI Compliant</p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
