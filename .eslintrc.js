module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:flowtype/recommended',
    'prettier',
  ],
  plugins: ['prettier', 'flowtype'],
  parser: '@babel/eslint-parser',
  rules: {
    'prettier/prettier': [
      'error',
      {'object-curly-spacing': ['error', 'always']},
    ],
    'spaced-comment': 'off',
    'no-console': 'warn',
    'consistent-return': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-process-exit': 'off',
    'no-param-reassign': 'off',
    quotes: ['error', 'single'],
    'no-return-await': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'prefer-destructuring': ['error', {object: true, array: false}],
    'no-unused-vars': ['error', {argsIgnorePattern: 'req|res|next|val'}],
    'react-native/no-inline-styles': 'error',
    'space-before-blocks': 'error',
    'jsx-quotes': ['error', 'prefer-double'],
  },
};
