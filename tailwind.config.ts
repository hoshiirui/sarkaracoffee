import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "sarkara-sign": "#460000",
        "sarkara-sign-1": "#902D24",
        "sarkara-sign-2": "#C7644F",
        "sarkara-sign-3": "#ECA68D",
        "sarkara-sign-4": "#F5D5C4",

        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
