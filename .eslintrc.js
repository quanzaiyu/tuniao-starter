module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    '@nuxtjs',
    'plugin:vue-pug/vue3-recommended',
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
  },
  globals: {
    wx: 'readonly',
    WX: 'readonly',
    uni: 'readonly',
    WeixinJSBridge: 'readonly', // 微信小程序配置
    getCurrentPages: false,
  },
}
