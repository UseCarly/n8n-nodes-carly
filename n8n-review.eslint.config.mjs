// The exact rules n8n's verification scan runs (@n8n/scan-community-package).
// The repo's own `npm run lint` uses eslint-plugin-n8n-nodes-base, which does
// NOT include these — 0.1.4 passed local lint and still failed review.
//
//   npx eslint -c n8n-review.eslint.config.mjs nodes credentials
import plugin from '@n8n/eslint-plugin-community-nodes';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
    },
    plugins: { '@n8n/community-nodes': plugin },
    rules: {
      '@n8n/community-nodes/icon-validation': 'error',
      '@n8n/community-nodes/cred-class-field-icon-missing': 'error',
      '@n8n/community-nodes/node-usable-as-tool': 'error',
      '@n8n/community-nodes/require-node-description-fields': 'error',
    },
  },
];
