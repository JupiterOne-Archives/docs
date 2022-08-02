import { default as fsSync } from 'fs';
import glob from 'glob';
import path from 'path';
import { PATH_OF_DIRECTORY_TO_WATCH } from '.';

export const directoryPromise = (directoryLocation: string) =>
  new Promise<string[]>((resolve, reject) => {
    return getDirectories(directoryLocation, (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches as string[]);
      }
    });
  });

export const getDirectories = (
  src: string,
  cb: (err: any, res: any) => any
) => {
  glob(src + '/**/*', cb);
};

export const getAllSubChanges = async (gitChange: string) => {
  if (gitChange.indexOf('.') != -1) {
    return [gitChange];
  }
  const directoryLocation = path.join(__dirname, `../../../`, gitChange);

  const directoryPromise = new Promise<string[]>((resolve, reject) => {
    return getDirectories(directoryLocation, (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches as string[]);
      }
    });
  });
  return await directoryPromise;
};

export const directoryExists = (filePath?: string): boolean => {
  // we also want to use this to see if the file got deleted! the git diff wont differenitate
  if (!filePath) {
    return false;
  }

  const fileLocation = path.join(
    __dirname,
    `../../../../${PATH_OF_DIRECTORY_TO_WATCH}`,
    `/${filePath}`
  );
  try {
    return fsSync.existsSync(fileLocation);
  } catch (e) {
    return false;
  }
};
