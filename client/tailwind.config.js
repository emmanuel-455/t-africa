/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Adding Inter as default sans font
        spaceGrotesk: ['Space Grotesk', 'sans-serif'], // Adding Space Grotesk
      },
      colors: {
        brandGreen: '#06C569', // Updated name for the primary green color
        // or
        // brandGreen: '#06C569', // Alternative name
      },
    },
  },
  plugins: [],
}
