module.exports = {
  transform: { '^.+\\.(ts|tsx|js|jsx)?$': 'ts-jest' },
  setupFilesAfterEnv: ['./src/js/jest-setup.ts'],
  testEnvironment: 'node',
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/js/fileMock.ts',
    '\\.(css|less)$': '<rootDir>/src/js/cssMock.ts',
  },
};
