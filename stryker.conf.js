// eslint-disable-next-line func-names
module.exports = function (config) {
  config.set({
    mutator: 'javascript',
    packageManager: 'npm',
    mutate: [
      'src/**/*.js',
    ],
    reporters: ['clear-text', 'progress', 'dashboard'],
    testRunner: 'jest',
    transpilers: [],
    coverageAnalysis: 'off',
  });
};