#!/usr/bin/env node

/**
 * This script versions the @jupiterone/community-docs-types
 * package, and then updates all dependent monorepo packages to
 * that version.
 */

const TYPES_PACKAGE_NAME = 'community-docs-types';

const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const pMap = require('p-map');
const { readMonorepoPackagesForCli } = require('@jupiterone/typescript-tools');

const rootDir = path.join(__dirname, '..');
const VALID_VERSION_ACTIONS = ['major', 'minor', 'patch'];

async function versionTypesPackage(typesPackage, versionAction) {
  const currentVersion = typesPackage.packageManifest.version;
  let newVersion;
  switch (versionAction) {
    case 'major':
      const majorVersionSplit = currentVersion.split('.');
      let majorInt = parseInt(majorVersionSplit[0]);
      majorInt++;
      majorVersionSplit[0] = majorInt.toString();
      majorVersionSplit[1] = '0';
      majorVersionSplit[2] = '0';

      newVersion = majorVersionSplit.join('.');
      break;
    case 'minor':
      const minorVersionSplit = currentVersion.split('.');
      let minorInt = parseInt(minorVersionSplit[1]);
      minorInt++;
      minorVersionSplit[1] = minorInt.toString();
      minorVersionSplit[2] = '0';

      newVersion = minorVersionSplit.join('.');

      break;
    case 'patch':
      const patchVersionSplit = currentVersion.split('.');
      let patchInt = parseInt(patchVersionSplit[2]);
      patchInt++;
      patchVersionSplit[2] = patchInt.toString();

      newVersion = patchVersionSplit.join('.');
      break;
  }

  typesPackage.packageManifest.version = newVersion;

  const packageFilePath = path.join(typesPackage.dir, 'package.json');
  await fs.writeFile(
    packageFilePath,
    JSON.stringify(typesPackage.packageManifest, null, 2),
    {
      encoding: 'utf8',
    }
  );

  return newVersion;
}

/**
 * Verifies that the versions of @jupiterone/community-docs-types
 * used in all monorepo packages are in sync with each other to prevent
 * issues that could arise from out of date dependencies.
 *
 * @param - versionAction - typeof VALID_VERSION_ACTIONS
 */
async function run(versionAction) {
  const allPackages = await readMonorepoPackagesForCli({
    rootDir,
    log: console.log,
  });

  const nonTypesPackages = allPackages.filter(
    (package) => package.dirName !== TYPES_PACKAGE_NAME
  );

  console.dir(nonTypesPackages);

  const typesPackage = allPackages.find(
    (package) => package.dirName === TYPES_PACKAGE_NAME
  );

  const oldTypesPackageVersion = typesPackage.packageManifest.version;
  console.log(
    `${oldTypesPackageVersion}: Old version of @jupiterone/${TYPES_PACKAGE_NAME} `
  );

  const newTypesPackageVersion = await versionTypesPackage(
    typesPackage,
    versionAction
  );

  console.log(
    `${newTypesPackageVersion}: New version of @jupiterone/${TYPES_PACKAGE_NAME} `
  );

  console.log('');
  console.log(
    `Updating all dependent packages to the new @jupiterone/${TYPES_PACKAGE_NAME} version`
  );

  const handleNonTypesPackage = async (nonTypesPackage) => {
    console.log('');
    console.log(nonTypesPackage.dirName);
    console.log('----------------------------------------------------');

    const currentTypesVersionInPackage =
      nonTypesPackage.packageManifest.dependencies[
        `@jupiterone/${TYPES_PACKAGE_NAME}`
      ];

    console.log(
      `${currentTypesVersionInPackage}: Current @jupiterone/${TYPES_PACKAGE_NAME} version in ${nonTypesPackage.dirName}`
    );

    if (!currentTypesVersionInPackage) {
      console.log(
        `${nonTypesPackage.dirName} does not have a dependency on @jupiterone/${TYPES_PACKAGE_NAME}.  Skipping update.`
      );
      return;
    }

    nonTypesPackage.packageManifest.dependencies[
      `@jupiterone/${TYPES_PACKAGE_NAME}`
    ] = currentTypesVersionInPackage.replace(
      oldTypesPackageVersion,
      newTypesPackageVersion
    );

    console.log(
      `${
        nonTypesPackage.packageManifest.dependencies[
          `@jupiterone/${TYPES_PACKAGE_NAME}`
        ]
      }: New @jupiterone/${TYPES_PACKAGE_NAME} version in ${
        nonTypesPackage.dirName
      }`
    );

    console.log('');
    const packageFilePath = path.join(nonTypesPackage.dir, 'package.json');
    await fs.writeFile(
      packageFilePath,
      JSON.stringify(nonTypesPackage.packageManifest, null, 2),
      {
        encoding: 'utf8',
      }
    );

    console.log(`Successfully wrote ${nonTypesPackage.dirName} package.json`);
  };

  await pMap(nonTypesPackages, handleNonTypesPackage, { concurrency: 1 });
}

const args = process.argv;

/**
 * args[0] = node path
 * args[1] = script path
 */
const versionAction = args[2];

if (
  !versionAction ||
  VALID_VERSION_ACTIONS.indexOf(versionAction.toLowerCase()) === -1
) {
  console.error('ERROR:');
  console.error(`${versionAction} is not a valid version action`);
  console.error(
    `Please supply one of the following values: ${VALID_VERSION_ACTIONS.join(
      ' '
    )}`
  );
  console.error('');
  return;
}

run(versionAction)
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
