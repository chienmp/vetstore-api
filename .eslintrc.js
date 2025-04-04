module.exports = {
    // ...
    plugins: ['prettier'],
    extends: [
      'plugin:@nestjs/recommended',
      'plugin:prettier/recommended', // 👈 dòng này rất quan trọng
    ],
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  };
  