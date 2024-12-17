module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|@react-navigation)/)',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  };
  