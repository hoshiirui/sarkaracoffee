import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

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
        current: "currentColor",
        transparent: "transparent",
        white: "#FFFFFF",
        black: {
          // ...colors.black,
          DEFAULT: "#1C2434",
          2: "#010101",
        },
        red: {
          ...colors.red,
          DEFAULT: "#FB5454",
        },
        body: "#64748B",
        bodydark: "#AEB7C0",
        bodydark1: "#DEE4EE",
        bodydark2: "#8A99AF",
        primary: "#3C50E0",
        secondary: "#80CAEE",
        stroke: "#E2E8F0",
        gray: {
          ...colors.gray,
          DEFAULT: "#EFF4FB",
          2: "#F7F9FC",
          3: "#FAFAFA",
        },
        graydark: "#333A48",
        whiten: "#F1F5F9",
        whiter: "#F5F7FD",
        boxdark: "#24303F",
        "boxdark-2": "#1A222C",
        strokedark: "#2E3A47",
        "form-strokedark": "#3d4d60",
        "form-input": "#1d2a39",
        meta: {
          1: "#DC3545",
          2: "#EFF2F7",
          3: "#10B981",
          4: "#313D4A",
          5: "#259AE6",
          6: "#FFBA00",
          7: "#FF6766",
          8: "#F0950C",
          9: "#E5E7EB",
          10: "#0FADCF",
        },
        success: "#219653",
        danger: "#D34053",
        warning: "#FFA70B",
      },
    },
  },
  plugins: [],
} satisfies Config;
