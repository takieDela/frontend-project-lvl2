import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import getDiff from './genDiff.js';
import render from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');
const getExtension = (filepath) => path.extname(filepath);

export default (filepath1, filepath2, format = 'tree') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const extension1 = getExtension(filepath1);
  const extension2 = getExtension(filepath2);
  const parsedData1 = parse(data1, extension1);
  const parsedData2 = parse(data2, extension2);
  const calculatedDiff = getDiff(parsedData1, parsedData2);
  return render(calculatedDiff, format);
};
