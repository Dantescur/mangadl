export default {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  // extensionsToTreatAsEsm: ['.js', '.mjs'],
  transform: {},
  globals: {
    'ts-jest': {
      useESM: true,
    }
  }
}
