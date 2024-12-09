/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('https://as1.ftcdn.net/v2/jpg/00/88/01/56/1000_F_88015643_oM3IvwKJq6SSXTIhG6BAUoifUCqAA1Lo.jpg')",
      },
    },
  },
  plugins: [],
}

