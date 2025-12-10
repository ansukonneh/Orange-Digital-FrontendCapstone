/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e50914',       // your red
        secondary: '#141414',     // dark background
        background: '#0a0a0a',
        surface: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#b3b3b3',
        accent: '#f5c518',        // yellow accent
      },
      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.5)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
}
