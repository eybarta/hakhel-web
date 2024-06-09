module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
		
		'^@state/(.*)$': '<rootDir>/src/state/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@constants/(.*)$': '<rootDir>/src/constants/$1',
		'^@type/(.*)$': '<rootDir>/src/types/$1',
		'^@providers/(.*)$': '<rootDir>/src/providers/$1',
		'^@context/(.*)$': '<rootDir>/src/components/context/$1',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@services/(.*)$': '<rootDir>/src/services/$1',
		'^@api/(.*)$': '<rootDir>/src/services/api/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Updated to TypeScript file
};