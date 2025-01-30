/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffcf3a",
        secondary: "#0063ff",
      },
      container: {
        center: true,
        padding: {
          default: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ffcf3a", // Using your existing primary color
          secondary: "#0063ff", // Using your existing secondary color
          "base-100": "#ffffff",
          "base-200": "#f8f9fa",
          "base-content": "#1f2937",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
