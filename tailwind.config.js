/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0A",
        cyan: {
          DEFAULT: "#00EEFF",
          intercept: "#00EEFF",
        },
        violet: {
          pulse: "#8A2BE2",
        },
        orange: {
          safety: "#FF8C00",
        },
        moss: {
          muted: "#8FBC8F",
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderWidth: {
        '1': '1px',
      },
      borderColor: {
        brutalist: '#333333',
      }
    },
  },
  plugins: [],
};
