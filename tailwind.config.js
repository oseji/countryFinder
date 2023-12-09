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
      fontFamily: {
        nunito: ["Nunito Sans", "sans - serif"],
      },
      colors: {
        bgLightMode: "hsl(0, 0%, 98%)",
        inputLightMode: "hsl(0, 0%, 52%)",
        bgDarkMode: "hsl(207, 26%, 17%)",
        darkModeElements: "hsl(209, 23%, 22%)",
      },
    },
  },
  plugins: [],
};
