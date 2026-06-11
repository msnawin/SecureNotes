/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        headerColor: "#09090b",
        textColor: "#e4e4e7",
        btnColor: "#10b981",
        noteColor: "#10b981",
        customRed: "#dc2626",
        vault: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        surface: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
      },
      fontWeight: {
        customWeight: 500,
      },
      height: {
        headerHeight: "74px",
      },
      maxHeight: {
        navbarHeight: "420px",
      },
      minHeight: {
        customHeight: "530px",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
        dancingScript: ["Dancing Script"],
        inter: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      fontSize: {
        logoText: "30px",
        customText: "15px",
        tablehHeaderText: "16px",
        headerText: ["50px", "60px"],
        tableHeader: ["15px", "25px"],
      },
      backgroundColor: {
        customRed: "#dc2626",
        testimonialCard: "#18181b",
      },
      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.3)",
        glow: "0 0 15px rgba(16, 185, 129, 0.2)",
        "glow-md": "0 0 25px rgba(16, 185, 129, 0.3)",
        "glow-lg": "0 0 40px rgba(16, 185, 129, 0.15)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.4)",
      },
      backgroundImage: {
        "vault-gradient": "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
        "dark-gradient": "linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)",
        "hero-radial": "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 60%)",
      },
      borderColor: {
        "vault-glow": "rgba(16, 185, 129, 0.2)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(16, 185, 129, 0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(16, 185, 129, 0.25)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
