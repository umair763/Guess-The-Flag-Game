module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  // Extends a few additional recommended rulesets:
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended', // Recommended accessibility rules
    'plugin:import/recommended',   // Recommended rules for import/export syntax
    'plugin:prettier/recommended', // Prettier integration to auto-disable conflicting rules
  ],
  // Ignore build artifacts and config files you don't want to lint:
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // Make sure React is picked up correctly, specify version or `detect`:
  settings: {
    react: {
      version: '18.2',
    },
  },
  // Add custom plugins here:
  plugins: ['react-refresh'],
  // Add or override specific rules:
  rules: {
    // Example: Off if you don’t need blank-target warnings:
    'react/jsx-no-target-blank': 'off',
    // For the new JSX transform, you can safely turn off these:
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',

    // Example: Turn off PropTypes if using TypeScript:
    // 'react/prop-types': 'off',

    // Example: Show warnings for console logs:
    // 'no-console': ['warn', { allow: ['warn', 'error'] }],

    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Example: Enable or tweak Prettier rules here
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     singleQuote: true,
    //     semi: false,
    //   },
    // ],
  },
};
