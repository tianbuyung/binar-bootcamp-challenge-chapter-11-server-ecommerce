module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2021: true,
		jest: true,
	},
	extends: "eslint:recommended",
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
	ignorePatterns: "**/*.test.js"
};
