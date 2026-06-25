import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto-thai)", "system-ui", "sans-serif"],
      },
    },
  },
  // Theme colour strings are built dynamically in src/lib/steps.ts, but every
  // class literal (e.g. "from-sky-500", "ring-sky-400") is present in source, so
  // Tailwind's content scanner picks them up. Safelist a few that are composed
  // at runtime to be safe.
  safelist: [{ pattern: /^(from|to|bg|text|ring)-/ }],
  plugins: [],
};

export default config;
