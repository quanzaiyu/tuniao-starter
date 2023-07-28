module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint', 'vue'],
  parserOptions: {
    parser: ['@typescript-eslint/parser', 'babel-eslint'],
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    '@nuxtjs',
    'plugin:vue-pug/vue3-recommended',
    '@vue/typescript/recommended',
    '.eslintrc-auto-import.json',
  ],
  rules: {
    'no-console': [1, {
      allow: ['info', 'warn', 'error'],
    }],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: [],
    }],
    'no-lonely-if': 'off',
    'import/named': 'off',
    'arrow-parens': ['error', 'as-needed'],
    curly: ['error', 'multi-line'],
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/component-tags-order': ['error', {
      order: ['script', 'template', 'style'],
    }],
    'vue/html-quotes': ['error', 'double', { avoidEscape: true }],
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-explicit-any': 1,
  },
  globals: {
    wx: 'readonly',
    WX: 'readonly',
    uni: 'readonly',
    WeixinJSBridge: 'readonly', // 微信小程序配置
    getCurrentPages: false,
  },
}
