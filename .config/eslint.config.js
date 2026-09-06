import js from "@eslint/js";
import globals from "globals";

export default [
  {
    // ignore vendored libraries
    ignores: ["libraries/**", "node_modules/**"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // cross-file globals and onclick-referenced functions are expected
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },
];
