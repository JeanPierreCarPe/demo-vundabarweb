import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#121212', // page background
        snow: '#fbfbfb', // text / outlines (use /90, /80, /70 for the design's alpha variants)
        accent: '#f29f58', // orange: script labels, outlines, CTAs
        purple: { 500: '#9c4be0', 700: '#55297a' },
        danger: '#ff7a7a', // form errors
      },
      fontFamily: {
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        // "Story Of Love" is a commercial font not shipped in /images. Falls back to the self-hosted
        // Mrs Saint Delafield (see the `scale` prop of SectionLabel).
        script: ['"Story Of Love"', '"Mrs Saint Delafield"', 'cursive'],
      },
      fontSize: {
        hero: ['128px', { lineHeight: 'normal' }],
        statement: ['96px', { lineHeight: '90px' }],
        heading: ['48px', { lineHeight: '40px' }],
        quote: ['36px', { lineHeight: 'normal' }],
        script: ['64px', { lineHeight: 'normal' }],
        giant: ['325px', { lineHeight: 'normal' }],
      },
      boxShadow: {
        image: '0 0 75px 0 rgba(0, 0, 0, 0.75)',
        // Hover states: the usual image shadow plus an orange glow
        'image-hover': '0 0 75px 0 rgba(0, 0, 0, 0.75), 0 0 50px 0 rgba(242, 159, 88, 0.5)',
        'glow-accent': '0 0 30px 2px rgba(242, 159, 88, 0.65)',
        'glow-snow': '0 0 30px 2px rgba(251, 251, 251, 0.45)',
      },
      textShadow: {
        title: '0 0 20px rgba(0, 0, 0, 0.35)',
        service: '0 0 25px rgba(0, 0, 0, 0.75)',
        blurb: '0 0 10px rgba(0, 0, 0, 0.9)',
      },
      maxWidth: { page: '1440px' },
    },
  },
  plugins: [
    plugin(({ matchUtilities, addUtilities, theme }) => {
      matchUtilities(
        { 'text-shadow': (value) => ({ textShadow: value }) },
        { values: theme('textShadow') },
      );
      // Equivalent of Figma's "vertical trim: cap height to baseline" on text boxes.
      addUtilities({ '.text-trim': { 'text-box': 'trim-both cap alphabetic' } });
    }),
  ],
} satisfies Config;
