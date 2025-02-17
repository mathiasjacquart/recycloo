export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
    theme: {
      extend: {
        colors: {
          primary: "#1E40AF",
          secondary: "#9333EA",
          accent: "#FBBF24",
          background: "#F3F4F6",
          text: "#1F2937",
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          serif: ["Merriweather", "serif"],
        },
        spacing: {
          "128": "32rem",
          "144": "36rem",
        },
      },
    },
    plugins: [],
  };
  