/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        accent: "rgba(var(--accent) / <alpha-value>)",
        accentdark: "rgba(var(--accent-dark) / <alpha-value>)",
        notexactlyblack: "rgba(var(--not-exactly-black) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
