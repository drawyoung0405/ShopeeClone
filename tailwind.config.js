/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange:'#ee4d2d',
        dark:'#1c1c1c',
        lightGray:'#f5f5f5',
    }
  },
  plugins: [],
}
}
