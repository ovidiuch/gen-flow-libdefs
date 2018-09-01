module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:flowtype/recommended'
  ],
  env: {
    node: true,
    es6: true
  },
  rules: {
    'no-console': 0
  }
};
