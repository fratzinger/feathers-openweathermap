module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "quotes": ["warn", "double", "avoid-escape"],
    "indent": ["warn", 2, { "SwitchCase": 1 }],
    "semi": ["warn", "always"],
    "camelcase": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-console": "off",
    "require-atomic-updates": "off",
    "prefer-destructuring": ["warn", {
      "array": false,
      "object": true
    }, {
      "enforceForRenamedProperties": false
    }],
    "object-curly-spacing": ["warn", "always"],
    "prefer-const": ["warn"]
  },
  overrides: [
    {
      "files": ["test/**/*.ts"],
      "rules": {
        "@typescript-eslint/ban-ts-comment": ["off"]
      }
    }
  ]
};
  