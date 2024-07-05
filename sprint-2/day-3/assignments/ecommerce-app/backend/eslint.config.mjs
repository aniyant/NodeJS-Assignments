import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
        ...globals.node // Add Node.js globals here
      }
    }
  },
  {
    rules: {
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-console': 'off'
    }
  }
];