module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb',
  collectCoverage: true
  // collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  // coverageDirectory: 'coverage',
  // coverageProvider: 'v8',
}
