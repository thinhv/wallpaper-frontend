module.exports = {
  parser: '@typescript-eslint/parser',

  // NOTE: using `plugin:` prefix makes it so that the corresponding
  // eslint plugin is automatically enabled and the rules are turned on
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',

    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
    // Make sure this is always the last plugin configuration in the extends array.
    'plugin:prettier/recommended',

    // Uses eslint-config-prettier to disable ESLint rules from various plugins
    // that would conflict with prettier
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/standard',
  ],

  plugins: ['react-hooks'],

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  env: {
    browser: true,
    jest: true,
  },

  rules: {
    // Turn of unhelpful TS specific rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    'react/jsx-key': 'error',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'react/prop-types': 'off',
    'react/self-closing-comp': 'error',

    // Enforce absolute imports to be first
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent', 'sibling', 'index'],
        ],
      },
    ],
    // Don't allow `require` or `module.exports` since we want to use modern ES
    'import/no-commonjs': 'error',

    'no-var': 'error',
    'lines-between-class-members': 'off',
    'prefer-destructuring': [
      'error',
      { array: false, object: true },
      { enforceForRenamedProperties: false },
    ],
    'object-shorthand': ['error', 'always'],
    'array-callback-return': 'error',
  },

  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use
      version: 'detect',
    },
  },
};
