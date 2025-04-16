module.exports = {
  extends: ['next/core-web-vitals'],
  plugins: ['eslint-plugin-eslint-no-moment'],
  rules: {
    'eslint-plugin-eslint-no-moment/no-moment': 'error'
  }
}; 