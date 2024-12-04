module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:prettier/recommended',
    'plugin:@tailwindcss/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-native', '@typescript-eslint', '@tailwindcss'],
  env: {
    'react-native/react-native': true,
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',

    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-raw-text': 'off',

    'no-unused-vars': 'warn',
    'no-console': 'warn',
    semi: ['error', 'always'],

    'prettier/prettier': 'error',

    'unknownAtRule': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
};
