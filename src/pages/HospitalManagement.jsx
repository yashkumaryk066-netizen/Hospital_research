import React, { useState } from 'react';
import { 
    Users, HardDrive, Shield, LayoutDashboard, Droplets, 
    DollarSign, Plus, Search, FileText, TrendingUp, 
    ShieldCheck, Clock, Package, AlertTriangle, 
    Skull, Heart, Settings, Briefcase, Truck
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const HospitalManagement = ({ defaultTab = 'hr' }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    const tabs = [
        { id: 'hr', label: 'HR & Staff', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'stores', label: 'Stores & Warehouse', icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
        { id: 'insurance', label: 'Insurance & TPA', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { id: 'assets', label: 'Asset & Maintenance', icon: LayoutDashboard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { id: 'mortuary', label: 'Mortuary (Death Reg)', icon: Skull, color: 'text-slate-600', bg: 'bg-slate-50' },
        { id: 'organ-donation', label: 'Organ Donation', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
        { id: 'dietary', label: 'Dietary & Canteen', icon: Droplets, color: 'text-amber-600', bg: 'bg-amber-50' },
        { id: 'housekeeping', label: 'Laundry & Housekeeping', icon: Truck, color: 'text-teal-600', bg: 'bg-teal-50' },
    ];

    return (
        <div className="space-y-6 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                        <Settings className="text-slate-400" size={24} />
                        Enterprise Resource Planning
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 uppercase font-bold tracking-widest text-[10px]">Hospital Operations · Back-office · specialized reporting</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Download MIS</button>
                    <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl transition-all hover:scale-105 flex items-center gap-2">
                        <Plus size={16} /> New Entry
                    </button>
                </div>
            </div>

            {/* Sub-header Navigation */}
            <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all",
                            activeTab === tab.id 
                                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        )}
                    >
                        <tab.icon size={16} className={activeTab === tab.id ? 'text-white' : tab.color} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <HospitalManagementRow label="Cleanliness Status" value="Sanitized (9:00 AM)" status="Clean" icon={Activity} />
                <HospitalManagementRow label="Safety Check" value="Passed" status="Complete" icon={Check} />
                <MetricCard label="Equipment Uptime" value="98.2%" trend="1 Down (CT)" />
                <div className="md:col-span-1 p-6 bg-slate-900 rounded-2xl shadow-xl flex flex-col justify-center relative overflow-hidden">
                    <TrendingUp className="absolute right-[-10px] bottom-[-10px] text-white/10" size={100} />
                    <h3 className="text-white font-black text-sm uppercase tracking-widest mb-1">Efficiency</h3>
                    <p className="text-slate-400 text-[10px] font-bold">Process TAT improved by 4m across all modules this week.</p>
                </div>
            </div>

            {/* Active Content Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Live {tabs.find(t=>t.id===activeTab)?.label} Queue</h3>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" placeholder="Search records..." className="pl-9 pr-4 py-2 text-xs border border-slate-100 bg-slate-50 rounded-xl w-64 outline-none focus:ring-2 focus:ring-slate-900/10 transition-all" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <AnimatePresence mode="wait">
                        <motion.table 
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="w-full text-left text-sm"
                        >
                            <thead className="bg-slate-50/50 text-slate-400 text-[9px] font-black uppercase tracking-widest border-b border-slate-50">
                                <tr>
                                    <th className="px-8 py-5">Identifier / Ref</th>
                                    <th className="px-8 py-5">Category / Department</th>
                                    <th className="px-8 py-5">Status / Analytics</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {activeTab === 'hr' && <HRRows />}
                                {activeTab === 'stores' && <StoreRows />}
                                {activeTab === 'assets' && <AssetRows />}
                                {activeTab === 'mortuary' && <MortuaryRows />}
                                {activeTab === 'organ-donation' && <OrganDonationRows />}
                                {activeTab === 'insurance' && <InsuranceRows />}
                                {activeTab === 'dietary' && <DietaryRows />}
                                {activeTab === 'housekeeping' && <HousekeepingRows />}
                            </tbody>
                        </motion.table>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ label, value, trend }) => (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-slate-300">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</span>
        <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">{value}</span>
            <span className="text-[10px] text-green-600 font-black mb-1.5 uppercase">{trend}</span>
        </div>
    </div>
);

// ─── Specialized Row Components ─────────────────────────────────────────────

const HRRows = () => [
    { name: 'Dr. Jane Cooper', pos: 'Sr. Consultant', dept: 'Cardiology', empId: 'EMP-9921', status: 'On Duty' },
    { name: 'Nurse Joy', pos: 'Staff Nurse', dept: 'ICU-3', empId: 'EMP-8812', status: 'Leave' },
    { name: 'Dr. John Watson', pos: 'Resident', dept: 'ER', empId: 'EMP-7721', status: 'On Duty' },
].map((item, i) => (
    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
        <td className="px-8 py-5"><div className="font-bold text-slate-900">{item.name}</div><div className="text-[10px] text-slate-400">ID: {item.empId}</div></td>
        <td className="px-8 py-5 text-xs font-bold text-slate-600">{item.dept} · {item.pos}</td>
        <td className="px-8 py-5"><span className={clsx("px-2 py-0.5 text-[9px] font-black uppercase rounded", item.status === 'On Duty' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700")}>{item.status}</span></td>
        <td className="px-8 py-5 text-right"><button className="text-[10px] font-black uppercase text-blue-600 hover:underline">Payroll</button></td>
    </tr>
));

const StoreRows = () => [
    { item: 'Surgical Gloves (M)', code: 'INV-772', qty: '1,200 Pairs', min: '200', status: 'In Stock' },
    { item: 'Propofol Inj 10ml', code: 'INV-442', qty: '18 Vials', min: '50', status: 'Critical Low' },
].map((item, i) => (
    <tr key={i} className="hover:bg-slate-50/50">
        <td className="px-8 py-5"><div className="font-bold text-slate-900">{item.item}</div><div className="text-[10px] text-slate-400">SKU: {item.code}</div></td>
        <td className="px-8 py-5 text-xs font-bold text-slate-600">Qty: {item.qty} · Min: {item.min}</td>
        <td className="px-8 py-5"><span className={clsx("px-2 py-0.5 text-[9px] font-black uppercase rounded", item.status === 'In Stock' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>{item.status}</span></td>
        <td className="px-8 py-5 text-right"><button className="text-[10px] font-black uppercase text-orange-600 hover:underline">Reorder</button></td>
    </tr>
));

const AssetRows = () => [
    { machine: 'GE Revolution CT 512', sn: 'GE-992-11', type: 'Preventive', due: '20 Mar 2026', status: 'Operating', contract: 'CMC Active', vendor: 'GE Healthcare' },
    { machine: 'Hamilton C6 Ventilator', sn: 'HM-112-04', type: 'Calibration', due: 'OVERDUE (18 Mar)', status: 'Maintenance', contract: 'AMC Active', vendor: 'Hamilton Med' },
].map((item, i) => (
    <tr key={i} className="hover:bg-slate-50/50 group border-l-4 border-transparent hover:border-indigo-600 transition-all">
        <td className="px-8 py-6"><div className="font-black text-slate-900">{item.machine}</div><div className="text-[10px] text-slate-400 font-bold uppercase">S/N: {item.sn} · {item.vendor}</div></td>
        <td className="px-8 py-6">
            <div className="text-xs font-black text-slate-700">{item.type} Maint.</div>
            <div className={clsx("text-[10px] font-bold uppercase", item.due.includes('OVERDUE') ? "text-rose-600 underline" : "text-slate-400")}>Target: {item.due}</div>
        </td>
        <td className="px-8 py-6">
            <div className="flex items-center gap-2">
                <span className={clsx("px-2 py-0.5 text-[9px] font-black uppercase rounded shadow-sm", item.status === 'Operating' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700")}>{item.status}</span>
                <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-indigo-50 text-indigo-600 border border-indigo-100">{item.contract}</span>
            </div>
        </td>
        <td className="px-8 py-6 text-right">
            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                 <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase hover:bg-indigo-50 hover:text-indigo-600">Calibration Log</button>
                 <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase shadow-lg shadow-indigo-500/20">Mark Fixed</button>
            </div>
        </td>
    </tr>
));

const MortuaryRows = () => [
    { name: 'Unknown Male (Brought Dead)', ref: 'MOR-2026-001', entry: '19 Mar 21:00', locker: 'L-04', status: 'Legal Clearance Pending', valuables: 'Mobile, Wallet (Sealed)', mccd: 'Pending' },
    { name: 'Satish Kumar', ref: 'MOR-2026-002', entry: '20 Mar 08:30', locker: 'L-12', status: 'Ready for Release', valuables: 'Released (Slip #902)', mccd: 'Generated (#9021)' },
].map((item, i) => (
    <tr key={i} className="hover:bg-slate-50/50 group border-l-4 border-transparent hover:border-slate-900 transition-all">
        <td className="px-8 py-6"><div className="font-black text-slate-900 uppercase tracking-tight">{item.name}</div><div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ref: {item.ref} · {item.entry}</div></td>
        <td className="px-8 py-6 font-bold text-slate-600 text-xs">
            <div className="flex items-center gap-2 mb-1"><span className="w-1.5 h-1.5 bg-slate-900 rounded-full" /> Locker: {item.locker}</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.valuables}</div>
        </td>
        <td className="px-8 py-6">
            <span className={clsx("px-3 py-1 text-[9px] font-black uppercase rounded-full border", item.status.includes('Pending') ? "bg-orange-50 text-orange-700 border-orange-100" : "bg-emerald-50 text-emerald-700 border-emerald-100")}>{item.status}</span>
            {item.mccd !== 'Pending' && <span className="ml-2 px-3 py-1 text-[9px] font-black uppercase rounded-full bg-blue-50 text-blue-700 border border-blue-100">MCCD {item.mccd}</span>}
        </td>
        <td className="px-8 py-6 text-right">
            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                 <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase hover:bg-slate-50">Valuables Log</button>
                 <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase shadow-lg">Issue MCCD</button>
            </div>
        </td>
    </tr>
));

const OrganDonationRows = () => [
    { donor: 'Amit Singhal', uhid: 'UHID-2012', type: 'Living Donor', organ: 'Kidney (Left)', status: 'Approved (NOTTO)' },
    { donor: 'Anonymous (Cadaver)', uhid: 'CAD-004', type: 'Cadaveric', organ: 'Multi-organ Retrieval', status: 'OT Pre-op' },
].map((item, i) => (
    <tr key={i} className="hover:bg-slate-50/50">
        <td className="px-8 py-5"><div className="font-bold text-slate-900">{item.donor}</div><div className="text-[10px] text-slate-400">{item.uhid}</div></td>
        <td className="px-8 py-5 text-xs font-bold text-slate-600">{item.type} · {item.organ}</td>
        <td className="px-8 py-5"><span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-rose-50 text-rose-700 border border-rose-100">{item.status}</span></td>
        <td className="px-8 py-5 text-right"><button className="text-[10px] font-black uppercase text-rose-600 hover:underline">Donor Registry</button></td>
    </tr>
));

const InsuranceRows = () => [
    { tpa: 'Apollo Munich', auth: '₹ 1.2L Requested', patient: 'Ravi Kumar', status: 'Awaiting Pre-auth' },
    { tpa: 'Star Health (Cashless)', auth: '₹ 85K Approved', patient: 'Pooja Hegde', status: 'Authorization Sent' },
].map((item, i) => (
    <tr key={i} className="hover:bg-slate-50/50">
        <td className="px-8 py-5"><div className="font-bold text-slate-900">{item.tpa}</div><div className="text-[10px] text-slate-400">Patient: {item.patient}</div></td>
        <td className="px-8 py-5 text-xs font-bold text-slate-600">{item.auth}</td>
        <td className="px-8 py-5"><span className={clsx("px-2 py-0.5 text-[9px] font-black uppercase rounded", item.status.includes('Approved') ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700")}>{item.status}</span></td>
        <td className="px-8 py-5 text-right"><button className="text-[10px] font-black uppercase text-emerald-600 hover:underline">Claim Details</button></td>
    </tr>
));

const DietaryRows = () => [
    { patient: 'Anita Desai', bed: 'ICU-B1', diet: 'Cardiac / Low Sodium', meals: 'Dinner Pending', status: 'Approved by Dietician' },
    { patient: 'Karan Mehra', bed: 'Ward 402', diet: 'Soft Diet / High Protein', meals: 'Fully Delivered', status: 'Patient Allergy Noted' },
].map((item, i) => (
    <tr key={i} className="hover:bg-slate-50/50">
        <td className="px-8 py-5"><div className="font-bold text-slate-900">{item.patient}</div><div className="text-[10px] text-slate-400">Bed: {item.bed}</div></td>
        <td className="px-8 py-5 text-xs font-bold text-slate-600">{item.diet} · {item.meals}</td>
        <td className="px-8 py-5"><span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-amber-100 text-amber-700 border border-amber-200">{item.status}</span></td>
        <td className="px-8 py-5 text-right"><button className="text-[10px] font-black uppercase text-amber-600 hover:underline">Meal Chart</button></td>
    </tr>
));

const HousekeepingRows = () => [
    { area: 'OT-4 (Main)', type: 'Sterilization', next: '22:00 PM', staff: 'Ramesh Balan', status: 'Cleaned' },
    { area: 'Room 204 (Linen)', type: 'Bed Change', next: 'ASAP', staff: 'Prakash G.', status: 'Pending' },
].map((item, i) => (
    <tr key={i} className="hover:bg-slate-50/50">
        <td className="px-8 py-5"><div className="font-bold text-slate-900">{item.area}</div><div className="text-[10px] text-slate-400">Staff: {item.staff}</div></td>
        <td className="px-8 py-5 text-xs font-bold text-slate-600">{item.type} · Next: {item.next}</td>
        <td className="px-8 py-5"><span className={clsx("px-2 py-0.5 text-[9px] font-black uppercase rounded", item.status === 'Cleaned' ? "bg-teal-100 text-teal-700" : "bg-rose-100 text-rose-700")}>{item.status}</span></td>
        <td className="px-8 py-5 text-right"><button className="text-[10px] font-black uppercase text-teal-600 hover:underline">Duty Log</button></td>
    </tr>
));

export default HospitalManagement;
