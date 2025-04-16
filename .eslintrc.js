module.exports = {
  extends: ['next/core-web-vitals'],
  plugins: ['import'],
  rules: {
    'no-restricted-imports': ['error', {
      'paths': [{
        'name': 'moment',
        'message': 'Please use date-fns instead of moment.js'
      }]
    }]
  }
}; 