import path from 'path';
import {
  addTitleToIntegrationDoc,
  addVersionToIntegrationDoc,
  formatIntegrationFileContents,
} from './format.js';
import {
  getIntegrationDocsConfig,
  getIntegrationDocumentation,
  getIntegrationProjectVersion,
  writeDocumentationToPath,
} from './util.js';

const KNOWLEDGE_BASE_PATH = '../../knowledgeBase';
const INTEGRATION_CONFIG_FILEPATH = path.join(
  path.resolve(),
  '../../integrations.config.yaml'
);

const createIntegrationDocumentation = async ({
  projectName,
  knowledgeCategoriesPaths,
  displayName,
}) => {
  const version = await getIntegrationProjectVersion(projectName);
  let body = await getIntegrationDocumentation(projectName);
  body = await formatIntegrationFileContents(body);
  body = addVersionToIntegrationDoc(body, version);
  body = addTitleToIntegrationDoc(body, displayName);

  const filePath = path.join(
    KNOWLEDGE_BASE_PATH,
    knowledgeCategoriesPaths,
    `${projectName}.md`
  );

  await writeDocumentationToPath({ body, filePath });
};

(async () => {
  const integrationDocsConfig = await getIntegrationDocsConfig(
    INTEGRATION_CONFIG_FILEPATH
  );

  const successes = [];
  const failures = [];
  for (const config of integrationDocsConfig) {
    try {
      await createIntegrationDocumentation(config);
      successes.push(config);
    } catch (error) {
      console.error(
        `Failed to create integration documentation for ${config.projectName}:`,
        error.message
      );
      failures.push(config);
    }
  }

  console.log(
    `Failed to create/update integration documentation for:`,
    failures.map(({ projectName }) => projectName)
  );
})();
