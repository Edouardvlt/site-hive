
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'hive-red': '#FF0000',
                'hive-black': '#050505',
                'hive-dark': '#0a0a0a',
                'hive-gray': '#1A1A1A',
            },
            fontFamily: {
                'hive': ['"Chakra Petch"', 'sans-serif'],
                'mono': ['"JetBrains Mono"', 'monospace'],
            }
        },
    },
    plugins: [],
}
