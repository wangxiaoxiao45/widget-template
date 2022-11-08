/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript/recommended', '@vue/eslint-config-prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': 'off',
    'vue/no-reserved-component-names': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/valid-template-root': 'off',
    'prefer-const': 'off',
  },
}
