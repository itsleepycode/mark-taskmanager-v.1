import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        colorBg1: "rgba(249,249,249, 0.08)",
        colorBg2: "#212121",
        colorBg3: "#181818",

        colorGrey3: "#6c7983",

        borderColor1: "rgba(249,249,249, 0.03)",
        borderColor2: "rgba(249,249,249, 0.08)",

        colorIcons: "rgba(249,249,249, 0.35)",
        colorIcons2: "rgba(249,249,249, 0.75)",
      },
    },
  },
  plugins: [],
};
export default config;
