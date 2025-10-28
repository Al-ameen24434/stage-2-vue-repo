export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ticket: {
          open: {
            bg: 'rgb(220 252 231)',
            text: 'rgb(21 128 61)',
            border: 'rgb(134 239 172)',
          },
          in_progress: {
            bg: 'rgb(254 243 199)',
            text: 'rgb(180 83 9)',
            border: 'rgb(253 224 71)',
          },
          closed: {
            bg: 'rgb(243 244 246)',
            text: 'rgb(75 85 99)',
            border: 'rgb(209 213 219)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
