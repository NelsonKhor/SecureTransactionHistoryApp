/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './app/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#00B4F0',
        secondaryBlue: '#0021fd',
        black: '#000000',
        grey: '#aaaaaa',
        white: '#ffffff',
      },
      fontFamily: {
        spacemono: ['SpaceMono-Regular', 'sans-serif'],
        robotoRegular: ['Roboto-Regular', 'san-serif'],
        robotoBold: ['Roboto-Bold', 'san-serif'],
        robotoLight: ['Roboto-Light', 'san-serif'],
      }
    },
  },
  plugins: [],
};
