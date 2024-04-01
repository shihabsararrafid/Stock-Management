const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': defaultTheme.screens.sm,
        'mantine-breakpoint-sm': defaultTheme.screens.md,
        'mantine-breakpoint-md': defaultTheme.screens.lg,
        'mantine-breakpoint-lg': defaultTheme.screens.xl,
        'mantine-breakpoint-xl': defaultTheme.screens['2xl'],
      },
    },
  },
}
