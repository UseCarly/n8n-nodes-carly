module.exports = {
  root: true,
  env: { browser: true, es6: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module', extraFileExtensions: ['.json'] },
  ignorePatterns: ['.eslintrc.js', '**/*.js', '**/*.mjs', 'node_modules/**', 'dist/**'],
  overrides: [
    {
      files: ['package.json'],
      plugins: ['eslint-plugin-n8n-nodes-base'],
      extends: ['plugin:n8n-nodes-base/community'],
      rules: {
        'n8n-nodes-base/community-package-json-name-still-default': 'off',
      },
    },
    {
      files: ['./credentials/**/*.ts'],
      plugins: ['eslint-plugin-n8n-nodes-base'],
      extends: ['plugin:n8n-nodes-base/credentials'],
      rules: {
        // Main-repo-only rule: expects documentationUrl to be a camelCase slug
        // pointing at n8n's own hosted docs. Community nodes correctly use a
        // full external URL (still enforced by the not-http-url/missing rules).
        'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
      },
    },
    {
      files: ['./nodes/**/*.ts'],
      plugins: ['eslint-plugin-n8n-nodes-base'],
      extends: ['plugin:n8n-nodes-base/nodes'],
      rules: {
        // Advisory ("Try to use an SVG icon") and needs a vector version of
        // the Carly logo, which is a design asset rather than a code change.
        // Not part of n8n's verification scan, which only runs the
        // @n8n/community-nodes rules. Warn so it stays visible.
        'n8n-nodes-base/node-class-description-icon-not-svg': 'warn',
      },
    },
  ],
};
