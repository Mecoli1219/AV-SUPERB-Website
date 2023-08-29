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
        "90screen": "90vh"
      },
      margin: {
        "10vh": "10vh",
      },
      width: {
        "80screen": "80vw",
        "70screen": "70vw",
        "60screen": "60vw",
      },
      zIndex: {
        "60": "60",
        "nav": "1000",
        "nav-1": "1001",
        "nav-2": "1002",
        "nav-3": "1003",
        "nav-4": "1004",
      },
      divideWidth: {
        '1': '1px',
      },
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
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
