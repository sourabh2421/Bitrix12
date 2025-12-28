/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bitrix-blue': '#4A90E2',
        'bitrix-blue-dark': '#357ABD',
      },
    },
  },
  plugins: [],
}

