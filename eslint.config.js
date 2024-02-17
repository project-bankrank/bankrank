// @ts-check

import eslint from "@eslint/js";
// @ts-expect-error Unsure why this is happening, but there is a todo below to look into it.
import tseslint from "typescript-eslint"; // Todo: Why is this linted?

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: [
			"node_modules/*",
			"build/*",
			"outputs/*",
			"copy.js",
			"playwright.config.ts",
		],
	},
	{
		rules: {
			"@typescript-eslint/array-type": [
				"error",
				{
					default: "generic",
				},
			],
			"@typescript-eslint/brace-style": ["error", "1tbs"],
			"@typescript-eslint/comma-spacing": ["error"],
			"@typescript-eslint/default-param-last": ["error"],
			"@typescript-eslint/func-call-spacing": ["error"],
			"@typescript-eslint/no-confusing-non-null-assertion": ["error"],
			"@typescript-eslint/no-duplicate-enum-values": ["error"],
			"@typescript-eslint/no-empty-interface": ["error"],
			"@typescript-eslint/no-extra-non-null-assertion": ["error"],
			"@typescript-eslint/no-magic-numbers": ["error"],
			"@typescript-eslint/no-require-imports": ["error"],
			"@typescript-eslint/prefer-for-of": ["error"],
			"@typescript-eslint/prefer-literal-enum-member": ["error"],
		},
	},
);
