import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartPulse, Lock, User, ArrowRight, Activity, 
  CheckCircle2, AlertTriangle, ChevronLeft,
  Fingerprint, Smartphone, Shield, Monitor,
  Stethoscope, Baby, Eye, Microscope
} from 'lucide-react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import useStore from '../store/useStore';
import { clsx } from 'clsx';
import { login as loginApi } from '../api/auth';

const ROLES = [
  { id: 'Super Admin', icon: Shield,      desc: 'Enterprise MIS & Full Audit',  bg: 'from-slate-900 to-blue-950', accent: 'bg-slate-700 text-white' },
  { id: 'Doctor',      icon: Stethoscope, desc: 'Clinical CIS & Patient Rounds', bg: 'from-blue-900 to-indigo-950', accent: 'bg-blue-700 text-white' },
  { id: 'Nurse',       icon: Activity,    desc: 'Ward Management & Nursing Ops', bg: 'from-indigo-900 to-purple-950', accent: 'bg-indigo-700 text-white' },
  { id: 'Lab',         icon: Microscope,  desc: 'Diagnostics, LIMS & Reports',  bg: 'from-teal-900 to-cyan-950', accent: 'bg-teal-700 text-white' },
  { id: 'Patient',     icon: HeartPulse,  desc: 'Health Records & PHR Portal',  bg: 'from-emerald-900 to-green-950', accent: 'bg-emerald-700 text-white' },
  { id: 'Pharmacy',    icon: Eye,         desc: 'Inventory & Dispensing ERP',   bg: 'from-orange-900 to-amber-950', accent: 'bg-orange-700 text-white' },
];

