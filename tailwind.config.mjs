/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        white: "rgba(var(--white) / <alpha-value>)",
        accent: "rgba(var(--accent) / <alpha-value>)",
        accentdark: "rgba(var(--accent-dark) / <alpha-value>)",
        notexactlyblack: "rgba(var(--not-exactly-black) / <alpha-value>)",
      },
      boxShadow: {
        image: "0px 5px 8px 0px rgb(var(--shadow-image))",
      },
    },
  },
  plugins: [],
};
