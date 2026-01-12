/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Node Editor Hintergrund
        editor: {
          bg: '#1a1a2e',
          surface: '#16213e',
          border: '#0f3460',
        },
        // Primärfarben
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Status-Farben
        status: {
          draft: '#6b7280',
          generating: '#3b82f6',
          review: '#f59e0b',
          approved: '#10b981',
          notified: '#8b5cf6',
        },
      },
    },
  },
  plugins: [],
}
