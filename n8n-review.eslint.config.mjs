// Mirrors what n8n's verification scan (@n8n/scan-community-package) runs, so
// review failures are catchable before publishing.
//
//   npx eslint -c n8n-review.eslint.config.mjs nodes credentials
//
// The repo's own `npm run lint` is NOT a substitute: it omits the
// @n8n/community-nodes plugin entirely, and it downgrades icon-not-svg, which
// the scan treats as an error. Use the plugin's full `recommended` preset
// rather than a hand-picked rule list — the scan enables everything, and
// cherry-picking is how 0.1.5 shipped with three violations still in it.
import communityNodes from '@n8n/eslint-plugin-community-nodes';
import n8nNodesBase from 'eslint-plugin-n8n-nodes-base';
import tsparser from '@typescript-eslint/parser';

const base = communityNodes.configs.recommended;
const baseRules = (Array.isArray(base) ? base : [base]).reduce(
  (acc, block) => Object.assign(acc, block?.rules ?? {}),
  {},
);

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
    },
    plugins: {
      '@n8n/community-nodes': communityNodes,
      'n8n-nodes-base': n8nNodesBase,
    },
    rules: {
      ...baseRules,
      // The scan reports this one as an error even though the repo lint
      // treats it as advisory.
      'n8n-nodes-base/node-class-description-icon-not-svg': 'error',
    },
  },
];
