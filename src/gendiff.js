import _ from 'lodash';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const findDiff = (filepath1, filepath2) => {
  const firstData = fs.readFileSync(`${__dirname}/../__fixtures__/${filepath1}`);
  const secondData = fs.readFileSync(`${__dirname}/../__fixtures__/${filepath2}`);
  const firstObj = JSON.parse(firstData);
  const secondObj = JSON.parse(secondData);

  const comparing = (object1, object2) => {
    const object1Entries = Object.entries(object1);
    const object2Entries = Object.entries(object2);
    const difference = [];

    difference.push([`-`, _.differenceWith(object1Entries, object2Entries, _.isEqual)]);
    difference.push([`+`, _.differenceWith(object2Entries, object1Entries, _.isEqual)]);
    difference.push([` `, _.intersectionWith(object1Entries, object2Entries, _.isEqual)]);

    const result = [];
    for (const [sign, data] of difference) {
      for (const [key, value] of data) {
        result.push([sign, key + ':', value]);
      }
    }
    return result;
  };

  return customOutput(comparing(firstObj, secondObj));
};



const customOutput = (array) => {
  const alphabetSortByKey = (a, b) => {
    if (a[1] < b[1]) {
      return -1;
    }
    if (a[1] > b[1]) {
      return 1;
    }
    return 0;
  };

  const alphabetSortBySign = (a, b) => {
    if (a[0] < b[0]) {
      return 1;
    }
    if (a[0] > b[0]) {
      return -1;
    }
    return 0;
  };
  
  const result = array.sort(alphabetSortBySign).sort(alphabetSortByKey);

  return `{\n${result.map(item => `  ${item.join(` `)}`).join(`\n`)}\n}`;
};

export default findDiff;




