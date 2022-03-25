#!/usr/bin/env node

const TYPES_PACKAGE_NAME = 'community-docs-types'

const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const { readMonorepoPackagesForCli } = require('@jupiterone/typescript-tools');

const rootDir = path.join(__dirname, '..');

/**
 * Verifies that the versions of @jupiterone/community-docs-types
 * used in all monorepo packages are in sync with each other to prevent
 * issues that could arise from out of date dependencies.
 */
async function run() {
  const allPackages = await readMonorepoPackagesForCli({
    rootDir,
    log: console.log,
  });

  const nonTypesPackages = allPackages.filter(
    (package) => package.dirName !== TYPES_PACKAGE_NAME
  );

  const typesPackageVersion = JSON.parse(
    await fs.readFile(
      `${rootDir}/packages/${TYPES_PACKAGE_NAME}/package.json`,
      {
        encoding: 'utf8',
      }
    )
  ).version;

  console.log(
    `${typesPackageVersion}: @jupiterone/${TYPES_PACKAGE_NAME} package version `
  );

  for (nonTypesPackage of nonTypesPackages) {
    const nonTypesPackageManifest = JSON.parse(
      await fs.readFile(nonTypesPackage.packageFile, { encoding: 'utf8' })
    );

    const nonTypesPackageVersion = nonTypesPackageManifest.dependencies[
      `@jupiterone/${TYPES_PACKAGE_NAME}`
    ].replace('~', '');

    console.log(
      `${nonTypesPackageVersion}: ${nonTypesPackage.dirName} package version`
    );

    if (typesPackageVersion !== nonTypesPackageVersion) {
      throw new Error(
        `${nonTypesPackage.dirName} with types at version ${nonTypesPackageVersion} does not have the most up to date ${TYPES_PACKAGE_NAME} version of ${typesPackageVersion}`
      );
    }
  }
}

run()
  .then(() => {
    console.log('');
    console.log(
      `All monorepo packages have the most up to date version of @jupiterone/${TYPES_PACKAGE_NAME}`
    );
    console.log('----------------------------------------------------');
    console.log('');
  })
  .catch((err) => {
    process.exitCode = 1;
    console.log('');
    console.log('----------------------------------------------------');
    console.error('Error while verifying types versions. Error: ' + err.stack);
    console.log('----------------------------------------------------');
    console.log('');
  });
