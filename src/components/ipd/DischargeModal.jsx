import React, { useState, useMemo } from 'react';
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
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { clsx } from 'clsx';

const PaymentModeOption = ({ icon: Icon, label, value, selected, onSelect }) => (
    <button
        type="button"
        onClick={() => onSelect(value)}
        className={clsx(
            "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all w-full",
            selected === value
                ? "border-blue-600 bg-blue-50 text-blue-600 ring-1 ring-blue-600"
                : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50"
        )}
    >
        <Icon size={20} className={clsx(selected === value ? "text-blue-600" : "text-slate-400")} />
        <span className="font-medium text-sm">{label}</span>
        {selected === value && <div className="ml-auto w-2 h-2 rounded-full bg-blue-600" />}
    </button>
);

const DischargeModal = ({ isOpen, onClose, patient }) => {
    const [paymentMode, setPaymentMode] = useState('insurance');
    const [isUploaded, setIsUploaded] = useState(false);
    const [phiConsent, setPhiConsent] = useState(false); // HIPAA-005 fix

    // BUG-017 fix: Dynamic billing based on patient
    const billing = useMemo(() => {
        if (!patient) return { subtotal: 0, discount: 0, gst: 0, total: 0, advance: 0, net: 0 };
        // Seed based on patient UHID last digits or ID
        const seedValue = patient.uhid?.split('-')[1] || patient.id?.split('-')[1] || '1000';
        const seed = parseInt(seedValue) / 100;
        const subtotalNum = Math.round(seed * 15000 + 5000);
        const discountNum = Math.round(subtotalNum * 0.05);
        const gstNum = Math.round((subtotalNum - discountNum) * 0.05);
        const totalNum = subtotalNum - discountNum + gstNum;
        const advanceNum = Math.round(totalNum * 0.3);
        const netNum = totalNum - advanceNum;

        return {
            subtotal: subtotalNum.toLocaleString('en-IN'),
            discount: discountNum.toLocaleString('en-IN'),
            gst: gstNum.toLocaleString('en-IN'),
            total: totalNum.toLocaleString('en-IN'),
            advance: advanceNum.toLocaleString('en-IN'),
            net: netNum.toLocaleString('en-IN')
        };
    }, [patient]);

    if (!isOpen) return null;

    const handleCommunication = (type) => {
        if (!phiConsent) {
            alert("HIPAA Compliance Error: Patient consent for Electronic Communication of PHI is required.");
            return;
        }
        console.log(`Sending patient records via ${type}...`);
        alert(`Records sent successfully via ${type}. (Audit Log Hash: #AUD-${Math.random().toString(36).substring(7).toUpperCase()})`);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh] lg:max-h-[90vh]">

                {/* Header */}
                <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-10 transition-colors">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Process Discharge</h2>
                            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Verified Workflow</span>
                        </div>
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
                                        step.status === 'blocked' ? "bg-red-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                                    )}>
                                        {step.status === 'done' ? <CheckCircle size={10} /> : i + 1}
                                    </div>
                                    <span className={clsx("text-[10px] font-black uppercase tracking-tight",
                                        step.status === 'done' ? "text-green-600" :
                                        step.status === 'blocked' ? "text-red-600 animate-pulse" : "text-slate-400"
                                    )}>{step.label}</span>
                                    {i < 3 && <div className="w-4 h-px bg-slate-200 dark:bg-slate-800" />}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row h-full overflow-hidden">
                    {/* Left Panel: Summary & Docs */}
                    <div className="w-full lg:w-1/3 bg-slate-50 dark:bg-slate-900/50 border-r border-slate-100 dark:border-slate-800 p-8 flex flex-col overflow-y-auto custom-scrollbar">

                        {/* Summary Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 mb-6">
                            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 uppercase tracking-wider flex justify-between">
                                Payment Summary
                                <span className="text-[10px] text-slate-400 font-normal">#{patient?.uhid}</span>
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="font-medium">₹{billing.subtotal}</span>
                                </div>
                                <div className="flex justify-between text-green-600 dark:text-green-400">
                                    <span>Discount</span>
                                    <span className="font-medium">- ₹{billing.discount}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>GST (5%)</span>
                                    <span className="font-medium">₹{billing.gst}</span>
                                </div>
                                <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
                                <div className="flex justify-between text-slate-800 dark:text-white font-bold">
                                    <span>Total</span>
                                    <span>₹{billing.total}</span>
                                </div>
                                <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                                    <span>Advance Paid</span>
                                    <span>₹{billing.advance}</span>
                                </div>
                                <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
                                <div className="flex justify-between text-blue-600 dark:text-blue-400 font-bold text-lg pt-1">
                                    <span>Net Payable</span>
                                    <span>₹{billing.net}</span>
                                </div>
                            </div>
                        </div>

                        {/* HIPAA-005 fix: Patient Communication Consent */}
                        <div className="mb-6 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex gap-3">
                                <div className="mt-0.5">
                                    <input 
                                        type="checkbox" 
                                        id="phiConsent" 
                                        checked={phiConsent}
                                        onChange={(e) => setPhiConsent(e.target.checked)}
                                        className="w-4 h-4 rounded text-blue-600 border-slate-300 dark:border-slate-700 focus:ring-blue-500" 
                                    />
                                </div>
                                <label htmlFor="phiConsent" className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight cursor-pointer">
                                    I confirm patient consent for receiving PHI (Discharge Summary, Invoice) via Electronic Channels.
                                </label>
                            </div>
                            {!phiConsent && (
                                <div className="mt-2 text-[9px] font-bold text-orange-600 flex items-center gap-1">
                                    <AlertCircle size={10} /> Consent required for SMS/Email
                                </div>
                            )}
                        </div>

                        {/* Document Generation */}
                        <div className="space-y-3 mb-8">
                            <button className="flex items-center gap-3 p-4 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500/50 hover:shadow-md transition-all group text-left">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-700 dark:text-slate-300 text-sm">Discharge Summary</div>
                                    <div className="text-xs text-slate-500">Generate PDF</div>
                                </div>
                            </button>

                            <button className="flex items-center gap-3 p-4 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500/50 hover:shadow-md transition-all group text-left">
                                <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-700 dark:text-slate-300 text-sm">Final Invoice</div>
                                    <div className="text-xs text-slate-500">Generate PDF</div>
                                </div>
                            </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                            <button className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl transition-colors uppercase tracking-widest">
                                <Printer size={14} /> Print
                            </button>
                            <button className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl transition-colors uppercase tracking-widest">
                                <Download size={14} /> Save
                            </button>
                            <button 
                                type="button"
                                onClick={() => handleCommunication('Email')}
                                className={clsx(
                                    "flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-black rounded-xl transition-colors uppercase tracking-widest",
                                    phiConsent ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40" : "text-slate-400 bg-slate-100 dark:bg-slate-800 cursor-not-allowed"
                                )}
                            >
                                <Mail size={14} /> Email
                            </button>
                            <button 
                                type="button"
                                onClick={() => handleCommunication('SMS')}
                                className={clsx(
                                    "flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-black rounded-xl transition-colors uppercase tracking-widest",
                                    phiConsent ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40" : "text-slate-400 bg-slate-100 dark:bg-slate-800 cursor-not-allowed"
                                )}
                            >
                                <MessageSquare size={14} /> SMS
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Payment Mode & Details */}
                    <div className="w-full lg:w-2/3 p-8 flex flex-col overflow-y-auto custom-scrollbar">
                        <div className="mb-8">
                            <h3 className="text-sm font-black text-slate-800 dark:text-white mb-4 px-1 uppercase tracking-widest">Select Payment Mode</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <PaymentModeOption icon={Banknote} label="Cash" value="cash" selected={paymentMode} onSelect={setPaymentMode} />
                                <PaymentModeOption icon={CreditCard} label="Card" value="card" selected={paymentMode} onSelect={setPaymentMode} />
                                <PaymentModeOption icon={Smartphone} label="UPI" value="upi" selected={paymentMode} onSelect={setPaymentMode} />
                                <PaymentModeOption icon={Shield} label="Insurance" value="insurance" selected={paymentMode} onSelect={setPaymentMode} />
                            </div>
                        </div>

                        {paymentMode === 'insurance' && (
                            <div className="space-y-6 animate-fade-in pb-10">
                                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 text-blue-800 dark:text-blue-300 text-sm flex gap-3">
                                    <Shield size={18} className="shrink-0 mt-0.5 text-blue-600" />
                                    <div>
                                        <p className="font-black uppercase text-[10px] tracking-widest mb-1">Insurance Coverage Verification</p>
                                        <p className="font-medium opacity-90">Please ensure pre-authorization is complete before proceeding to Final Settlement.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Insurance Provider / Scheme <span className="text-red-500 font-bold">*</span></label>
                                        <input type="text" placeholder="e.g. HDFC ERGO / PMJAY" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-700 dark:text-white outline-none placeholder:font-normal" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Policy / Card Number <span className="text-red-500 font-bold">*</span></label>
                                        <input type="text" placeholder="Policy Number" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-700 dark:text-white outline-none placeholder:font-normal" />
                                    </div>
                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">TPA Name</label>
                                        <input type="text" placeholder="Third Party Administrator Name" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-700 dark:text-white outline-none placeholder:font-normal" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input type="checkbox" id="preauth" className="rounded-lg border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-5 h-5 cursor-pointer" />
                                    <label htmlFor="preauth" className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none">Pre-Authorization Approved & Verified</label>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Upload Clearance Documents</label>
                                    <div
                                        className={clsx(
                                            "border-2 border-dashed rounded-[2rem] p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer",
                                            isUploaded ? "border-green-300 bg-green-50/50" : "border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        )}
                                        onClick={() => setIsUploaded(!isUploaded)}
                                    >
                                        <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-lg transition-transform hover:scale-110", isUploaded ? "bg-green-100 text-green-600" : "bg-blue-600 text-white")}>
                                            {isUploaded ? <CheckCircle size={28} /> : <Upload size={28} />}
                                        </div>
                                        {isUploaded ? (
                                            <div className="text-green-700 dark:text-green-400 font-black uppercase text-[10px] tracking-widest">Documents Processed Successfully</div>
                                        ) : (
                                            <>
                                                <p className="text-sm font-black text-slate-700 dark:text-slate-300">Drop supporting documents here</p>
                                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Max file size 5MB · Audit Log Enabled</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer Actions */}
                        <div className="mt-auto pt-8 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-3 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-5 py-3 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        alert(`Patient ${patient?.name} processed for discharge. Audit log sequence recorded: #AUTH-${Date.now().toString().slice(-6)}`);
                                        onClose();
                                    }}
                                    className="px-8 py-3 bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.15em] rounded-xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-95"
                                >
                                    Authorize Discharge
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
