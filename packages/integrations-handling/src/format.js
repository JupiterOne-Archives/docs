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
export async function formatIntegrationFileContents(contents) {
  const formatted = await remark()
    .use(remarkSqueezeParagraphs)
    .use(remarkPresetLintRecommended)
    .use(remarkPresetLintConsistent)
    .use(remarkLintListItemIndent)
    .use(remarkGfm)
    .process(contents);
  return formatted.toString();
}

/**
 *
 * @param {string} body - the body of the integration documentation
 * @param {string} name - the name of the title
 * @returns
 */
export const addTitleToIntegrationDoc = (body, name) => {
  const target = '# Integration with JupiterOne';
  const matchTitleRegex = new RegExp(target, 'gi');

  return body.replace(matchTitleRegex, `# ${name} Integration with JupiterOne`);
};

export const addVersionToIntegrationDoc = (body, version) => {
  return `${body} \n<!--  jupiterOneDocVersion=${version} -->`;
};
