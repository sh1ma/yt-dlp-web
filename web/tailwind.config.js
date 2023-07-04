/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: ['system-ui'],
      colors: {
        black: colors.gray[800],
      },
    },
  },
  plugins: [],
}
