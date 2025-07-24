// tailwind.config.ts
import type { Config } from 'tailwindcss';  
// Tailwind no exporta defineConfig, usamos directamente un objeto tipado
const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:    'var(--bg)',     // Variables definidas en index.css
        fg:    'var(--fg)',
        primary: 'var(--primary)',
      },
      spacing: {
        'nav-gap': '1rem',
      },
      borderRadius: {
        btn: '0.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
