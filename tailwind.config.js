/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Trust & Professionalism (Primary Brands)
                brand: {
                    DEFAULT: "#2563EB", // Royal Blue
                    dark: "#1E40AF",
                    light: "#60A5FA",
                    subtle: "#EFF6FF", // Very light blue bg
                },
                // Medical / Clinical (Accents)
                medical: {
                    teal: "#0D9488", // Teal 600 - Healing/Surgery
                    green: "#10B981", // Emerald 500 - Success/Safe
                    red: "#EF4444",   // Red 500 - Critical/Emergency
                    amber: "#F59E0B", // Amber 500 - Warning
                    purple: "#8B5CF6", // Violet 500 - Specialized/VIP
                },
                // Neutral / Surface Colors (Premium Feel)
                slate: {
                    850: "#1e293b", // Custom dark card
                    950: "#020617", // Deepest background
                },
                surface: {
                    light: "#FFFFFF",
                    hover: "#F8FAFC", // Slate 50
                    border: "#E2E8F0", // Slate 200
                    dark: "#0F172A", // Slate 900
                }
            },
            fontFamily: {
                sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"], // For numeric data/IDs
            },
            boxShadow: {
                'soft': '0 2px 10px rgba(0, 0, 0, 0.03)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'glow': '0 0 15px rgba(37, 99, 235, 0.2)', // Brand glow
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }
        },
    },
    plugins: [],
}