const DEFAULT_CREDS = {
  'Super Admin': 'admin@healcare.ai',
  'Doctor':      'doctor@healcare.ai',
  'Nurse':       'nurse@healcare.ai',
  'Lab':         'lab@healcare.ai',
  'Patient':     'patient@healcare.ai',
  'Pharmacy':    'pharmacy@healcare.ai',
};

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setUser = useStore(state => state.setUser);
  
  const initialRole = searchParams.get('role') || 'Super Admin';
  const [step, setStep]         = useState(1);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]         = useState(initialRole);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState(null);

  useEffect(() => {
    setEmail(DEFAULT_CREDS[role] || '');
    setPassword('admin123');
  }, [role]);

  const currentRole = ROLES.find(r => r.id === role) || ROLES[0];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTimeout(() => { setIsLoading(false); setStep(2); }, 1200);
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await loginApi(email, password);
      setUser({ ...userData, avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=3B82F6&color=fff` });
      navigate('/');
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Invalid credentials. Please try again.');
      setStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans overflow-hidden">

      {/* ── LEFT PANEL ─────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={role}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={clsx(
            'hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col justify-between p-16 bg-gradient-to-br',
            currentRole.bg
          )}
        >
          {/* grid overlay */}
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
          {/* glow */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

          {/* Top brand */}
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <HeartPulse size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-black text-white tracking-tight">
                Heal<span className="text-blue-400 italic">Care</span>
                <span className="ml-1 text-[9px] font-black bg-blue-500 px-1.5 py-0.5 rounded-md align-middle">AI</span>
              </p>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Hospital Management System</p>
            </div>
          </div>

          {/* Center copy */}
          <div className="relative z-10">
            <motion.div
              key={`icon-${role}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.08 }}
              className="absolute -top-20 -right-10"
            >
              <currentRole.icon size={400} strokeWidth={0.5} className="text-white" />
            </motion.div>

            <motion.div
              key={`heading-${role}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-blue-400 text-[11px] font-black uppercase tracking-[0.3em] mb-6">
                {currentRole.desc}
              </p>
              <h2 className="text-5xl xl:text-6xl font-black text-white leading-tight mb-8 tracking-tighter">
                The Intelligent<br />
                <span className="text-blue-400">{role}</span><br />
                Workspace.
              </h2>
              <p className="text-white/50 text-base leading-relaxed max-w-md font-medium">
                Secure, HIPAA-compliant access to your personalized clinical environment. AI-powered insights, real-time data, and seamless workflows built for USA & India's leading hospitals.
              </p>
            </motion.div>
          </div>

          {/* Bottom trust metrics */}
          <div className="relative z-10 flex items-center gap-10">
            {[
              { val: '99.9%', label: 'Uptime SLA' },
              { val: 'AES-256', label: 'Encryption' },
              { val: 'HIPAA', label: 'Compliant' },
            ].map((m, i) => (
              <React.Fragment key={m.label}>
                {i > 0 && <div className="w-px h-8 bg-white/10" />}
                <div>
                  <p className="text-2xl font-black text-white">{m.val}</p>
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">{m.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Floating device card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute bottom-16 right-16 p-5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl hidden xl:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Monitor size={20} className="text-green-400" />
              </div>
              <div>
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">System Status</p>
                <p className="text-xs font-bold text-white">All Services: Operational</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── RIGHT PANEL (Auth Form) ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center bg-white p-8 sm:p-12 xl:p-20 relative overflow-auto">
        {/* Back link */}
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all group">
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Home
        </Link>

        {/* Mobile brand */}
        <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center">
            <HeartPulse size={22} className="text-blue-600" />
          </div>
          <p className="text-xl font-black text-slate-900">
            Heal<span className="text-blue-600 italic">Care</span>
            <span className="ml-1 text-[9px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded-md align-middle">AI</span>
          </p>
        </div>

        <div className="max-w-md w-full mx-auto">
          <AnimatePresence mode="wait">
            {/* STEP 1 — Role + Credentials */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">Welcome Back</h1>
                <p className="text-slate-400 font-medium mb-8 text-sm">Select your role and sign in to HealCare AI</p>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-600"
                    >
                      <AlertTriangle size={16} />
                      <span className="text-xs font-bold">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Role Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
                  {ROLES.map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={clsx(
                        'p-4 rounded-2xl border-2 transition-all flex flex-col items-start gap-3 group text-left relative overflow-hidden',
                        role === r.id
                          ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10'
                          : 'border-slate-100 hover:border-slate-200 bg-white hover:shadow-md'
                      )}
                    >
                      <div className={clsx(
                        'w-9 h-9 rounded-xl flex items-center justify-center transition-all',
                        role === r.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600'
                      )}>
                        <r.icon size={18} />
                      </div>
                      <div>
                        <p className={clsx('text-[10px] font-black uppercase tracking-widest leading-none mb-1', role === r.id ? 'text-blue-600' : 'text-slate-700')}>{r.id}</p>
                        <p className="text-[8px] font-bold text-slate-400 line-clamp-1 leading-tight">{r.desc}</p>
                      </div>
                      {role === r.id && (
                        <div className="absolute top-3 right-3 text-blue-600">
                          <CheckCircle2 size={14} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email / User ID</label>
                    <div className="relative group">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your@hospital.com"
                        className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-600/8 focus:bg-white focus:border-blue-400 text-sm font-bold transition-all placeholder:text-slate-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
                    <div className="relative group">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••••"
                        className="w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-600/8 focus:bg-white focus:border-blue-400 text-sm font-bold tracking-widest transition-all"
                        required
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Demo badge */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-100 rounded-xl">
                    <Monitor size={12} className="text-amber-600 shrink-0" />
                    <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest">Demo Mode · Password auto-filled: admin123</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.15em] shadow-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50 group text-sm"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Authenticating...</span>
                    ) : (
                      <><span>Access Dashboard</span> <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2 — OTP Verify */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 mx-auto mb-8 shadow-inner">
                  <Smartphone size={40} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">Two-Factor Auth</h2>
                <p className="text-slate-400 font-medium mb-10 text-sm leading-relaxed">
                  A 4-digit OTP has been sent to your registered mobile <strong className="text-slate-600">××××-982</strong>. Enter below to confirm.
                </p>

                <div className="flex justify-center gap-3 mb-10">
                  {[1, 2, 3, 4].map(i => (
                    <input key={i} type="text" maxLength="1"
                      className="w-14 h-16 bg-slate-50 border-2 border-slate-200 rounded-2xl text-center text-2xl font-black focus:border-blue-600 focus:ring-4 focus:ring-blue-600/8 outline-none transition-all"
                      defaultValue={i + 1}
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={isLoading}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.15em] shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50 text-sm mb-6"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying...</span>
                  ) : 'Finalize Authentication'}
                </button>

                <button onClick={() => setStep(1)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors flex items-center gap-2 mx-auto">
                  <ChevronLeft size={12} /> Back to Login
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Fingerprint size={14} className="text-slate-300" />
              Biometric Ready
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              All Systems Normal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
