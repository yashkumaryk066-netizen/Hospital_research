import React from 'react';
import { clsx } from 'clsx';
import { MoreVertical, Eye, Printer, AlertTriangle } from 'lucide-react';

const StatusBadge = ({ status }) => {
    const styles = {
        pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        done: 'bg-green-50 text-green-700 border-green-200',
        critical: 'bg-red-50 text-red-700 border-red-200',
        processing: 'bg-blue-50 text-blue-700 border-blue-200',
    };
    return (
        <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-medium border", styles[status.toLowerCase()] || 'bg-slate-100 text-slate-600')}>
            {status}
        </span>
    );
};

export default function DiagnosticTable({ items = [], onAction }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800">Recent Diagnostic Requests</h3>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-600 transition-colors rounded-lg flex items-center gap-2">
                    <span>View All</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs font-semibold text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <th className="p-4 w-12 text-center">
                                <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                            </th>
                            <th className="p-4">Patient ID</th>
                            <th className="p-4">Patient Name</th>
                            <th className="p-4">Test Type</th>
                            <th className="p-4">Dept</th>
                            <th className="p-4">Priority</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="p-4 text-center">
                                    <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                                </td>
                                <td className="p-4 font-medium text-slate-900">{item.id}</td>
                                <td className="p-4">
                                    <div className="font-medium text-slate-900">{item.name}</div>
                                    <div className="text-xs text-slate-500">{item.age} • {item.gender}</div>
                                </td>
                                <td className="p-4 font-medium text-slate-700">{item.test}</td>
                                <td className="p-4 text-sm text-slate-600">{item.dept}</td>
                                <td className="p-4">
                                    <span className={clsx(
                                        "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium",
                                        item.priority === 'Urgent' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                                    )}>
                                        {item.priority === 'Urgent' && <AlertTriangle size={12} />}
                                        {item.priority}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <StatusBadge status={item.status} />
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onAction(item, 'view')}
                                            className="p-1.5 text-slate-500 hover:text-primary hover:bg-blue-50 rounded transition-colors"
                                            title="View Report"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                                            title="Print Report"
                                        >
                                            <Printer size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
