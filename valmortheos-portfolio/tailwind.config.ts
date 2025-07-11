import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#00CED1', // Dark Turquoise - bisa disesuaikan
        'brand-black': '#1a1a1a',
        'brand-white': '#ffffff',
        'glass-edge': 'rgba(255, 255, 255, 0.1)', // Untuk efek glass morphism
        'glass-surface': 'rgba(255, 255, 255, 0.05)', // Untuk efek glass morphism
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      }
    },
  },
  plugins: [],
}
export default config
