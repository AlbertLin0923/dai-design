module.exports = {
  extends: [require.resolve('@mango-scripts/esp-config/stylelint')],
  rules: {
    'function-no-unknown': null,
    'scss/no-global-function-names': null,
    'no-descending-specificity': null
  }
}
