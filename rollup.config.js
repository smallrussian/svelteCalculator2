import css from 'rollup-plugin-css-only';

export default {
  // ... other options
  plugins: [
    // ... other plugins
    css({ output: 'public/build/bundle.css' }),
  ],
};