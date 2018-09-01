// @flow

import { readFile, writeFile } from 'fs';

export const readFileAsync = asyncify(readFile);
export const writeFileAsync = asyncify(writeFile);

function asyncify(fn: Function) {
  return (...args: Array<*>): Promise<*> => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}
