import preset from '@lynx-js/tailwind-preset';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{vue,js,ts}'],
  presets: [preset],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--color-bg)',
          card: 'var(--color-bg-card)',
          'card-done': 'var(--color-bg-card-done)',
          input: 'var(--color-bg-input)',
          elevated: 'var(--color-bg-elevated)',
        },
        coral: {
          DEFAULT: 'var(--color-coral)',
          soft: 'var(--color-coral-soft)',
        },
        amber: {
          DEFAULT: 'var(--color-amber)',
        },
        teal: {
          DEFAULT: 'var(--color-teal)',
          soft: 'var(--color-teal-soft)',
        },
        txt: {
          DEFAULT: 'var(--color-txt)',
          secondary: 'var(--color-txt-secondary)',
          muted: 'var(--color-txt-muted)',
          done: 'var(--color-txt-done)',
        },
        stroke: {
          DEFAULT: 'var(--color-stroke)',
          light: 'var(--color-stroke-light)',
        },
        danger: 'var(--color-danger)',
      },
    },
  },
};

export default config;
