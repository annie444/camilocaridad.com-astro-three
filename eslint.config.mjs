import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintPluginAstro from "eslint-plugin-astro"

export default tseslint.config([
	// add more generic rule sets here, such as:
	// js.configs.recommended,
	eslint.configs.recommended,
	eslintPluginAstro.configs.recommended,
	eslintPluginAstro.configs["jsx-a11y-recommended"],
	{
		rules: {
			// override/add rules settings here, such as:
			// "astro/no-set-html-directive": "error"
		}
	}
])
