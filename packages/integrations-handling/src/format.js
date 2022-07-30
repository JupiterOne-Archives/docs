import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkLintListItemIndent from 'remark-lint-list-item-indent';
import remarkPresetLintConsistent from 'remark-preset-lint-consistent';
import remarkPresetLintRecommended from 'remark-preset-lint-recommended';
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';

/**
 * Converts the integration file into a format that Vanilla is capable of
 * parsing
 *
 * @param {String} contents
 * @returns {String}
 */
async function formatIntegrationFileContents(contents) {
  const formatted = await remark()
    .use(remarkSqueezeParagraphs)
    .use(remarkPresetLintRecommended)
    .use(remarkPresetLintConsistent)
    .use(remarkLintListItemIndent)
    .use(remarkGfm)
    .process(contents);
  return formatted.toString();
}

export { formatIntegrationFileContents };
