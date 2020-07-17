module.exports = {
  env: {
    "jest": true
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "import/extensions": 0,
    "max-len": [2, 130, 4, { "ignoreUrls": true }],
    "class-methods-use-this": 0,
    "@typescript-eslint/no-throw-literal": 0
  }
};