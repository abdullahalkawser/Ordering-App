/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",  
    "./src/**/*.{js,jsx,ts,tsx}",                    // Main App component
    "./components/**/*.{js,jsx,ts,tsx}", // Include all files in components folder
  ],
  presets: [require("nativewind/preset")], // Add the NativeWind preset
  theme: {
    extend: {}, // Add any custom theme extensions here
  },
  plugins: [], // Add any additional plugins here
};
 