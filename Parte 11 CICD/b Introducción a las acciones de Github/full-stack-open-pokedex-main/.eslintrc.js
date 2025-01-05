module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
    'jest/globals': true
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react', 'jest'
  ],
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 'error',
    'react/prop-types': 0
  }
};
