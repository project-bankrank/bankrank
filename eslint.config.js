// @ts-check

import eslint from "@eslint/js";
// @ts-expect-error Unsure why this is happening, but there is a todo below to look into it.
import tseslint from "typescript-eslint"; // Todo: Why is this linted?

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: ["node_modules/*", "build/*", "outputs/*", "copy.js"],
	},
);
