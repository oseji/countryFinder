/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        card: "250px",
      },
      minHeight: {
        flag: "160px",
      },
      maxHeight: {
        card: "340px",
      },
    },
  },
  plugins: [],
};
