import React, { useState } from 'react';
import {
    Pill,
    Search,
    ShoppingCart,
    AlertTriangle,
    History,
    FileText
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { clsx } from 'clsx';

const Pharmacy = () => {
    const [activeTab, setActiveTab] = useState('inventory');
    const [narcoticVault, setNarcoticVault] = useState(false);
    const [interactionAlert, setInteractionAlert] = useState(null);

    const stats = [
        { title: 'Dispensed Today', value: '142', icon: FileText, color: 'bg-blue-600', trend: 'up', trendValue: '+12%' },
        { title: 'Critical Stock', value: '08', icon: AlertTriangle, color: 'bg-rose-500', trend: 'down', trendValue: '-2' },
        { title: 'Narcotics (Locked)', value: '24', icon: Shield, color: 'bg-slate-900', trend: 'neutral', trendValue: 'Secure' },
        { title: 'Revenue (Pharmacy)', value: '$4.2k', icon: Pill, color: 'bg-emerald-600', trend: 'up', trendValue: '+18%' },
    ];

    return (
        <div className="space-y-6 pb-20 animate-fade-in px-4 relative">
            
            {/* NARCOTIC VAULT & DUAL-AUTH OVERLAY */}
            <AnimatePresence>
                {narcoticVault && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[140] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-6">
                         <div className="bg-white rounded-[3rem] p-12 max-w-xl w-full shadow-[0_0_100px_rgba(30,41,59,0.5)] space-y-10 relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-12 opacity-5"><Shield size={200} className="text-slate-900" /></div>
                             <button onClick={() => setNarcoticVault(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-800 transition-colors"><X size={24} /></button>
                             
                             <div className="text-center space-y-3">
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic">Narcotic Vault Access</h2>
                                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">Authorized Personnel Only (Schedule X)</p>
                             </div>

                             <div className="space-y-6">
                                <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 flex items-center justify-between group hover:border-slate-800 transition-all cursor-pointer">
                                   <div className="flex items-center gap-4">
                                       <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white"><Shield size={18} /></div>
                                       <div>
                                           <p className="text-sm font-black text-slate-800">Morphine 10mg Inj.</p>
                                           <p className="text-[10px] font-bold text-slate-400">STOCK: 12 AMPOULES</p>
                                       </div>
                                   </div>
                                   <input type="number" placeholder="QTY" className="w-16 bg-white border border-slate-200 rounded-lg p-2 text-center text-xs font-black" />
                                </div>
                             </div>

                             <div className="bg-slate-900 p-8 rounded-[2.5rem] space-y-6">
                                <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Dual-Witness Authentication Required</p>
                                <div className="grid grid-cols-2 gap-4">
                                   <input type="password" placeholder="PHARMACIST PIN" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-xs font-black text-white outline-none focus:border-blue-500 transition-all" />
                                   <input type="password" placeholder="DOCTOR PIN" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-xs font-black text-white outline-none focus:border-emerald-500 transition-all" />
                                </div>
                                <button className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Authorize Dispense</button>
                             </div>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                         <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                         Enterprise Pharmacy Hub
                    </h2>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1 ml-4">G-DNP Certified Dispensing · Real-time Narcotic Tracking</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setNarcoticVault(true)}
                        className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/30 flex items-center gap-2 hover:bg-slate-800 transition-all"
                    >
                        <Shield size={14} /> Narcotic Registry
                    </button>
                    <button 
                        className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 flex items-center gap-4 hover:scale-105 transition-all"
                    >
                        <FileText size={14} /> Scan Prescription QR
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all cursor-pointer">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.title}</p>
                            <p className="text-2xl font-black text-slate-800 mt-1">{s.value}</p>
                        </div>
                        <div className={clsx('w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg', s.color)}>
                            <s.icon size={20} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
                    <div className="flex bg-slate-200 p-1 rounded-lg self-start">
                        {['inventory', 'dispensing', 'sales'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={clsx(
                                    "px-4 py-1.5 text-sm font-medium rounded-md transition-all capitalize",
                                    activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" placeholder="Search medications..." className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black tracking-widest border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Medication & Batch</th>
                                <th className="px-6 py-4">Status & Stock</th>
                                <th className="px-6 py-4">Unit Price</th>
                                <th className="px-6 py-4">Expiry</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { id: 'RX-001', name: 'Amoxicillin 500mg', batch: 'BT-9921', stock: 120, unit: 'Capsules', expiry: '2025-12-01', price: '$15.00', movement: 'Sale' },
                                { id: 'RX-002', name: 'Ibuprofen 400mg', batch: 'BT-8810', stock: 15, unit: 'Tablets', expiry: '2024-06-15', price: '$8.50', movement: 'Low' },
                                { id: 'RX-005', name: 'Pantoprazole 40mg', batch: 'BT-4421', stock: 450, unit: 'Tablets', expiry: '2024-05-10', price: '$12.00', movement: 'Expiring' },
                            ].map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">{item.name}</div>
                                        <div className="text-[10px] font-mono text-slate-400 mt-1 uppercase">Batch: {item.batch} • {item.id}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col gap-1 flex-1 min-w-[100px]">
                                                <div className="flex justify-between text-[10px] font-bold">
                                                    <span className={clsx(item.stock < 20 ? "text-red-500" : "text-slate-400")}>{item.stock} in stock</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={clsx("h-full rounded-full transition-all", 
                                                        item.stock < 20 ? "bg-red-500" : 
                                                        item.stock < 50 ? "bg-orange-400" : "bg-emerald-500"
                                                    )} style={{ width: `${Math.min(item.stock, 100)}%` }}></div>
                                                </div>
                                            </div>
                                            {item.movement === 'Expiring' && <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-black uppercase rounded border border-orange-100 animate-pulse">Near Expiry</span>}
                                            {item.movement === 'Low' && <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-black uppercase rounded border border-red-100">Critical</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-black text-slate-700">{item.price}</div>
                                        <div className="text-[10px] text-slate-400 font-bold">Margin: 15%</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={clsx("font-bold text-sm", item.movement === 'Expiring' ? "text-orange-600" : "text-slate-600")}>{item.expiry}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Add to Order"><ShoppingCart size={16} /></button>
                                            <button className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all" title="Return to Vendor"><History size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showPrescriptionModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">New Prescription</h2>

                        <label className="block text-sm font-medium text-slate-700 mb-2">Select Medication</label>
                        <select
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg mb-4"
                            onChange={(e) => checkInteraction(e.target.value)}
                        >
                            <option value="">Choose...</option>
                            <option value="Amoxicillin 500mg">Amoxicillin 500mg</option>
                            <option value="Ibuprofen 400mg">Ibuprofen 400mg</option>
                        </select>

                        {interactionAlert && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4 flex items-start gap-3">
                                <AlertTriangle className="text-red-500 shrink-0" size={20} />
                                <div>
                                    <h4 className="font-bold text-red-700 text-sm">Clinical Decision Support Alert</h4>
                                    <p className="text-sm text-red-600 mt-1">{interactionAlert.message}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={() => setShowPrescriptionModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                            <button className="px-4 py-2 bg-primary text-white rounded-lg">Dispense</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pharmacy;
