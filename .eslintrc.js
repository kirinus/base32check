module.exports = {
  extends: ['kirinus/typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/default': 'off',
    'import/export': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/no-duplicates': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': 'off',
  },
};
