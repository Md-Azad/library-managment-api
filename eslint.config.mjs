import tseslint from "typescript-eslint";
export default tseslint.config(
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
  {
    ignores: ["**/node_modules/", "**/dist/", "**/.env"],
  }
);
