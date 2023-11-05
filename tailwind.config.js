/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'rainy': "url('/src/assets/rainy.jpg')",
        'radial1': "radial-gradient( farthest-side at bottom left, rgba(19, 14, 65, 0.76), transparent)",
        'radial2': "radial-gradient( farthest-corner at bottom right, rgba(8, 193, 206, 0.76), transparent 400px)",
      }
    },
  },
  plugins: [],
}

