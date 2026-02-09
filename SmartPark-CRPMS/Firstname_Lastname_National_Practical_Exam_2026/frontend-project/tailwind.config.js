/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#022c22', // Deep dark green
                secondary: '#065f46',
                accent: '#34d399',
            }
        },
    },
    plugins: [],
}
