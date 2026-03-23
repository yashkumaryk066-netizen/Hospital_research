import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import useStore from '../../store/useStore';

const SESSION_TIMEOUT_MS = 15 * 60 * 1000; // HIPAA-001: 15 minute timeout

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { setUser } = useStore();
    const navigate = useNavigate();
    const timerRef = useRef(null);

    const resetTimer = useCallback(() => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            // HIPAA-001 fix: Auto-logout after 15 min inactivity
            console.log("Session timed out due to inactivity.");
            setUser(null);
            navigate('/login');
        }, SESSION_TIMEOUT_MS);
    }, [setUser, navigate]);

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll'];
        events.forEach(e => window.addEventListener(e, resetTimer));
        resetTimer(); // start timer on mount
        return () => {
            events.forEach(e => window.removeEventListener(e, resetTimer));
            clearTimeout(timerRef.current);
        };
    }, [resetTimer]);

    return (
        <div className="flex bg-slate-50 dark:bg-dark-bg min-h-screen transition-colors duration-300 font-sans antialiased">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 flex flex-col transition-all duration-300 w-full lg:pl-[280px]">
                <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 p-6 lg:p-8 overflow-x-hidden bg-slate-50/50 dark:bg-[#0B1120]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
