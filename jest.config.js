module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  transform: {
    '^.+\\.ts$': './node_modules/ts-jest/preprocessor.js'
  },
  testMatch: [
    '**/*.spec.(ts|js)'
  ],
  testEnvironment: 'node',
  verbose: true,
};