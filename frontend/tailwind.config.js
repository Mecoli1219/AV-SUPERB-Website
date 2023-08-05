/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      scale: {
        '125': '1.25',
      },
      spacing: {
        '30p': '30px',
        '70p': '70px'
      },
      height: {
        '128': '32rem',
        '80screen': '80vh',
      },
      boxShadow: {
        'nav': '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',
      },
      transitionProperty: {
        'top': 'top',
      },
      maxHeight: {
        "80screen": '80vh',
        "screen": '100vh',
      },
      margin: {
        "10vh": "10vh",
      },
      width: {
        "80screen": "80vw",
        "70screen": "70vw",
        "60screen": "60vw",
      }
    },
    minHeight: {
      "80screen": '80vh',
      "60screen": '60vh',
      "screen": '100vh',
    }
  },
  plugins: [],
}
