/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1360px",
        xl: "1000px",
        lg: "900px",
        md: "800px",
      },
    },
    screens: {
      xs: "480px",
      // => @media (min-width: 480px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "paper-light": "#f7f7f9",
        "paper-dark": "#0e131f",
        "default-light": "#FFFFFF",
        "default-dark": "#111827",
        "primary-main": "#991b1b",
        "primary-light": "#ef4444",
        "secondary-main": "#0d9488",
        "secondary-dark": "#134e4a",
        "accent-dark": "rgb(30 41 59)",
        "accent-light": " rgb(241 245 249)",
      },
      textColor: {
        "light-main": "rgb(15 23 42)",
        "light-light": "rgb(115 115 115)",
        "dark-main": "rgb(229 229 229)",
        "dark-light": "rgb(100 116 139)",
        "light-accent": "#000000",
        "dark-accent": "#FFFFFF",
        primary: "#c13737",
      },
      fontSize: {
        xs: "10px",
        sm: "14px",
        md: "16px",
        lg: "20px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('flowbite/plugin')
  ],
};
