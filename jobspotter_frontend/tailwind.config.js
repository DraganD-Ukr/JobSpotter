module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
      extend: {
        // Custom breakpoints
        screens: {
          xs: "480px", 
          sm: "640px",
          md: "768px", 
          lg: "1024px",
          xl: "1280px", 
          "2xl": "1536px", 
          "3xl": "1920px", 
        },
        // Custom container query sizes
        container: {
          screens: {
            xs: "20rem",
            sm: "24rem",
            md: "28rem",
            lg: "32rem",
            xl: "36rem",
            "2xl": "42rem",
            "3xl": "48rem",
            "4xl": "56rem",
            "5xl": "64rem",
            "6xl": "72rem",
            "7xl": "80rem",
            "8xl": "96rem",
          },
        },
        // Custom colors for light and dark modes
        colors: {
          custom: {

            heroOverlay: "rgba(0, 0, 0, 0.3)",

            background: {
              light: "#f7fafc", 
              dark: "#1a202c", 
            },
            // Job card colors
            jobCard: {
              light: "#ffffff",
              dark: "#2d3748", 
            },
            // Feature section background
            featureBg: {
              light: "#edf2f7",
              dark: "#2d3748",
            },
            // Text colors
            text: {
              primary: {
                light: "#1a202c", 
                dark: "#e2e8f0", 
              },
              secondary: {
                light: "#4a5568",
                dark: "#a0aec0", 
              },
            },
          },
        },
        // Custom animations
        animation: {
          gradientFlow: "gradientFlow 15s ease infinite",
          magnifier: "magnifierMove 2s ease-in-out infinite",
        },
        keyframes: {
          gradientFlow: {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
          magnifierMove: {
            "0%": { transform: "translateX(-20px)" },
            "50%": { transform: "translateX(20px)" },
            "100%": { transform: "translateX(-20px)" },
          },
        },
        // Custom box-shadows
        boxShadow: {
          jobCardHover: "0 10px 15px rgba(0, 0, 0, 0.1), 0 0 0 2px #10b981",
          featureCardHover: "0 10px 15px rgba(0, 0, 0, 0.1), 0 0 0 2px #10b981",
        },
      },
    },
    plugins: [
      require("@tailwindcss/container-queries"),
    ],
};