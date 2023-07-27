/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './containers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: '#26374c',
      },
      backgroundColor: {
        primary: 'var(--color-primary)',
        neutral: '#F4F5F6',
        'neutral-2': '#FCFCFD',
      },
      borderColor: {
        divider: '#E6E8EC',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // preflight: false,
  },
};
