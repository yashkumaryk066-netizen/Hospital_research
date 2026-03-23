import React, { useState } from 'react';
import {
    X,
    Printer,
    Download,
    Mail,
    MessageSquare,
    ArrowLeft,
    Upload,
    CreditCard,
    Banknote,
    Smartphone,
    Shield,
    FileText,
    CheckCircle
} from 'lucide-react';
import { clsx } from 'clsx';

const PaymentModeOption = ({ icon: Icon, label, value, selected, onSelect }) => (
    <button
        onClick={() => onSelect(value)}
        className={clsx(
            "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all w-full",
            selected === value
                ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50"
        )}
    >
        <Icon size={20} className={clsx(selected === value ? "text-primary" : "text-slate-400")} />
        <span className="font-medium text-sm">{label}</span>
        {selected === value && <div className="ml-auto w-2 h-2 rounded-full bg-primary" />}
    </button>
);

const DischargeModal = ({ isOpen, onClose, patient }) => {
    const [paymentMode, setPaymentMode] = useState('insurance');
    const [isUploaded, setIsUploaded] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Process Discharge</h2>
                        <div className="flex items-center gap-4 mt-2">
                            {[
                                { label: 'Nursing', status: 'done' },
                                { label: 'Doctor', status: 'done' },
                                { label: 'Pharmacy', status: 'pending' },
                                { label: 'Billing', status: 'blocked' }
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className={clsx("w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black",
                                        step.status === 'done' ? "bg-green-500 text-white" :
                                        step.status === 'blocked' ? "bg-red-500 text-white" : "bg-slate-200 text-slate-500"
                                    )}>
                                        {step.status === 'done' ? <CheckCircle size={10} /> : i + 1}
                                    </div>
                                    <span className={clsx("text-[10px] font-black uppercase tracking-tight",
                                        step.status === 'done' ? "text-green-600" :
                                        step.status === 'blocked' ? "text-red-600 animate-pulse" : "text-slate-400"
                                    )}>{step.label}</span>
                                    {i < 3 && <div className="w-4 h-px bg-slate-200" />}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row h-full overflow-hidden">
                    {/* Left Panel: Summary & Docs */}
                    <div className="w-full lg:w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col overflow-y-auto">

                        {/* Summary Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6">
                            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Payment Summary</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">₹17,150</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span className="font-medium">- ₹500</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>GST (5%)</span>
                                    <span className="font-medium">₹858</span>
                                </div>
                                <div className="h-px bg-slate-100 my-2" />
                                <div className="flex justify-between text-slate-800 font-bold">
                                    <span>Total</span>
                                    <span>₹17,508</span>
                                </div>
                                <div className="flex justify-between text-green-600 font-medium">
                                    <span>Advance Paid</span>
                                    <span>₹5,000</span>
                                </div>
                                <div className="h-px bg-slate-100 my-2" />
                                <div className="flex justify-between text-slate-900 font-bold text-lg pt-1">
                                    <span>Net Payable</span>
                                    <span>₹12,508</span>
                                </div>
                            </div>
                        </div>

                        {/* Document Generation */}
                        <div className="space-y-3 mb-8">
                            <button className="flex items-center gap-3 p-4 w-full bg-white border border-slate-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all group text-left">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-700 text-sm">Discharge Summary</div>
                                    <div className="text-xs text-slate-500">Generate PDF</div>
                                </div>
                            </button>

                            <button className="flex items-center gap-3 p-4 w-full bg-white border border-slate-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all group text-left">
                                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-700 text-sm">Final Invoice</div>
                                    <div className="text-xs text-slate-500">Generate PDF</div>
                                </div>
                            </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                            <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-primary bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                <Printer size={14} /> Print All
                            </button>
                            <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-primary bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                <Download size={14} /> Download
                            </button>
                            <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-primary bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                <Mail size={14} /> Email
                            </button>
                            <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-primary bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                <MessageSquare size={14} /> SMS
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Payment Mode & Details */}
                    <div className="w-full lg:w-2/3 p-8 flex flex-col overflow-y-auto">
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-slate-800 mb-4 px-1">Payment Mode</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <PaymentModeOption icon={Banknote} label="Cash" value="cash" selected={paymentMode} onSelect={setPaymentMode} />
                                <PaymentModeOption icon={CreditCard} label="Card" value="card" selected={paymentMode} onSelect={setPaymentMode} />
                                <PaymentModeOption icon={Smartphone} label="UPI" value="upi" selected={paymentMode} onSelect={setPaymentMode} />
                                <PaymentModeOption icon={Shield} label="Insurance" value="insurance" selected={paymentMode} onSelect={setPaymentMode} />
                            </div>
                        </div>

                        {paymentMode === 'insurance' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 text-orange-800 text-sm flex gap-3">
                                    <Shield size={18} className="shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold">Insurance Coverage Verification</p>
                                        <p className="opacity-90">Please ensure pre-authorization is complete before proceeding.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Insurance Provider / Scheme <span className="text-red-500">*</span></label>
                                        <input type="text" placeholder="e.g. HDFC ERGO / PMJAY" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Policy / Card Number <span className="text-red-500">*</span></label>
                                        <input type="text" placeholder="Policy Number" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700" />
                                    </div>
                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase">TPA Name</label>
                                        <input type="text" placeholder="Third Party Administrator Name" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input type="checkbox" id="preauth" className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4" />
                                    <label htmlFor="preauth" className="text-sm font-medium text-slate-700 cursor-pointer select-none">Pre-Authorization Required</label>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Upload Documents</label>
                                    <div
                                        className={clsx(
                                            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer",
                                            isUploaded ? "border-green-300 bg-green-50" : "border-slate-200 hover:border-primary/50 hover:bg-slate-50"
                                        )}
                                        onClick={() => setIsUploaded(!isUploaded)}
                                    >
                                        <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center mb-3", isUploaded ? "bg-green-100 text-green-600" : "bg-blue-50 text-primary")}>
                                            {isUploaded ? <CheckCircle size={24} /> : <Upload size={24} />}
                                        </div>
                                        {isUploaded ? (
                                            <div className="text-green-700 font-medium">Documents Uploaded Successfully</div>
                                        ) : (
                                            <>
                                                <p className="text-sm font-medium text-slate-700">Drag & drop insurance cards, ID proofs, referral letters</p>
                                                <p className="text-xs text-slate-400 mt-1">JPG, JPEG, PNG types allowed (max 5MB)</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer Actions */}
                        <div className="mt-auto pt-8 flex items-center justify-between border-t border-slate-100">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2"
                            >
                                <ArrowLeft size={18} /> Back
                            </button>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-5 py-2.5 text-slate-500 font-medium hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
                                    Mark Patient as Discharged
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DischargeModal;
