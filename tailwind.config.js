const toRem = (px) => `${px / 16}rem`

const spacerGen = (arr) => {
  return arr.reduce((acc, curr) => ({ ...acc, [curr]: toRem(curr) }), {})
}

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
    './cms/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
