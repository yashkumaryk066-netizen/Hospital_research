import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set) => ({
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
            user: {
                id: 'DOC-001',
                name: 'Dr. Sarah Wilson',
                role: 'Doctor', // Admin, Nurse, Pharmacist
                dept: 'Cardiology'
            },
            setUser: (user) => set({ user }),

            // --- Patient Context (The "Hub") ---
            activePatient: null, // Should hold { id, name, uhid, ... }
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
            name: 'hospital-storage', // unique name
            partialize: (state) => ({ darkMode: state.darkMode, user: state.user }), // Only persist theme & user
        }
    )
);

export default useStore;
