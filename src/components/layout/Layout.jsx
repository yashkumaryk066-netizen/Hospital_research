import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex bg-slate-50 dark:bg-dark-bg min-h-screen transition-colors duration-300">
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
