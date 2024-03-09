/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "box-shadow: 0 0 50px -12px rgb(0 0 0 / 0.25)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  important: true,
};
