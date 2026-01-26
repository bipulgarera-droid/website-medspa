
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'nova-gray': '#F5F5F5',
        'nova-dark': '#1A1A1A',
        'nova-text': '#2D2D2D',
        'nova-teal': '#00BFA5',
      }
    },
  },
  plugins: [],
}
