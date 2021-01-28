module.exports = {
  transform: { '^.+\\.(ts|tsx|js|jsx)?$': 'ts-jest' },
  setupFilesAfterEnv: ['./src/js/jest-setup.ts'],
  testEnvironment: 'node',
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
