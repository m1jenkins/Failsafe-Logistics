/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                obsidian: '#08080c',
                'deep-space': '#0e0e14',
                soot: '#141419',
                graphite: '#1c1c24',
                smoke: '#26262f',
                ember: '#c4421a',
                molten: '#e85d2c',
                slate: {
                    850: '#1e1e28',
                    900: '#121218',
                    950: '#0a0a0f',
                },
                red: {
                    600: '#dc2626',
                    700: '#b91c1c',
                },
                vault: '#b8860b',
                'vault-light': '#d4a033',
                'vault-glow': '#f5c842',
            },
            fontFamily: {
                sans: ['DM Sans', 'Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        }
    },
    plugins: [],
}
