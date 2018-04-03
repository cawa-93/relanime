module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017,
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:vue/strongly-recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  // add your custom rules here
  rules: {
    "no-tabs": 0,
    "camelcase":0,
    "comma-dangle":["error", "always-multiline"],
    indent: ["error", "tab", {
      "SwitchCase": 1,
      "MemberExpression": 1,
      "ArrayExpression": 1,
      "ObjectExpression": 1
    }]
  },
  globals: {}
}
