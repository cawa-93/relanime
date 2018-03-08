module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    "no-tabs": 0,
    indent: ["error", "tab", {
      "SwitchCase": 1,
      "MemberExpression": 1,
      "ArrayExpression": 1,
      "ObjectExpression": 1,
      "flatTernaryExpressions": true
    }]
  },
  globals: {}
}
