/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
    "@vue/typescript/recommended"
  ],
  overrides: [
    {
      files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"]
    },
    {
      files: ["src/components/__tests__/**.sepc.js"],
      globals: {
        test: "readonly",
        describe: "readonly",
        expect: "readonly",
        vi: "readonly",
        beforeEach: "readonly",
        it: "readonly"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    semicolon: 0,
    "vue/multi-word-component-names": "off"
  },
  env: {
    browser: true,
    es6: true,
    node: true
  }
}
