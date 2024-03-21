module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "@nuxt/eslint-config",
    'eslint:recommended',
    "plugin:nuxt/recommended",
    "plugin:vue/vue3-recommended",
    'plugin:@typescript-eslint/recommended',
  ],
  // plugins: ['prettier'],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-case-declarations': 'off',
    // 'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
