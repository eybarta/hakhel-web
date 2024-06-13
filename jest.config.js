/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
	transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { configFile: './babel.config.cjs' }],
	},
	"setupFilesAfterEnv": ["<rootDir>/src/tests/jest.setup.ts"],
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
		 '^.+\\.(sass|css)$': '<rootDir>/__mocks__/styles.js',
  },
	"transformIgnorePatterns": [
		"/node_modules/",
		// "^.+\\.module\\.(css|sass|scss)$"
	],
	"testEnvironment": "jsdom",
	"moduleFileExtensions": ["ts", "tsx", "js", "cjs", "jsx", "json", "node"]

};