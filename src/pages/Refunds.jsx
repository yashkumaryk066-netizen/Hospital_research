import React, { useState } from 'react';
import {
  DollarSign, FileText, AlertTriangle, CheckCircle, RotateCcw, Plus,
  CreditCard, ChevronRight, Clock, User, Shield
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const APPROVAL_MATRIX = [
  { range: '≤ ₹500', approvedBy: 'Cashier (Self)', tat: '30 mins' },
  { range: '₹501 – ₹2,000', approvedBy: 'Billing Supervisor', tat: '1 hour' },
  { range: '₹2,001 – ₹10,000', approvedBy: 'Finance Manager', tat: '4 hours' },
  { range: '₹10,001 – ₹50,000', approvedBy: 'CFO', tat: '24 hours' },
  { range: '> ₹50,000', approvedBy: 'MD / CEO', tat: '48 hours' },
];

const refunds = [
  { id: 'REF-2026-001', patient: 'Ramesh Gupta', uhid: 'UHID-2026-0012', type: 'OPD', amount: 350, mode: 'Cash', gst: 17.5, reason: 'Test cancelled by doctor', status: 'Approved', approvedBy: 'Cashier' },
  { id: 'REF-2026-002', patient: 'Priya Sharma', uhid: 'UHID-2026-0019', type: 'IPD', amount: 12000, mode: 'Insurance (TPA)', gst: 600, reason: 'Surgery postponed', status: 'Pending CFO', approvedBy: 'Finance Manager (Partial)' },
  { id: 'REF-2026-003', patient: 'Arun Kumar', uhid: 'UHID-2026-0031', type: 'Pharmacy', amount: 850, mode: 'UPI (PhonePe)', gst: 42.5, reason: 'Medication returned unopened', status: 'Processing', approvedBy: 'In Queue' },
];

const Refunds = () => {
  const [isNewModal, setIsNewModal] = useState(false);
  const [refundType, setRefundType] = useState('OPD');
  const [amount, setAmount] = useState('');

  const getApprovalLevel = (amt) => {
    const n = parseFloat(amt);
    if (!n) return APPROVAL_MATRIX[0];
    if (n <= 500) return APPROVAL_MATRIX[0];
    if (n <= 2000) return APPROVAL_MATRIX[1];
    if (n <= 10000) return APPROVAL_MATRIX[2];
    if (n <= 50000) return APPROVAL_MATRIX[3];
    return APPROVAL_MATRIX[4];
  };

  const apLevel = getApprovalLevel(amount);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <RotateCcw className="text-emerald-600" size={28} />
            Refund Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">OPD · IPD · Surgery · Pharmacy Refunds · GST Reversal · Approval Matrix</p>
        </div>
        <button onClick={() => setIsNewModal(true)} className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-black hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 flex items-center gap-2">
          <Plus size={16} /> Initiate Refund
        </button>
      </div>

      {/* Approval Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2 text-sm"><Shield size={16} className="text-slate-500" /> Tiered Refund Approval Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Refund Amount</th>
                <th className="px-4 py-3">Approved By</th>
                <th className="px-4 py-3">TAT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {APPROVAL_MATRIX.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-black text-slate-800">{row.range}</td>
                  <td className="px-4 py-3 font-bold text-slate-700">{row.approvedBy}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs font-bold">{row.tat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refund Queue */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Active Refund Queue</h3>
          <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">{refunds.length} Requests</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b">
              <tr>
                <th className="px-6 py-4">Refund ID</th>
                <th className="px-6 py-4">Patient (UHID)</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount + GST</th>
                <th className="px-6 py-4">Original Mode</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {refunds.map(ref => (
                <tr key={ref.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-emerald-700">{ref.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{ref.patient}</div>
                    <div className="text-[10px] text-slate-400">{ref.uhid}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-black uppercase rounded">{ref.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-black text-slate-900">₹ {ref.amount.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">+GST Rev: ₹{ref.gst}</div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-600">{ref.mode}</td>
                  <td className="px-6 py-4 text-xs text-slate-600 max-w-[160px] truncate">{ref.reason}</td>
                  <td className="px-6 py-4">
                    <span className={clsx('px-2 py-0.5 text-[9px] font-black uppercase rounded border',
                      ref.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-100' :
                      ref.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-orange-50 text-orange-700 border-orange-100'
                    )}>{ref.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-black uppercase text-emerald-600 hover:underline">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Refund Modal */}
      {isNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-emerald-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-white font-black text-lg">Initiate Refund Request</h2>
              <button onClick={() => setIsNewModal(false)} className="text-white/80 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase">Patient UHID / Billing ID</label>
                  <input type="text" placeholder="UHID-2026-XXXX" className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase">Refund Type</label>
                  <select value={refundType} onChange={e => setRefundType(e.target.value)} className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20">
                    <option>OPD</option><option>IPD</option><option>Surgery</option><option>Pharmacy</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase">Refund Amount (₹)</label>
                  <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase">Original Payment Mode</label>
                  <select className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20">
                    <option>Cash</option><option>UPI</option><option>Credit Card</option><option>Insurance (TPA)</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Reason for Refund</label>
                  <textarea rows={2} className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none" />
                </div>
              </div>
              {amount && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p className="text-xs font-bold text-emerald-800">Approval Required: <span className="font-black">{apLevel.approvedBy}</span></p>
                  <p className="text-[10px] text-emerald-700 mt-0.5">Expected TAT: {apLevel.tat}</p>
                </div>
              )}
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsNewModal(false)} className="px-5 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm">Cancel</button>
                <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700">Submit for Approval</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Refunds;
