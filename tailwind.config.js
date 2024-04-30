/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/themes/*.{css}",
		"./node_modules/primereact/**/*.{js,ts,jsx,tsx}", // Add this line

  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

