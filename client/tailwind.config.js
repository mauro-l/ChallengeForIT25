/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Comfortaa", "sans-serif"],
      serif: ["ui-sans-serif", "system-ui"],
    },
    extend: {
      keyframes: {
        "scale-in-ver-top": {
          "0%": {
            transform: "scaleY(0)",
            transformOrigin: "100% 0%",
            opacity: "1",
          },
          "100%": {
            transform: "scaleY(1)",
            transformOrigin: "100% 0%",
            opacity: "1",
          },
        },
        "scale-out-ver-top": {
          "0%": {
            transform: "scaleY(1)",
            transformOrigin: "100% 0%",
            opacity: "1",
          },
          "100%": {
            transform: "scaleY(0)",
            transformOrigin: "100% 0%",
            opacity: "0",
          },
        },
      },
      animation: {
        "scale-in-ver-top":
          "scale-in-ver-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "scale-out-ver-top":
          "scale-out-ver-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
      },
    },
  },
  plugins: [daisyui],
};

