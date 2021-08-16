module.exports = {
  root: true,
  plugins: ['react'],
  env: {
    es2020: true,
  },
  extends: ['eslint:recommended', 'plugin:react-hooks/recommended'],
  rules: {
    'no-console': 'off',
    'no-undef': 'off',
    'react/jsx-uses-vars': 1,
  },
  parser: '@typescript-eslint/parser',
}
