import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Home, ChevronRight, Search, Activity } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans overflow-hidden relative">
            
            {/* Background Medical Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
                <Activity size={800} strokeWidth={0.5} className="absolute -top-40 -left-40 text-blue-600 rotate-12" />
                <Stethoscope size={600} strokeWidth={0.5} className="absolute -bottom-20 -right-20 text-blue-600 -rotate-12" />
            </div>

            <div className="max-w-xl w-full text-center relative z-10">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                    className="mb-8"
                >
                    <div className="w-32 h-32 bg-blue-50 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner relative">
                       <Stethoscope size={64} className="text-blue-600" />
                       <motion.div 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full border-4 border-white flex items-center justify-center text-white text-[10px] font-black"
                       >
                         !
                       </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-9xl font-black text-slate-900 leading-none tracking-tighter mb-4">404</h1>
                    <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Diagnosis: Page Not Found</h2>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12 max-w-md mx-auto">
                        The resource you are looking for has been moved, removed, or is currently in surgery. Please check the URL or return to safety.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/" className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95 group">
                        <Home size={18} /> Emergency Exit Home <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <button onClick={() => navigate(-1)} className="w-full sm:w-auto px-10 py-5 bg-slate-100 text-slate-600 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all flex items-center justify-center gap-3">
                         Review Previous Step
                    </button>
                </motion.div>

                {/* Quick Shortcuts */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-20 pt-10 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6"
                >
                    {[
                        { name: 'OPD', path: '/opd' },
                        { name: 'Patient Search', path: '/patients' },
                        { name: 'Pharmacy', path: '/pharmacy' },
                        { name: 'Settings', path: '/settings' }
                    ].map(link => (
                        <Link key={link.name} to={link.path} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-all">
                            {link.name}
                        </Link>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
