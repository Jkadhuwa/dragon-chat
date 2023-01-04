module.exports = {
  env: {
    browser: true,
    es2021: true
  },

  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  overrides: [
    {
      files: ['*.ts']
    }
  ],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json'
  },
  plugins: ['@typescript-eslint'],
  rules: {}
};
