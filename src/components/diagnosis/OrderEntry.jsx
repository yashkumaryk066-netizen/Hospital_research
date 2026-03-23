import React, { useState } from 'react';
import {
    X,
    Search,
    Trash2,
    Filter,
    CheckCircle,
    FlaskConical,
    ScanLine,
    Pill,
    AlertTriangle,
    PlusCircle,
    Copy,
    Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const OrderEntry = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [search, setSearch] = useState('');
    const [selectedSet, setSelectedSet] = useState('Chest Pain Protocol');
    const [orders, setOrders] = useState([
        { id: 1, type: 'Lab', name: 'Troponin I (High Sensitivity)', status: 'Pending', urgency: 'STAT' },
        { id: 2, type: 'Imaging', name: 'CXR (Portable)', status: 'Pending', urgency: 'Routine' },
        { id: 3, type: 'Meds', name: 'Aspirin 300mg PO Chewable', status: 'Pending', urgency: 'STAT' },
    ]);

    const orderSets = [
        { name: 'Chest Pain Protocol', color: 'bg-red-50 text-red-700 border-red-200' },
        { name: 'Sepsis Bundle (Initial)', color: 'bg-orange-50 text-orange-700 border-orange-200' },
        { name: 'Pre-op Clearance', color: 'bg-blue-50 text-blue-700 border-blue-200' },
        { name: 'Diabetes Admission', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    ];

    const removeOrder = (id) => {
        setOrders(prev => prev.filter(o => o.id !== id));
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden border border-slate-200"
                >
                    {/* Header */}
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                <PlusCircle className="text-primary" size={24} /> Computerized Physician Order Entry (CPOE)
                            </h2>
                            <p className="text-xs text-slate-500 font-medium ml-8">Integrated Order Management • HIPAA Compliant</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex flex-1 overflow-hidden">

                        {/* Sidebar: Order Sets */}
                        <div className="w-64 bg-slate-50 border-r border-slate-200 p-4 flex flex-col gap-4 overflow-y-auto">
                            <h3 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Common Order Sets</h3>
                            {orderSets.map((set) => (
                                <button
                                    key={set.name}
                                    onClick={() => setSelectedSet(set.name)}
                                    className={clsx(
                                        "w-full text-left p-3 rounded-lg text-sm font-bold border transition-all relative overflow-hidden group",
                                        selectedSet === set.name ? `border-2 scale-[1.02] shadow-sm ${set.color.replace('bg-', 'border-').replace('text-', 'text-')}` : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                                    )}
                                >
                                    {selectedSet === set.name && <div className={`absolute top-0 right-0 w-2 h-full ${set.color.replace('text-', 'bg-').split(' ')[0]}`}></div>}
                                    <div className="flex justify-between items-center">
                                        <span>{set.name}</span>
                                        {selectedSet === set.name && <CheckCircle size={14} className="text-current" />}
                                    </div>
                                </button>
                            ))}

                            <h3 className="font-bold text-xs uppercase text-slate-400 tracking-wider mt-4">Favorites</h3>
                            <button className="w-full text-left p-3 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-between">
                                <span>My Cardio Panel</span>
                                <div className="p-1 rounded bg-slate-100 text-slate-400"><Copy size={12} /></div>
                            </button>
                        </div>

                        {/* Main Content: Search & Building Orders */}
                        <div className="flex-1 flex flex-col bg-white">

                            {/* Search Bar */}
                            <div className="p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search for Lab, Imaging, Meds, Diet, Vitals..."
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                                        <button className="px-3 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm flex items-center gap-1">
                                            <Filter size={12} /> Filter
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Pending Orders List */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">

                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                        Pending Orders <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{orders.length}</span>
                                    </h3>
                                    <div className="flex gap-2">
                                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-100 flex items-center gap-1">
                                            <AlertTriangle size={12} /> Double Check Allergies
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-inner">
                                    {orders.map((order) => (
                                        <div key={order.id} className="p-4 bg-white flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className={clsx(
                                                    "w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm",
                                                    order.type === 'Lab' ? 'bg-purple-500' :
                                                        order.type === 'Imaging' ? 'bg-blue-500' :
                                                            'bg-emerald-500'
                                                )}>
                                                    {order.type === 'Lab' && <FlaskConical size={20} />}
                                                    {order.type === 'Imaging' && <ScanLine size={20} />}
                                                    {order.type === 'Meds' && <Pill size={20} />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800 text-sm">{order.name}</div>
                                                    <div className="text-xs text-slate-500 font-medium flex gap-2 mt-0.5">
                                                        <span className={clsx(
                                                            "uppercase tracking-wider font-bold",
                                                            order.urgency === 'STAT' ? "text-red-600" : "text-slate-400"
                                                        )}>{order.urgency}</span>
                                                        <span>• Dr. Ram Sharma</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <select className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 outline-none focus:bg-white focus:border-blue-500 transition-colors">
                                                    <option>Routine</option>
                                                    <option>Urgent</option>
                                                    <option selected={order.urgency === 'STAT'}>STAT</option>
                                                </select>
                                                <button
                                                    onClick={() => removeOrder(order.id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {orders.length === 0 && (
                                        <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center border-dashed">
                                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                                <Search size={32} className="text-slate-300" />
                                            </div>
                                            <p className="font-bold">No orders added yet.</p>
                                            <p className="text-sm">Search above or select an order set.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Order Set Details (if expanded context needed) */}
                                {selectedSet === 'Chest Pain Protocol' && (
                                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-2">
                                        <h4 className="font-bold text-blue-800 text-sm flex items-center gap-2">
                                            <CheckCircle size={16} /> Chest Pain Protocol Includes:
                                        </h4>
                                        <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside pl-2">
                                            <li>ECG (12-Lead) - STAT</li>
                                            <li>Troponin I (High Sensitivity) - Now & 6h</li>
                                            <li>CXR (PA & Lateral)</li>
                                            <li>Aspirin 300mg (if not allergic)</li>
                                        </ul>
                                        <button className="mt-2 text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded hover:bg-blue-700 transition-colors shadow-sm">
                                            Add All to Orders
                                        </button>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
                        <div className="text-xs text-slate-500 font-medium">
                            <span className="font-bold text-slate-700">Audit:</span> Active editing session started at 10:48 AM
                        </div>
                        <div className="flex gap-3">
                            <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                                Cancel
                            </button>
                            <button className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 group">
                                <Save size={18} className="group-hover:scale-110 transition-transform" /> Sign & Submit Orders
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default OrderEntry;
