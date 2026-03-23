import React, { useState } from 'react';
import { 
    Users, 
    Stethoscope, 
    Pill, 
    Activity, 
    BedDouble, 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    Filter,
    CheckCircle,
    Building,
    FileText
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Masters = () => {
    const [activeTab, setActiveTab] = useState('doctors');
    const [searchTerm, setSearchTerm] = useState('');

    const tabs = [
        { id: 'doctors', label: 'Doctor Master', icon: Stethoscope },
        { id: 'services', label: 'Tariff & Service', icon: Activity },
        { id: 'tpa', label: 'TPA / Insurance', icon: Building },
        { id: 'medications', label: 'Medication Master', icon: Pill },
        { id: 'wards', label: 'Ward & Bed Master', icon: BedDouble },
        { id: 'diagnosis', label: 'ICD-10/11 Master', icon: FileText },
        { id: 'roles', label: 'RBAC (Roles)', icon: ShieldCheck },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Master Data Management</h1>
                    <p className="text-slate-500 text-sm mt-1 uppercase font-bold tracking-widest text-[10px]">Configure core hospital parameters & services</p>
                </div>
                <button className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl transition-all hover:scale-105 flex items-center gap-2">
                    <Plus size={16} /> Add New Entry
                </button>
            </div>

            {/* Sub-header Navigation */}
            <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all",
                            activeTab === tab.id 
                                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg shadow-slate-900/20" 
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                        )}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder={`Search ${activeTab}...`} 
                            className="w-full pl-9 pr-4 py-2 text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Title / Code</th>
                                <th className="px-6 py-4">Department / Group</th>
                                <th className="px-6 py-4">Attributes</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {activeTab === 'doctors' && [
                                { name: 'Dr. Gregory House', dept: 'Diagnostic Medicine', sub: 'Dept Head', status: 'Active' },
                                { name: 'Dr. James Wilson', dept: 'Oncology', sub: 'Senior Consultant', status: 'Active' },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900 dark:text-white">{item.name}</div>
                                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">DOC-{100+i}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="className text-xs font-bold text-slate-700 dark:text-slate-300">{item.dept}</div>
                                        <div className="text-[10px] text-slate-400">{item.sub}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-100 dark:border-blue-800 text-[9px] font-black uppercase rounded">OPD</span>
                                            <span className="px-2 py-0.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 border border-purple-100 dark:border-purple-800 text-[9px] font-black uppercase rounded">IPD</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-700 text-[9px] font-black uppercase rounded border border-green-100"><CheckCircle size={10} /> {item.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><Edit2 size={14} /></button>
                                            <button className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {activeTab === 'services' && [
                                { name: 'Consultation - General', cat: 'OPD Services', price: '₹ 500', tax: '0% (Exempt)' },
                                { name: 'CBC (Complete Blood Count)', cat: 'Laboratory', price: '₹ 350', tax: '5% GST' },
                                { name: 'X-Ray Chest PA', cat: 'Radiology', price: '₹ 800', tax: '5% GST' },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900 dark:text-white">{item.name}</div>
                                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">SRV-{200+i}</div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-600 dark:text-slate-400 text-xs">{item.cat}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-black text-slate-900 dark:text-white">{item.price}</div>
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{item.tax}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-black uppercase rounded border border-blue-100">Active</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"><Edit2 size={14} /></button>
                                    </td>
                                </tr>
                            ))}

                            {activeTab === 'medications' && [
                                { name: 'Amoxicillin 500mg', brand: 'Generic-A', stock: '120 Units', batch: 'BT-9921', expiry: 'Dec 2025' },
                                { name: 'Ibuprofen 400mg', brand: 'Advil', stock: '15 Units', batch: 'BT-8810', expiry: 'Jun 2024' },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">{item.name}</div>
                                        <div className="text-[10px] text-slate-400 uppercase font-mono tracking-tighter">Batch: {item.batch}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs font-bold text-slate-700">{item.brand}</div>
                                        <div className="text-[10px] text-slate-400">Inventory Status</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={clsx("font-black text-slate-900", parseInt(item.stock) < 20 ? "text-red-500" : "text-green-600")}>{item.stock}</div>
                                        <div className="text-[9px] font-bold text-slate-400">Alert Threshold: 20</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs font-bold text-slate-600">{item.expiry}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"><Edit2 size={14} /></button>
                                    </td>
                                </tr>
                            ))}

                            {activeTab === 'wards' && [
                                { name: 'ICU Unit 1', dept: 'Cardiology', beds: '12 / 12', status: 'Full' },
                                { name: 'Ward 4B (Private)', dept: 'General Medicine', beds: '4 / 10', status: 'Available' },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">{item.name}</div>
                                        <div className="text-[10px] text-slate-400 font-mono">Floor: 4th</div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-600 text-xs">{item.dept}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-black text-slate-900">{item.beds} Beds</div>
                                        <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={clsx("px-2 py-0.5 text-[9px] font-black uppercase rounded border", 
                                            item.status === 'Full' ? "bg-red-50 text-red-700 border-red-100" : "bg-green-50 text-green-700 border-green-100")}>{item.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"><Edit2 size={14} /></button>
                                    </td>
                                </tr>
                            ))}

                            {activeTab === 'tpa' && [
                                { name: 'Star Health', cat: 'Insurance Co.', tat: '48h', type: 'Cashless', limit: '₹ 5.0L' },
                                { name: 'FHPL', cat: 'TPA', tat: '72h', type: 'Reimbursement', limit: 'No Limit' },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-black text-slate-800 tracking-tight">{item.name}<div className="text-[10px] text-slate-400 font-mono">TPA-{500+i}</div></td>
                                    <td className="px-6 py-4 font-bold text-slate-600 text-xs">{item.cat}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{item.type}</div>
                                        <div className="text-[9px] font-bold text-slate-400 uppercase">Avg TAT: {item.tat}</div>
                                    </td>
                                    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase rounded border border-emerald-100 italic">Active</span></td>
                                    <td className="px-6 py-4 text-right"><button className="text-[10px] font-black uppercase text-blue-600 hover:underline">Policiy Matrix</button></td>
                                </tr>
                            ))}

                            {activeTab === 'roles' && [
                                { name: 'Super Admin', dept: 'Enterprise', users: '02', mfa: 'Required' },
                                { name: 'Sr. Clinician', dept: 'Clinical', users: '42', mfa: 'Optional' },
                                { name: 'Pharmacist', dept: 'Pharmacy', users: '08', mfa: 'Required' },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-black text-slate-900 tracking-tight">{item.name}<div className="text-[10px] text-slate-400 font-bold uppercase">Level: {i+1}</div></td>
                                    <td className="px-6 py-4 font-bold text-slate-600 text-xs">{item.dept}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{item.users} Active Users</div>
                                        <div className={clsx("text-[9px] font-black uppercase italic", item.mfa === 'Required' ? "text-rose-500" : "text-slate-400")}>MFA {item.mfa}</div>
                                    </td>
                                    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded border border-blue-100">Immutable</span></td>
                                    <td className="px-6 py-4 text-right"><button className="px-6 py-2 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase shadow-lg">Permissions</button></td>
                                </tr>
                            ))}

                            {activeTab === 'diagnosis' && [
                                { code: 'A09', desc: 'Infectious gastroenteritis and colitis, unspecified', cat: 'Intestinal Infectious' },
                                { code: 'I10', desc: 'Essential (primary) hypertension', cat: 'Hypertensive Diseases' },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-mono font-black text-blue-600">{item.code}</div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-800 text-xs truncate max-w-xs">{item.desc}</td>
                                    <td className="px-6 py-4 font-bold text-slate-400 text-[10px] uppercase tracking-tighter">{item.cat}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-0.5 bg-slate-50 text-slate-600 text-[9px] font-black uppercase rounded border border-slate-100">ICD-10</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"><Edit2 size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Masters;
