import axios from 'axios';
import { promises as fs } from 'fs';
import yaml from 'js-yaml';
import path from 'path';

/**
 * writeDocumentationToFile - writes the body of the documentation to the filePath
 * @param {body: string, filePath: string} params - body and filePath
 * @returns {Promise<void>}
 */
export async function writeDocumentationToPath({ body, filePath }) {
  await createDirIfNotExist(path.dirname(filePath));
  await fs.writeFile(filePath, body);
}

/**
 * Creates a directory if it doesn't exist
 * @param dirPath {string}  - path to directory
 * @returns {Promise<void>}
 */
const createDirIfNotExist = async (dirPath) => {
  const exists = await directoryExists(dirPath);

  if (!exists) {
    return await fs.mkdir(dirPath, { recursive: true });
  }
};

/**
 *
 * @param {string} filePath - path to file
 * @returns true if file exists, false otherwise
 */
const directoryExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

/**
 * getIntegrationDocsConfig reads the integration docs config file and returns an
 * array of IntegrationDocConfig objects.
 *
 * @param filePath the path to the integration yaml config file
 * @returns { Promise<[]IntegrationDocConfig> } an array of integration doc config objects
 */
export async function getIntegrationDocsConfig(filePath) {
  let fileContents;

  try {
    fileContents = await fs.readFile(filePath, {
      encoding: 'utf-8',
    });
  } catch (err) {
    throw new Error(`Could not read integrations config file at ${filePath}`);
  }

  const { integrations } = yaml.load(fileContents);
  if (!integrations) {
    throw new Error('No integrations found in config file');
  }

  return integrations;
}

/**
 * getIntegrationDocsConfig gets the integration project version from the
 * integrations project package.json file in GitHub.
 *
 * @param {string} projectName - the name of the project
 * @returns {Promise<string>} the version of the project
 */
export async function getIntegrationProjectVersion(projectName) {
  const url = `https://raw.githubusercontent.com/JupiterOne/${projectName}/main/package.json`;
  const response = await axios.get(url);
  if (response.data?.version) {
    return response.data.version;
  } else {
    throw new Error(`Could not find version for project ${projectName}`);
  }
}

/**
 * getIntegrationDocumentation  gets the documentation for an integration from
 * the jupiterone.md file in the integrations project repository.
 *
 * @param {string} projectName
 * @returns {Promise<string>} - the body of the integration project `jupiterone.md` file
 */
export async function getIntegrationDocumentation(projectName) {
  const url = `https://raw.githubusercontent.com/JupiterOne/${projectName}/main/docs/jupiterone.md`;
  const response = await axios.get(url);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(`Could not find documentation for project ${projectName}`);
  }
}
