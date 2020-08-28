import _ from 'lodash';
import fs from 'fs';

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

  const result = array
    .sort(alphabetSortBySign)
    .sort(alphabetSortByKey)
    .map((item) => `  ${item[0]} ${item[1]}: ${item[2]}`);

  return `{\n${result.join('\n')}\n}`;
};

const findDiff = (filepath1, filepath2) => {
  const firstData = fs.readFileSync(filepath1);
  const secondData = fs.readFileSync(filepath2);
  const firstObj = JSON.parse(firstData);
  const secondObj = JSON.parse(secondData);

  const mergedKeys = _.uniq([...Object.keys(firstObj), ...Object.keys(secondObj)]);

  const result = mergedKeys.reduce((acc, current) => {
    if (Object.keys(firstObj).includes(current) && Object.keys(secondObj).includes(current)) {
      if (firstObj[current] === secondObj[current]) {
        acc.push([' ', current, firstObj[current]]);
      } else {
        acc.push(['-', current, firstObj[current]]);
        acc.push(['+', current, secondObj[current]]);
      }
    }
    if (Object.keys(firstObj).includes(current) && !Object.keys(secondObj).includes(current)) {
      acc.push(['-', current, firstObj[current]]);
    }
    if (!Object.keys(firstObj).includes(current) && Object.keys(secondObj).includes(current)) {
      acc.push(['+', current, secondObj[current]]);
    }
    return acc;
  }, []);

  return customOutput(result);
};

export default findDiff;
