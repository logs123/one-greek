/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'pacific-blue': 'rgba(65, 180, 210, 1)',
        'light-pacific-blue': 'rgba(144, 220, 232, 1)',
        'deep-pacific-blue': 'rgba(33, 138, 168, 1)',
        'deep-sky-blue': 'rgba(135, 206, 235, 1)',
        'sky-blue': 'rgba(135, 206, 250, 1)',
        'light-sky-blue': 'rgba(173, 216, 230, 1)',
        'powder-blue': 'rgba(176, 224, 230, 1)',
        'steel-blue': 'rgba(70, 130, 180, 1)',
        'teal-blue': 'rgba(54, 154, 171, 1)',
        'turquoise-blue': 'rgba(94, 211, 229, 1)',
        'event-card-back': 'rgba(196, 226, 235, 1)',
        'event-card-left': 'rgba(222, 239, 243, 1)',
        'event-card-button': 'rgba(65, 209, 142, 1)',
        'event-card-button-hover': 'rgba(110, 209, 168, 1)',
      },
      colors: {
        'pacific-blue': 'rgba(65, 180, 210, 1)',
        'light-pacific-blue': 'rgba(144, 220, 232, 1)',
        'deep-pacific-blue': 'rgba(33, 138, 168, 1)',
        'deep-sky-blue': 'rgba(135, 206, 235, 1)',
        'sky-blue': 'rgba(135, 206, 250, 1)',
        'light-sky-blue': 'rgba(173, 216, 230, 1)',
        'powder-blue': 'rgba(176, 224, 230, 1)',
        'steel-blue': 'rgba(70, 130, 180, 1)',
        'teal-blue': 'rgba(54, 154, 171, 1)',
        'turquoise-blue': 'rgba(94, 211, 229, 1)',
        'event-card-back': 'rgba(196, 226, 235, 1)',
        'event-card-left': 'rgba(222, 239, 243, 1)',
        'event-card-button': 'rgba(65, 209, 142, 1)',
        'event-card-button-hover': 'rgba(110, 209, 168, 1)',
      },
    },
  },
  plugins: [],
}