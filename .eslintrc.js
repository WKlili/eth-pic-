module.exports = {
  extends: ['@white-matrix/eslint-config'],
  parserOptions: {
    project: require.resolve('./tsconfig.json')
  },
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/ban-types': 0,
    'no-empty-pattern': 0
  }
};
