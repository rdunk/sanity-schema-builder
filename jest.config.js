module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: './coverage/',
  testEnvironment: 'node',
  testRegex: '.*\\.test\\.tsx?$',
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
};
