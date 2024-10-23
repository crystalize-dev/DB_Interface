/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                light: {
                    bg: 'var(--bg-full)',
                    object: 'var(--bg-object)'
                },
            }
        }
    },
    plugins: ['prettier-plugin-tailwindcss']
};

export default config;
