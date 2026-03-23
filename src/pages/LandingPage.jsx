import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  HeartPulse, Activity, Users, Phone, Mail, 
  MapPin, Clock, ArrowRight, Shield, 
  Stethoscope, Star, CheckCircle2,
  Brain, Baby, Bone, Eye, Microscope, Zap,
  ChevronRight, Play, Award, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

const STATS = [
  { val: '250+', label: 'ICU & General Beds', icon: HeartPulse },
  { val: '15k+', label: 'Successful Surgeries', icon: Award },
  { val: '500+', label: 'Medical Specialists', icon: Users },
  { val: '98%', label: 'Patient Satisfaction', icon: Star },
];

const DEPARTMENTS = [
  { icon: HeartPulse, title: 'Cardiology & Robotic Surgery', desc: 'Precision robotic-assisted heart surgery with 99.2% success rate using da Vinci system.', color: 'from-rose-500 to-pink-600', shadow: 'shadow-rose-200' },
  { icon: Brain, title: 'Neurology & Spine', desc: 'Advanced neuro-diagnostics, deep brain stimulation, and minimally invasive spinal surgery.', color: 'from-purple-500 to-indigo-600', shadow: 'shadow-purple-200' },
  { icon: Microscope, title: 'Oncology Center', desc: 'Immunotherapy, precision radiation (IMRT/VMAT), and multi-disciplinary tumor board.', color: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-200' },
  { icon: Baby, title: 'Neonatal & Mother Care', desc: 'Level III NICU, fetal medicine, high-risk pregnancy management, and APGAR monitoring.', color: 'from-blue-500 to-sky-600', shadow: 'shadow-blue-200' },
  { icon: Bone, title: 'Orthopaedics & Joint Replacement', desc: 'Computer-navigated knee/hip replacements, arthroscopy, and sports medicine.', color: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-200' },
  { icon: Eye, title: 'Ophthalmology & Lasik', desc: 'LASIK, SMILE, retinal surgery, corneal transplants, and glaucoma management.', color: 'from-cyan-500 to-blue-600', shadow: 'shadow-cyan-200' },
];

const PORTALS = [
  { to: '/login?role=Patient', icon: HeartPulse, label: 'Patient Portal', desc: 'Book, track & manage your health', color: 'emerald' },
  { to: '/login?role=Doctor', icon: Stethoscope, label: 'Doctor Portal', desc: 'CIS, OPD rounds & prescriptions', color: 'blue' },
  { to: '/login?role=Super Admin', icon: Shield, label: 'Admin Center', desc: 'MIS, audit & full system control', color: 'indigo' },
];

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="bg-[#f8faff] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">

      {/* ── NAVIGATION ──────────────────────────────────────────────── */}
      <nav className={clsx(
        'fixed top-0 w-full z-50 transition-all duration-500 px-6 lg:px-12',
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-blue-900/5 py-3 border-b border-slate-100'
          : 'bg-transparent py-6'
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 blur-lg" />
              <div className="relative w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20">
                <HeartPulse size={22} className="text-blue-600" />
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                Heal<span className="text-blue-600 italic">Care</span>
                <span className="ml-1 text-[9px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded-md align-middle">AI</span>
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="hidden lg:flex items-center gap-10">
            {['Home', 'Departments', 'Doctors', 'About', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-[11px] font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-[0.15em]">
                {link}
              </a>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 border border-slate-200 rounded-2xl p-1">
              {PORTALS.map(p => (
                <Link key={p.to} to={p.to}
                  className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 hover:bg-white hover:shadow-sm rounded-xl transition-all">
                  {p.label.split(' ')[0]}
                </Link>
              ))}
            </div>
            <Link to="/login"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[11px] font-black shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest">
              Login →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-20 px-6 lg:px-12 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10 w-full">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full mb-8 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-widest">USA & India's #1 Hospital OS</span>
            </motion.div>

            <h1 className="text-5xl lg:text-[5rem] font-black text-slate-900 leading-[1.05] mb-8 tracking-tighter">
              The Intelligent<br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Hospital OS</span><br />
              for the Future.
            </h1>

            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              HealCare AI is an enterprise-grade Hospital Management System built for USA and India's leading multi-specialty hospitals. Real-time clinical intelligence, unified patient records, and AI-assisted diagnostics.
            </p>

            {/* Portal grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
              {PORTALS.map(p => <PortalBox key={p.to} {...p} />)}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <Link to="/login"
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-2xl shadow-slate-900/20 flex items-center gap-3 hover:bg-slate-800 transition-all group text-sm">
                Access Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-white text-slate-700 rounded-2xl font-black shadow-lg border border-slate-200 flex items-center gap-3 hover:shadow-xl transition-all group text-sm">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Play size={12} className="text-white translate-x-0.5" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center lg:justify-start gap-6">
              <div className="flex -space-x-3">
                {[11, 12, 14, 16].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} alt="doc" className="w-11 h-11 rounded-full border-3 border-white shadow-md" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="currentColor" />)}
                </div>
                <p className="text-sm font-black text-slate-800">Trusted by 500+ Specialists</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">JCI • NABH • HIPAA Compliant</p>
              </div>
            </div>
          </motion.div>

          {/* Right — visual dashboard card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative max-w-2xl w-full"
          >
            {/* Main card */}
            <div className="relative bg-white rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(59,130,246,0.2)] border border-slate-100 overflow-hidden aspect-[4/3]">
              {/* Simulated dark sidebar */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-[#020617] flex flex-col items-center pt-6 gap-4">
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
                  <HeartPulse size={16} className="text-blue-600" />
                </div>
                {[Stethoscope, Activity, Users, Microscope, Shield].map((I, idx) => (
                  <div key={idx} className={clsx('w-9 h-9 rounded-xl flex items-center justify-center transition-all', idx === 0 ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-800 cursor-pointer')}>
                    <I size={18} />
                  </div>
                ))}
              </div>

              {/* Main content area */}
              <div className="ml-16 p-6 h-full bg-gradient-to-br from-slate-50 to-white">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Live Patient Dashboard</p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'OPD Today', val: '124', color: 'bg-blue-50 text-blue-600' },
                    { label: 'IPD Occupied', val: '89/100', color: 'bg-amber-50 text-amber-600' },
                    { label: 'Surgeries', val: '12', color: 'bg-emerald-50 text-emerald-600' },
                  ].map(s => (
                    <div key={s.label} className={clsx('rounded-2xl p-3', s.color)}>
                      <p className="text-2xl font-black">{s.val}</p>
                      <p className="text-[9px] font-bold uppercase tracking-wider opacity-70">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Recent Admissions</p>
                  {[
                    { name: 'Sarah Johnson', dept: 'Cardiology', status: 'Critical', color: 'text-red-600 bg-red-50' },
                    { name: 'Arun Sharma', dept: 'Orthopaedics', status: 'Stable', color: 'text-green-600 bg-green-50' },
                    { name: 'Emily Watson', dept: 'Neurology', status: 'Observation', color: 'text-amber-600 bg-amber-50' },
                  ].map(p => (
                    <div key={p.name} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-[10px] font-black">{p.name[0]}</div>
                        <div>
                          <p className="text-xs font-bold text-slate-700">{p.name}</p>
                          <p className="text-[9px] text-slate-400">{p.dept}</p>
                        </div>
                      </div>
                      <span className={clsx('text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest', p.color)}>{p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -left-10 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white"><HeartPulse size={20} /></div>
                <div>
                  <p className="text-xl font-black text-slate-800">99.8%</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Surgery Success</p>
                </div>
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -right-8 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white"><Zap size={20} /></div>
                <div>
                  <p className="text-xl font-black text-slate-800">AI-Powered</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Diagnosis Assist</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST BAR ──────────────────────────────────────────────── */}
      <div className="bg-slate-900 py-8 overflow-hidden">
        <div className="flex items-center gap-20 whitespace-nowrap animate-marquee">
          {['JCI ACCREDITED', 'NABH CERTIFIED', 'HIPAA COMPLIANT', 'ISO 9001:2015', 'HL7 FHIR READY', 'AES-256 SECURE', 'SOC 2 TYPE II'].map(b => (
            <span key={b} className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">{b}</span>
          ))}
          {['JCI ACCREDITED', 'NABH CERTIFIED', 'HIPAA COMPLIANT', 'ISO 9001:2015', 'HL7 FHIR READY', 'AES-256 SECURE', 'SOC 2 TYPE II'].map(b => (
            <span key={b+'2'} className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">{b}</span>
          ))}
        </div>
      </div>

      {/* ── DEPARTMENTS ────────────────────────────────────────────── */}
      <section id="departments" className="py-28 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-18">
            <p className="text-blue-600 font-black uppercase text-[11px] tracking-[0.3em] mb-4">Clinical Excellence</p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-5 tracking-tighter">World-Class Specialties</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Each department is equipped with cutting-edge technology, internationally-trained specialists, and AI-assisted diagnostic systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {DEPARTMENTS.map(dept => <DeptCard key={dept.title} {...dept} />)}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────── */}
      <section className="relative py-28 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white tracking-tighter mb-4">By the Numbers</h2>
            <p className="text-blue-300 font-medium">Trusted by patients and healthcare providers across USA & India</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(s => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-center group">
                <div className="w-14 h-14 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-600 transition-all duration-300">
                  <s.icon size={24} className="text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-5xl font-black text-white mb-2 tracking-tight">{s.val}</h3>
                <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.25em]">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer id="contact" className="py-20 px-6 lg:px-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white border border-blue-100 rounded-2xl flex items-center justify-center shadow-md">
                <HeartPulse size={22} className="text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">
                  Heal<span className="text-blue-600 italic">Care</span>
                  <span className="ml-1 text-[9px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded-md align-middle">AI</span>
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hospital Management System</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8 font-medium">
              Enterprise-grade clinical intelligence platform for USA & India's leading multi-specialty hospitals. HIPAA, NABH, and JCI compliant.
            </p>
            <div className="flex gap-3">
              {[Globe, Phone, Mail, MapPin].map((I, i) => (
                <div key={i} className="w-10 h-10 bg-slate-50 border border-slate-100 text-slate-400 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer">
                  <I size={16} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-black text-slate-800 text-[11px] uppercase tracking-[0.2em] mb-6">Quick Access</h5>
            <ul className="space-y-3">
              {['Book Appointment', 'Lab Results', 'Online Pharmacy', 'Doctor Directory', 'Emergency Line'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-black text-slate-800 text-[11px] uppercase tracking-[0.2em] mb-6">Emergency Response</h5>
            <div className="p-5 bg-red-50 rounded-2xl border border-red-100 group hover:border-red-300 transition-all cursor-pointer mb-4">
              <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">24/7 Critical Care Line</p>
              <h6 className="text-xl font-black text-red-600 mb-3">+1-800-HEALCARE</h6>
              <div className="flex items-center gap-2 text-[9px] font-black text-red-500 uppercase">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
                Avg. Response: 8 Minutes
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Clock size={14} className="text-slate-400" />
              <span className="text-[11px] font-bold text-slate-500">OPD: Mon–Sat, 8AM–8PM</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-10 mt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 HealCare AI Medical Systems. All Rights Reserved.</p>
          <div className="flex gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Cookie Policy'].map(l => (
              <span key={l} className="hover:text-blue-600 cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ── Sub-components ──────────────────────────────────────────── */
const PortalBox = ({ to, icon: Icon, label, desc, color }) => {
  const styles = {
    emerald: 'bg-emerald-50 border-emerald-100 hover:border-emerald-400 text-emerald-600 hover:shadow-emerald-100',
    blue: 'bg-blue-50 border-blue-100 hover:border-blue-400 text-blue-600 hover:shadow-blue-100',
    indigo: 'bg-indigo-50 border-indigo-100 hover:border-indigo-400 text-indigo-600 hover:shadow-indigo-100',
  };
  return (
    <Link to={to} className={clsx(
      'p-5 rounded-2xl border-2 transition-all group text-left flex flex-col gap-3 hover:shadow-lg',
      styles[color] || styles.blue
    )}>
      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 group-hover:-rotate-3">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-[9px] font-bold text-slate-400 leading-tight">{desc}</p>
      </div>
      <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
        Enter <ArrowRight size={10} />
      </div>
    </Link>
  );
};

const DeptCard = ({ icon: Icon, title, desc, color, shadow }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className="p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-blue-200 transition-all group hover:shadow-2xl hover:shadow-blue-500/5 cursor-pointer relative overflow-hidden"
  >
    <div className={clsx('w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br text-white shadow-xl transition-all group-hover:scale-110 group-hover:rotate-3', color, shadow)}>
      <Icon size={26} />
    </div>
    <h3 className="text-lg font-black text-slate-800 mb-3 tracking-tight">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed font-medium mb-5">{desc}</p>
    <div className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest group-hover:gap-3 transition-all">
      Learn More <ArrowRight size={12} />
    </div>
    <div className="absolute right-[-24px] bottom-[-24px] w-28 h-28 bg-slate-50 rounded-full -z-10 group-hover:scale-150 transition-transform duration-700 opacity-50" />
  </motion.div>
);

export default LandingPage;
