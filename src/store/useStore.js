import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set, get) => ({
            // --- User Preferences ---
            darkMode: false,
            toggleDarkMode: () => set((state) => {
                const newMode = !state.darkMode;
                if (newMode) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                return { darkMode: newMode };
            }),

            // --- User Session ---
            user: null, 
            setUser: (user) => set({ user }),

            // --- Clinical Audit Logging (HIPAA Requirement) ---
            auditLog: [],
            logAction: async (action, module, details) => {
                const entry = {
                    id: Date.now(),
                    timestamp: new Date().toISOString(),
                    user: get().user?.name || 'System',
                    user_id: get().user?.id || 'sys',
                    action,
                    module,
                    details,
                    ip_address: '127.0.0.1' // In production, backend should capture this
                };
                
                // Update local state first
                set(state => ({ 
                    auditLog: [entry, ...state.auditLog].slice(0, 500) 
                }));

                // Sync to Backend (Non-blocking)
                import('../api/client').then(({ default: client }) => {
                    client.post('audit-logs/', entry).catch(err => {
                        console.error('[AUDIT SYNC ERROR]', err);
                    });
                });

                console.log(`[AUDIT] ${entry.user} | ${module} | ${action}`, details);
            },

            // --- Patient Context (The "Hub") ---
            activePatient: null, 
            setActivePatient: (patient) => set({ activePatient: patient }),

            // --- Global Notifications ---
            notifications: [],
            addNotification: (entry) => set((state) => ({
                notifications: [
                    { id: Date.now(), timestamp: new Date(), ...entry },
                    ...state.notifications
                ]
            })),
            clearNotifications: () => set({ notifications: [] }),
        }),
        {
            name: 'hospital-storage',
            storage: {
                getItem: (name) => {
                    const str = sessionStorage.getItem(name);
                    if (!str) return null;
                    return JSON.parse(str);
                },
                setItem: (name, value) => {
                    sessionStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => sessionStorage.removeItem(name),
            },
            version: 2, 
            partialize: (state) => ({ 
                darkMode: state.darkMode, 
                user: state.user,
                auditLog: state.auditLog
            }),
        }
    )
);

export default useStore;
