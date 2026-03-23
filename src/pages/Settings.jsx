import React, { useState } from 'react';
import {
  Building, Users, Bell, Shield, CreditCard, Save, Upload, Hash,
  FileText, ToggleLeft, Layout, Percent, MessageSquare, Lock,
  ChevronRight, Check, Plus, Trash2, Eye, EyeOff, AlertTriangle,
  Printer, Phone, Mail, Globe, Star, Settings as SettingsIcon
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Reusable Components ───────────────────────────────────────────────────
const Toggle = ({ enabled, onChange, size = 'md' }) => (
  <button onClick={() => onChange(!enabled)}
    className={clsx('relative inline-flex items-center rounded-full transition-colors focus:outline-none shrink-0',
      size === 'sm' ? 'h-5 w-9' : 'h-6 w-11',
      enabled ? 'bg-blue-600' : 'bg-slate-200')}>
    <span className={clsx('inline-block rounded-full bg-white shadow transition-transform',
      size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4',
      enabled ? (size === 'sm' ? 'translate-x-5' : 'translate-x-6') : 'translate-x-1')} />
  </button>
);

const SectionCard = ({ title, subtitle, icon: Icon, children, accent = 'blue' }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div className={clsx('px-6 py-4 border-b border-slate-100 flex items-center gap-3',
      accent === 'blue' ? 'bg-blue-50' : accent === 'green' ? 'bg-green-50' :
      accent === 'purple' ? 'bg-purple-50' : accent === 'orange' ? 'bg-orange-50' :
      accent === 'red' ? 'bg-red-50' : 'bg-slate-50')}>
      <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center',
        accent === 'blue' ? 'bg-blue-100' : accent === 'green' ? 'bg-green-100' :
        accent === 'purple' ? 'bg-purple-100' : accent === 'orange' ? 'bg-orange-100' :
        accent === 'red' ? 'bg-red-100' : 'bg-slate-100')}>
        <Icon size={18} className={clsx(
          accent === 'blue' ? 'text-blue-600' : accent === 'green' ? 'text-green-600' :
          accent === 'purple' ? 'text-purple-600' : accent === 'orange' ? 'text-orange-600' :
          accent === 'red' ? 'text-red-600' : 'text-slate-600')} />
      </div>
      <div>
        <h3 className="font-black text-slate-800 text-sm">{title}</h3>
        {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Field = ({ label, hint, children }) => (
  <div>
    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">{label}</label>
    {children}
    {hint && <p className="text-[10px] text-slate-400 mt-1">{hint}</p>}
  </div>
);

const Input = (props) => (
  <input {...props} className={clsx('w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all', props.className)} />
);

const Select = ({ children, ...props }) => (
  <select {...props} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white transition-all">
    {children}
  </select>
);

const SaveBar = ({ section, onSave }) => (
  <div className="flex justify-end pt-4 border-t border-slate-100 mt-4">
    <button onClick={onSave}
      className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-black hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2">
      <Save size={16} /> Save {section}
    </button>
  </div>
);

// ─── NAV SECTIONS ──────────────────────────────────────────────────────────
const NAV = [
  { id: 'identity',     label: 'Hospital Identity',       icon: Building },
  { id: 'uhid',         label: 'Patient ID (UHID)',        icon: Hash },
  { id: 'commission',   label: 'Doctor Commission',        icon: Percent },
  { id: 'billing',      label: 'Bill & Invoice',           icon: FileText },
  { id: 'tax',          label: 'Tax & Discounts',          icon: CreditCard },
  { id: 'barcode',      label: 'Barcode & QR',             icon: Hash },
  { id: 'notifications',label: 'Notifications (SMS/WA)',   icon: MessageSquare },
  { id: 'modules',      label: 'Module Toggles',           icon: ToggleLeft },
  { id: 'fields',       label: 'Form Field Config',        icon: Layout },
  { id: 'roles',        label: 'Roles & Permissions',      icon: Lock },
];

// ─── SECTION PANELS ────────────────────────────────────────────────────────

const IdentitySection = () => {
  const [form, setForm] = useState({
    name: 'City Care Multi-Specialty Hospital',
    tagline: 'Caring for Life, Every Step of the Way',
    address: '12, MG Road, Sector 14, Gurugram, Haryana – 122001',
    phone: '+91-124-4567890', email: 'info@citycare.in',
    website: 'www.citycare.in', gst: '06AABCC1234D1Z5',
    pan: 'AABCC1234D', regNo: 'MH-HOS-2019-00124',
    cityState: 'Gurugram, Haryana',
  });
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="space-y-6">
      <SectionCard title="Hospital Identity & Branding" subtitle="This info appears on bills, reports, and letterheads" icon={Building} accent="blue">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Field label="Hospital Name (as on License)">
              <Input value={form.name} onChange={f('name')} placeholder="Full legal name" />
            </Field>
          </div>
          <Field label="Tagline / Motto">
            <Input value={form.tagline} onChange={f('tagline')} placeholder="Shown below name on letterhead" />
          </Field>
          <Field label="Registration Number">
            <Input value={form.regNo} onChange={f('regNo')} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Full Address">
              <textarea rows={2} value={form.address} onChange={f('address')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" />
            </Field>
          </div>
          <Field label="City & State"><Input value={form.cityState} onChange={f('cityState')} /></Field>
          <Field label="Phone Number"><Input value={form.phone} onChange={f('phone')} /></Field>
          <Field label="Email Address"><Input value={form.email} onChange={f('email')} /></Field>
          <Field label="Website"><Input value={form.website} onChange={f('website')} /></Field>
          <Field label="GST Number" hint="15-character alphanumeric GSTIN"><Input value={form.gst} onChange={f('gst')} /></Field>
          <Field label="PAN Number"><Input value={form.pan} onChange={f('pan')} /></Field>
        </div>

        <div className="mt-5 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-[11px] font-black text-slate-500 uppercase mb-3">Hospital Logo</p>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-slate-200 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
              <Building size={28} className="text-slate-400" />
            </div>
            <div>
              <button className="px-4 py-2 bg-blue-600 text-white text-xs font-black rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow">
                <Upload size={14} /> Upload Logo (PNG/SVG)
              </button>
              <p className="text-[10px] text-slate-400 mt-1.5">Recommended: 300×100px, white background, PNG</p>
            </div>
          </div>
        </div>

        <SaveBar section="Identity" onSave={() => {}} />
      </SectionCard>
    </div>
  );
};

const UhidSection = () => {
  const [prefix, setPrefix] = useState('UHID');
  const [includeYear, setIncludeYear] = useState(true);
  const [separator, setSeparator] = useState('-');
  const [startNum, setStartNum] = useState('1');
  const [digits, setDigits] = useState('5');
  const [customPrefix, setCustomPrefix] = useState('');

  const preview = [prefix || 'UHID', includeYear ? '2026' : null, String(parseInt(startNum) || 1).padStart(parseInt(digits) || 5, '0')]
    .filter(Boolean).join(separator);

  return (
    <SectionCard title="Patient ID / UHID Format" subtitle="Define how unique patient IDs are auto-generated" icon={Hash} accent="purple">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Prefix Style" hint="Choose a preset or enter custom">
          <Select value={prefix} onChange={e => setPrefix(e.target.value)}>
            <option value="UHID">UHID — Universal Health ID</option>
            <option value="PT">PT — Patient</option>
            <option value="MR">MR — Medical Record</option>
            <option value="REG">REG — Registration</option>
            <option value="custom">Custom Prefix…</option>
          </Select>
        </Field>

        {prefix === 'custom' && (
          <Field label="Custom Prefix Text">
            <Input value={customPrefix} onChange={e => setCustomPrefix(e.target.value)} placeholder="e.g. CCH or MH" maxLength={6} />
          </Field>
        )}

        <Field label="Separator Character">
          <Select value={separator} onChange={e => setSeparator(e.target.value)}>
            <option value="-">Hyphen ( - )</option>
            <option value="/">Slash ( / )</option>
            <option value="">None (no separator)</option>
            <option value=".">Dot ( . )</option>
          </Select>
        </Field>

        <Field label="Number of Digits (zero-padded)" hint="5 digits → 00001, 6 digits → 000001">
          <Select value={digits} onChange={e => setDigits(e.target.value)}>
            {['4','5','6','7'].map(d => <option key={d} value={d}>{d} digits</option>)}
          </Select>
        </Field>

        <Field label="Starting Number" hint="New patients start from this number">
          <Input type="number" min="1" value={startNum} onChange={e => setStartNum(e.target.value)} />
        </Field>

        <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-xl">
          <div>
            <p className="text-sm font-black text-purple-900">Include Year in ID</p>
            <p className="text-[11px] text-purple-600">e.g. UHID-<strong>2026</strong>-00001</p>
          </div>
          <Toggle enabled={includeYear} onChange={setIncludeYear} />
        </div>
      </div>

      <div className="mt-5 p-5 bg-gradient-to-br from-purple-900 to-slate-900 rounded-2xl text-center">
        <p className="text-purple-300 text-[10px] font-black uppercase tracking-widest mb-2">Live Preview</p>
        <p className="text-white font-black text-3xl tracking-wider font-mono">{preview}</p>
        <p className="text-purple-300 text-xs mt-2">First patient ID that will be assigned</p>
      </div>

      <SaveBar section="UHID Config" onSave={() => {}} />
    </SectionCard>
  );
};

const CommissionSection = () => {
  const [commBase, setCommBase] = useState('total');
  const [commType, setCommType] = useState('percent');
  const [applicable, setApplicable] = useState({ opd: true, ipd: true, surgery: false, lab: false });
  const [doctors, setDoctors] = useState([
    { name: 'Dr. Arun Sharma', dept: 'Cardiology', rate: '15', type: 'percent' },
    { name: 'Dr. Priya Singh', dept: 'Gynaecology', rate: '12', type: 'percent' },
    { name: 'Dr. Rajesh Verma', dept: 'Orthopaedics', rate: '2500', type: 'fixed' },
  ]);

  return (
    <SectionCard title="Doctor Commission Configuration" subtitle="Define how commission is calculated globally and per doctor" icon={Percent} accent="green">
      <div className="space-y-5">
        <div>
          <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-3">Commission Calculated On (Global Default)</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: 'total', label: 'Total Bill Amount', desc: 'Commission on full invoice amount before payment' },
              { val: 'paid', label: 'Paid Amount', desc: 'Commission only on amount actually received/collected' },
            ].map(opt => (
              <button key={opt.val} onClick={() => setCommBase(opt.val)}
                className={clsx('p-4 rounded-xl border-2 text-left transition-all',
                  commBase === opt.val ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-slate-300 bg-white')}>
                <div className={clsx('text-sm font-black', commBase === opt.val ? 'text-green-800' : 'text-slate-800')}>{opt.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-3">Default Commission Type</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: 'percent', label: 'Percentage (%)', desc: 'E.g. 15% of bill amount' },
              { val: 'fixed', label: 'Fixed Amount (₹)', desc: 'E.g. ₹500 per consultation' },
            ].map(opt => (
              <button key={opt.val} onClick={() => setCommType(opt.val)}
                className={clsx('p-4 rounded-xl border-2 text-left transition-all',
                  commType === opt.val ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300 bg-white')}>
                <div className={clsx('text-sm font-black', commType === opt.val ? 'text-blue-800' : 'text-slate-800')}>{opt.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-3">Applicable On (Service Types)</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(applicable).map(([key, val]) => (
              <button key={key} onClick={() => setApplicable(p => ({ ...p, [key]: !p[key] }))}
                className={clsx('px-4 py-2 rounded-xl text-xs font-black border-2 uppercase transition-all',
                  val ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400')}>
                {key.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Per-Doctor Commission Override</p>
            <button className="text-[10px] font-black text-blue-600 flex items-center gap-1 hover:underline"><Plus size={12}/> Add Doctor</button>
          </div>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Doctor</th>
                  <th className="px-4 py-3 text-left">Department</th>
                  <th className="px-4 py-3 text-left">Rate</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {doctors.map((doc, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-bold text-slate-800">{doc.name}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{doc.dept}</td>
                    <td className="px-4 py-3">
                      <input value={doc.rate} onChange={e => { const d=[...doctors]; d[i]={...d[i],rate:e.target.value}; setDoctors(d); }}
                        className="w-24 px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </td>
                    <td className="px-4 py-3">
                      <select value={doc.type} onChange={e => { const d=[...doctors]; d[i]={...d[i],type:e.target.value}; setDoctors(d); }}
                        className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white outline-none">
                        <option value="percent">%</option>
                        <option value="fixed">₹ Fixed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setDoctors(d => d.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SaveBar section="Commission" onSave={() => {}} />
    </SectionCard>
  );
};

const BillingSection = () => {
  const [billFormat, setBillFormat] = useState('a4');
  const [billPrefix, setBillPrefix] = useState('BILL');
  const [billSep, setBillSep] = useState('-');
  const [startBill, setStartBill] = useState('1001');
  const [showLogo, setShowLogo] = useState(true);
  const [showGstBreak, setShowGstBreak] = useState(true);
  const [showDrSign, setShowDrSign] = useState(false);
  const [footerText, setFooterText] = useState('Thank you for choosing City Care Hospital. Medicines once sold will not be taken back.');
  const [showWatermark, setShowWatermark] = useState(true);
  const [dupCopy, setDupCopy] = useState('2');
  const [billYear, setBillYear] = useState(true);

  const previewNum = [billPrefix, billYear ? '2026' : null, String(parseInt(startBill)||1001).padStart(4,'0')].filter(Boolean).join(billSep);

  return (
    <SectionCard title="Bill & Invoice Configuration" subtitle="Format, numbering, print layout and content of patient bills" icon={FileText} accent="orange">
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Bill Number Prefix"><Input value={billPrefix} onChange={e=>setBillPrefix(e.target.value)} /></Field>
        <Field label="Separator"><Select value={billSep} onChange={e=>setBillSep(e.target.value)}><option value="-">Hyphen -</option><option value="/">Slash /</option><option value="">None</option></Select></Field>
        <Field label="Starting Bill Number"><Input type="number" value={startBill} onChange={e=>setStartBill(e.target.value)} /></Field>
        <Field label="Print Format">
          <Select value={billFormat} onChange={e=>setBillFormat(e.target.value)}>
            <option value="a4">A4 (210×297mm)</option>
            <option value="a5">A5 (148×210mm)</option>
            <option value="thermal80">Thermal 80mm Roll</option>
            <option value="thermal58">Thermal 58mm Roll</option>
          </Select>
        </Field>
        <Field label="Copies to Print per Bill">
          <Select value={dupCopy} onChange={e=>setDupCopy(e.target.value)}>
            <option value="1">1 Copy (Original only)</option>
            <option value="2">2 Copies (Original + Duplicate)</option>
            <option value="3">3 Copies (Original + Dup + Triplicate)</option>
          </Select>
        </Field>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          { key: showLogo, setter: setShowLogo, label: 'Show Hospital Logo on Bill' },
          { key: showGstBreak, setter: setShowGstBreak, label: 'Show GST Breakup (SGST / CGST)' },
          { key: showDrSign, setter: setShowDrSign, label: 'Print Doctor Signature Line' },
          { key: showWatermark, setter: setShowWatermark, label: 'Show "ORIGINAL" Watermark' },
          { key: billYear, setter: setBillYear, label: 'Include Year in Bill Number' },
        ].map(({ key, setter, label }) => (
          <div key={label} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-sm font-bold text-slate-700">{label}</span>
            <Toggle enabled={key} onChange={setter} />
          </div>
        ))}
      </div>

      <div className="mt-5">
        <Field label="Bill Footer Message" hint="Printed at the bottom of every bill">
          <textarea rows={2} value={footerText} onChange={e=>setFooterText(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" />
        </Field>
      </div>

      <div className="mt-5 p-4 bg-gradient-to-br from-orange-900 to-slate-900 rounded-2xl text-center">
        <p className="text-orange-300 text-[10px] font-black uppercase tracking-widest mb-1">Bill Number Preview</p>
        <p className="text-white font-black text-2xl font-mono">{previewNum}</p>
      </div>
      <SaveBar section="Bill Config" onSave={() => {}} />
    </SectionCard>
  );
};

const TaxSection = () => {
  const [gstRules, setGstRules] = useState([
    { category: 'OPD Consultation', rate: '0', type: 'Exempt' },
    { category: 'Laboratory Tests', rate: '5', type: 'GST' },
    { category: 'Radiology / Imaging', rate: '5', type: 'GST' },
    { category: 'Room / Bed Charges', rate: '0', type: 'Exempt' },
    { category: 'Pharmacy (OTC)', rate: '12', type: 'GST' },
    { category: 'Pharmacy (Prescription)', rate: '0', type: 'Exempt' },
    { category: 'Surgery Packages', rate: '5', type: 'GST' },
    { category: 'Ambulance Services', rate: '0', type: 'Exempt' },
  ]);
  const [discountRules, setDiscountRules] = useState([
    { name: 'Staff Discount', value: '25', type: 'percent', applicable: 'All' },
    { name: 'Senior Citizen', value: '10', type: 'percent', applicable: 'OPD' },
    { name: 'Referral Coupon', value: '200', type: 'fixed', applicable: 'OPD' },
  ]);
  const [creditBilling, setCreditBilling] = useState(true);
  const [packageBilling, setPackageBilling] = useState(true);

  return (
    <SectionCard title="Tax (GST) & Discount Configuration" subtitle="Set GST rates per service category and define discount rules" icon={CreditCard} accent="blue">
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-3">GST Rates by Service Category</p>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b">
                <tr><th className="px-4 py-3 text-left">Category</th><th className="px-4 py-3 text-left">GST %</th><th className="px-4 py-3 text-left">Type</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {gstRules.map((rule, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-bold text-slate-700">{rule.category}</td>
                    <td className="px-4 py-3">
                      <input type="number" value={rule.rate} min="0" max="28"
                        onChange={e => { const r=[...gstRules]; r[i]={...r[i],rate:e.target.value}; setGstRules(r); }}
                        className="w-20 px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none" />
                    </td>
                    <td className="px-4 py-3">
                      <span className={clsx('px-2 py-0.5 rounded text-[9px] font-black uppercase border',
                        rule.rate === '0' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-blue-50 text-blue-700 border-blue-100')}>
                        {rule.rate === '0' ? 'Exempt' : `${rule.rate}% GST`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-3">Discount Rules</p>
          <div className="space-y-2">
            {discountRules.map((rule, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input value={rule.name} onChange={e=>{ const r=[...discountRules]; r[i]={...r[i],name:e.target.value}; setDiscountRules(r); }}
                  className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none" />
                <input type="number" value={rule.value} onChange={e=>{ const r=[...discountRules]; r[i]={...r[i],value:e.target.value}; setDiscountRules(r); }}
                  className="w-20 px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none" />
                <select value={rule.type} onChange={e=>{ const r=[...discountRules]; r[i]={...r[i],type:e.target.value}; setDiscountRules(r); }}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white outline-none">
                  <option value="percent">%</option><option value="fixed">₹</option>
                </select>
                <button onClick={()=>setDiscountRules(d=>d.filter((_,j)=>j!==i))} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
              </div>
            ))}
            <button onClick={()=>setDiscountRules(p=>[...p,{name:'New Rule',value:'0',type:'percent',applicable:'All'}])}
              className="w-full py-2 border-2 border-dashed border-slate-300 rounded-xl text-xs font-black text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2">
              <Plus size={14}/> Add Discount Rule
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div><p className="text-sm font-black text-slate-700">Corporate Credit Billing</p><p className="text-[10px] text-slate-400">Allow bill-to-company accounts</p></div>
            <Toggle enabled={creditBilling} onChange={setCreditBilling} />
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div><p className="text-sm font-black text-slate-700">Package / Bundle Billing</p><p className="text-[10px] text-slate-400">Enable surgery/daycare packages</p></div>
            <Toggle enabled={packageBilling} onChange={setPackageBilling} />
          </div>
        </div>
      </div>
      <SaveBar section="Tax & Discounts" onSave={() => {}} />
    </SectionCard>
  );
};

const MODULE_LIST = [
  { id: 'opd',          label: 'OPD Management',          desc: 'Outpatient appointments and consultation', group: 'Clinical' },
  { id: 'ipd',          label: 'IPD / Inpatient',         desc: 'Bed management, nursing, rounds',          group: 'Clinical' },
  { id: 'emergency',    label: 'Emergency & Triage',      desc: 'ESI levels, MLC cases, trauma bay',        group: 'Clinical' },
  { id: 'ot',           label: 'OT & ICU Management',     desc: 'WHO checklist, ventilator, RASS',          group: 'Clinical' },
  { id: 'lab',          label: 'Laboratory (LIMS)',        desc: 'Sample collection, results, reports',      group: 'Clinical' },
  { id: 'radiology',    label: 'Radiology (RIS/PACS)',    desc: 'Modality worklist, imaging viewer',        group: 'Clinical' },
  { id: 'pharmacy',     label: 'Pharmacy',                desc: 'Inventory, dispensing, expiry alerts',     group: 'Clinical' },
  { id: 'physio',       label: 'Physiotherapy & Rehab',   desc: 'Movement therapy, pain rehab, ortho',       group: 'Clinical' },
  { id: 'blood',        label: 'Blood Bank',              desc: 'Inventory, cross-match, transfusion',      group: 'Clinical' },
  { id: 'neonatal',     label: 'Neonatal & Labour',       desc: 'Partograph, APGAR, birth registration',   group: 'Clinical' },
  { id: 'telemedicine', label: 'Telemedicine',            desc: 'Video consultation and ePrescription',     group: 'Clinical' },
  { id: 'billing',      label: 'Billing & Finance',       desc: 'Invoicing, receipts, GST',                group: 'Finance' },
  { id: 'insurance',    label: 'Insurance & TPA',         desc: 'Pre-auth, claims, cashless',              group: 'Finance' },
  { id: 'refunds',      label: 'Refund Management',       desc: 'Tiered approval refund processing',       group: 'Finance' },
  { id: 'hr',           label: 'HR & Payroll',            desc: 'Staff records, attendance, salary',        group: 'Admin' },
  { id: 'assets',       label: 'Asset Management',        desc: 'Equipment tracking and maintenance',       group: 'Admin' },
  { id: 'stores',       label: 'Stores & Warehouse',      desc: 'Procurement, GRN, stock levels',          group: 'Admin' },
  { id: 'mortuary',     label: 'Death & Mortuary',        desc: 'Death declaration, MCCD, valuables',      group: 'Admin' },
  { id: 'organ',        label: 'Organ Donation',          desc: 'NOTTO, living donor, retrieval OT',       group: 'Admin' },
];

const ModulesSection = () => {
  const [modules, setModules] = useState(
    Object.fromEntries(MODULE_LIST.map(m => [m.id, !['telemedicine','mortuary','organ'].includes(m.id)]))
  );
  const groups = [...new Set(MODULE_LIST.map(m => m.group))];

  return (
    <SectionCard title="Module Enable / Disable" subtitle="Turn on only the modules your hospital uses. Disabled modules won't appear in navigation." icon={ToggleLeft} accent="purple">
      {groups.map(group => (
        <div key={group} className="mb-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{group} Modules</p>
          <div className="space-y-2">
            {MODULE_LIST.filter(m=>m.group===group).map(mod => (
              <div key={mod.id} className={clsx('flex items-center justify-between p-3.5 rounded-xl border transition-all',
                modules[mod.id] ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50 border-slate-200')}>
                <div>
                  <p className={clsx('text-sm font-bold', modules[mod.id] ? 'text-blue-900' : 'text-slate-500')}>{mod.label}</p>
                  <p className="text-[10px] text-slate-400">{mod.desc}</p>
                </div>
                <Toggle enabled={modules[mod.id]} onChange={v => setModules(p=>({...p,[mod.id]:v}))} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <SaveBar section="Modules" onSave={() => {}} />
    </SectionCard>
  );
};

const FORM_FIELDS = {
  'OPD Registration': [
    'Middle Name', 'Aadhaar Number', 'Blood Group', 'Insurance / TPA',
    'Occupation', 'Marital Status', 'Emergency Contact', 'Referring Doctor',
    'Allergies (on registration)', 'Digital Consent Checkbox',
  ],
  'IPD Admission': [
    'Expected Length of Stay', 'Diet Orders', 'Fall Risk Score',
    'Attender Name & Relation', 'Corporate / Employer', 'Room Preference',
  ],
  'Prescription / EMR': [
    'SOAP Notes (Subjective)', 'SOAP Notes (Objective)', 'SOAP Notes (Assessment)',
    'SOAP Notes (Plan)', 'ICD-10 Diagnosis Code', 'CPT Procedure Code',
    'Follow-up Date', 'Referral Notes',
  ],
};

const FieldsSection = () => {
  const [fields, setFields] = useState(
    Object.fromEntries(
      Object.entries(FORM_FIELDS).flatMap(([form, flds]) =>
        flds.map(f => [`${form}|${f}`, { visible: true, required: false }])
      )
    )
  );

  return (
    <SectionCard title="Form Field Configuration" subtitle="Choose which fields are Visible / Required / Hidden per form" icon={Layout} accent="blue">
      {Object.entries(FORM_FIELDS).map(([form, flds]) => (
        <div key={form} className="mb-6">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">{form}</p>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b">
                <tr>
                  <th className="px-4 py-2.5 text-left">Field Name</th>
                  <th className="px-4 py-2.5 text-center">Visible</th>
                  <th className="px-4 py-2.5 text-center">Mandatory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {flds.map(field => {
                  const key = `${form}|${field}`;
                  const state = fields[key] || { visible: true, required: false };
                  return (
                    <tr key={field} className={clsx('transition-colors', !state.visible && 'opacity-40 bg-slate-50')}>
                      <td className="px-4 py-2.5 font-medium text-slate-700">{field}</td>
                      <td className="px-4 py-2.5 text-center">
                        <Toggle size="sm" enabled={state.visible} onChange={v=>setFields(p=>({...p,[key]:{...state,visible:v,required:v?state.required:false}}))} />
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <Toggle size="sm" enabled={state.required && state.visible} onChange={v=>setFields(p=>({...p,[key]:{...state,required:v}}))} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <SaveBar section="Field Config" onSave={() => {}} />
    </SectionCard>
  );
};

const NOTIF_TRIGGERS = [
  { id: 'appt_confirm', label: 'Appointment Confirmed', channels: ['sms', 'whatsapp'] },
  { id: 'appt_remind', label: 'Appointment Reminder (1 hr before)', channels: ['sms', 'whatsapp'] },
  { id: 'bill_paid', label: 'Payment Received', channels: ['sms', 'whatsapp', 'email'] },
  { id: 'report_ready', label: 'Lab / Radiology Report Ready', channels: ['sms', 'whatsapp'] },
  { id: 'discharge', label: 'Discharge Summary Sent', channels: ['email', 'whatsapp'] },
  { id: 'admit', label: 'IPD Admission Confirmed', channels: ['sms'] },
];

const NotificationsSection = () => {
  const [enabled, setEnabled] = useState(Object.fromEntries(NOTIF_TRIGGERS.map(t=>[t.id,true])));
  const [templates, setTemplates] = useState({
    appt_confirm: 'Dear {patient_name}, your appointment with {doctor_name} is confirmed for {date} at {time}. UHID: {uhid}. – City Care Hospital',
    appt_remind: 'Reminder: Your appointment at City Care Hospital is in 1 hour ({time}). Please arrive 15 mins early. – City Care',
    bill_paid: 'Dear {patient_name}, payment of ₹{amount} received (Bill #{bill_no}). Thank you! – City Care Hospital',
    report_ready: 'Dear {patient_name}, your {report_type} report is ready. Please collect from reception. – City Care Hospital',
    discharge: 'Dear {patient_name}, your discharge summary has been shared on this number. Get well soon! – City Care Hospital',
    admit: 'Dear {patient_name}, IPD admission confirmed. Bed: {bed_no}. Please contact nursing station. – City Care Hospital',
  });
  const [activeTemplate, setActiveTemplate] = useState('appt_confirm');

  return (
    <SectionCard title="Notification Templates (SMS / WhatsApp)" subtitle="Define message templates for each trigger event" icon={MessageSquare} accent="green">
      <div className="flex gap-6">
        <div className="w-56 shrink-0 space-y-1">
          {NOTIF_TRIGGERS.map(t => (
            <button key={t.id} onClick={()=>setActiveTemplate(t.id)}
              className={clsx('w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all text-xs font-bold',
                activeTemplate===t.id ? 'bg-green-600 text-white' : 'text-slate-600 hover:bg-slate-100')}>
              <span>{t.label}</span>
              <Toggle size="sm" enabled={enabled[t.id]} onChange={v=>setEnabled(p=>({...p,[t.id]:v}))} />
            </button>
          ))}
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">Template Message</p>
          <textarea rows={5} value={templates[activeTemplate]} onChange={e=>setTemplates(p=>({...p,[activeTemplate]:e.target.value}))}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500/20 resize-none font-mono leading-relaxed" />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {['{patient_name}','{doctor_name}','{date}','{time}','{uhid}','{amount}','{bill_no}','{bed_no}','{report_type}'].map(v=>(
              <button key={v} onClick={()=>setTemplates(p=>({...p,[activeTemplate]:p[activeTemplate]+v}))}
                className="px-2 py-0.5 text-[10px] bg-slate-100 text-slate-600 rounded font-mono hover:bg-green-100 hover:text-green-700 transition-colors">{v}</button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Click a variable to insert it at end of message. Character count: {(templates[activeTemplate]||'').length}/160</p>
        </div>
      </div>
      <SaveBar section="Notifications" onSave={() => {}} />
    </SectionCard>
  );
};

const ROLES = ['Super Admin','Doctor','Nurse','Receptionist','Billing Staff','Pharmacist','Lab Technician','Radiologist','Store Manager'];
const PERMISSIONS = [
  { id: 'view_patient', label: 'View Patient Records' },
  { id: 'edit_patient', label: 'Edit / Update Patient Info' },
  { id: 'view_billing', label: 'View Billing/Invoices' },
  { id: 'create_bill', label: 'Create Bills & Receipts' },
  { id: 'approve_refund', label: 'Approve Refunds' },
  { id: 'view_reports', label: 'View MIS Reports' },
  { id: 'manage_pharmacy', label: 'Pharmacy Dispensing' },
  { id: 'manage_lab', label: 'Lab Orders & Results' },
  { id: 'ipd_admission', label: 'IPD Admission & Discharge' },
  { id: 'manage_staff', label: 'Manage Staff / HR' },
  { id: 'system_settings', label: 'Access System Settings' },
];

const RolesSection = () => {
  const [selectedRole, setSelectedRole] = useState('Doctor');
  const defaultPerms = {
    'Super Admin': Object.fromEntries(PERMISSIONS.map(p=>[p.id,true])),
    'Doctor': { view_patient:true, edit_patient:true, view_billing:false, create_bill:false, approve_refund:false, view_reports:true, manage_pharmacy:false, manage_lab:true, ipd_admission:true, manage_staff:false, system_settings:false },
    'Nurse': { view_patient:true, edit_patient:true, view_billing:false, create_bill:false, approve_refund:false, view_reports:false, manage_pharmacy:true, manage_lab:false, ipd_admission:false, manage_staff:false, system_settings:false },
    'Receptionist': { view_patient:true, edit_patient:true, view_billing:true, create_bill:true, approve_refund:false, view_reports:false, manage_pharmacy:false, manage_lab:false, ipd_admission:false, manage_staff:false, system_settings:false },
    'Billing Staff': { view_patient:true, edit_patient:false, view_billing:true, create_bill:true, approve_refund:true, view_reports:true, manage_pharmacy:false, manage_lab:false, ipd_admission:false, manage_staff:false, system_settings:false },
  };
  const [perms, setPerms] = useState(defaultPerms);

  const rolePerms = perms[selectedRole] || {};
  const toggle = (perm) => setPerms(p => ({ ...p, [selectedRole]: { ...rolePerms, [perm]: !rolePerms[perm] } }));

  return (
    <SectionCard title="Roles & Permissions (RBAC)" subtitle="Define which staff roles can access which features" icon={Lock} accent="red">
      <div className="flex gap-6">
        <div className="w-48 shrink-0 space-y-1">
          {ROLES.map(role => (
            <button key={role} onClick={()=>setSelectedRole(role)}
              className={clsx('w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all',
                selectedRole===role ? 'bg-red-600 text-white' : 'text-slate-600 hover:bg-slate-100')}>
              {role}
            </button>
          ))}
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-3">{selectedRole} — Permissions</p>
          {PERMISSIONS.map(perm => (
            <div key={perm.id} className={clsx('flex items-center justify-between px-4 py-3 rounded-xl border transition-all',
              rolePerms[perm.id] ? 'bg-red-50/50 border-red-200' : 'bg-slate-50 border-slate-200')}>
              <span className={clsx('text-sm font-bold', rolePerms[perm.id] ? 'text-red-900' : 'text-slate-400')}>{perm.label}</span>
              <Toggle enabled={!!rolePerms[perm.id]} onChange={()=>toggle(perm.id)} />
            </div>
          ))}
        </div>
      </div>
      <SaveBar section="Roles" onSave={() => {}} />
    </SectionCard>
  );
};

const BarcodeSection = () => {
  const [format, setFormat] = useState('CODE128');
  const [includeText, setIncludeText] = useState(true);
  const [printAuto, setPrintAuto] = useState(false);
  const [types, setTypes] = useState({ lab: true, pharma: true, asset: false, wristband: true });

  return (
    <SectionCard title="Barcode & QR Standard Config" subtitle="Set identification standards for samples, stock, and wristbands" icon={Hash} accent="blue">
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Barcode Symbology (Standard)" hint="CODE128 is industry standard for clinical samples">
          <Select value={format} onChange={e=>setFormat(e.target.value)}>
            <option value="CODE128">Code 128 (Alphanumeric)</option>
            <option value="QR">QR Code (High Density)</option>
            <option value="EAN13">EAN-13 (Numerical Only)</option>
            <option value="DATA_MATRIX">Data Matrix (Miniature)</option>
          </Select>
        </Field>
        
        <div className="space-y-3">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Automated Printing Triggers</p>
          {Object.entries(types).map(([k,v]) => (
            <div key={k} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
               <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{k} Labels</span>
               <Toggle enabled={v} onChange={newV => setTypes(p=>({...p,[k]:newV}))} size="sm" />
            </div>
          ))}
        </div>

        <div className="md:col-span-2 p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-4">
               {format === 'QR' ? <div className="w-24 h-24 bg-slate-900 rounded-lg" /> : <div className="w-48 h-12 bg-slate-900 rounded-sm" />}
               <p className="text-xs font-mono font-black tracking-widest text-slate-400">SAMPLE-2024-99812</p>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-6">Live Generated Label Preview</p>
        </div>
      </div>
      <SaveBar section="Barcode" onSave={() => {}} />
    </SectionCard>
  );
};

// ─── MAIN SETTINGS PAGE ────────────────────────────────────────────────────
const Settings = () => {
  const [active, setActive] = useState('identity');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const PANELS = {
    identity: <IdentitySection />,
    uhid: <UhidSection />,
    commission: <CommissionSection />,
    billing: <BillingSection />,
    tax: <TaxSection />,
    barcode: <BarcodeSection />,
    modules: <ModulesSection />,
    fields: <FieldsSection />,
    notifications: <NotificationsSection />,
    roles: <RolesSection />,
  };

  return (
    <div className="flex gap-6 min-h-[calc(100vh-120px)]">
      {/* Left Nav */}
      <div className="w-60 shrink-0 space-y-1 sticky top-6 self-start">
        <div className="flex items-center gap-2 px-3 py-3 mb-3">
          <SettingsIcon size={20} className="text-slate-400" />
          <span className="font-black text-slate-800 text-sm uppercase tracking-widest">Configuration</span>
        </div>
        {NAV.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)}
            className={clsx('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all text-sm',
              active === item.id
                ? 'bg-slate-900 text-white font-black shadow-lg'
                : 'text-slate-600 font-bold hover:bg-slate-100')}>
            <item.icon size={16} className={active === item.id ? 'text-white' : 'text-slate-400'} />
            {item.label}
            {active === item.id && <ChevronRight size={14} className="ml-auto" />}
          </button>
        ))}

        <div className="pt-4 px-3">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs font-black text-amber-800 flex items-center gap-1.5"><AlertTriangle size={12}/> Reminder</p>
            <p className="text-[10px] text-amber-700 mt-1">Changes only take effect after clicking <strong>Save</strong> in each section.</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
            {PANELS[active]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Saved Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-8 right-8 px-5 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center gap-3 z-50">
            <Check size={18} className="text-green-400" /> Settings saved successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
