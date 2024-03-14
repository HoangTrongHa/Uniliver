/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  jit: true,
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
      },
      colors: {
        "blue-80": "#015EFF",
        "blue-90": "#1F35C6",
        "blue-100": "#001F82",
        "cyan-50": "#76DDF5",
        "black-10": "#F6F6F6",
        "black-20": "#EAEAEA",
        "black-40": "#858380",
        "cyan-150": "#0CC5F0",
        "violet-40": "#B55CCB",
        "violet-50": "#A655BA",
        "yellow-90": "#FECD2E",
        "yellow-70": "#FFD859",
        "yellow-100": "#FEC000",
        "green-20": "#B0DFD2",
        "green-90": "#26C092",
        "green-100": "#20A980",
      },
      fontSize: {
        "3.25xl": "3.25rem",
        "4xl2": "2.75rem",
        "3xl1": "2rem",
        "5xl1": "3.25rem"
      },
      screens: {
        '3xl': { 'min': '1921px' },
        'xs': { 'max': '375px' },
        'xxl': { 'min': '1440px' },
      },
      fontFamily: {
        "montserrat-alternates": ["Montserrat Alternates"],
        "montserrat-alternates-medium": ["Montserrat Alternates Medium"],
        "montserrat-alternates-bold": ["Montserrat Alternates Bold"],
      },
      animation: {
        'slide-in': 'slideIn 0.3s forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: ' translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      }
    },
  },
};
