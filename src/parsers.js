import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsers = (filepath) => {
  const filepathFull = path.resolve(process.cwd(), '__fixtures__', filepath);
  const extension = path.extname(filepathFull);
  const data = fs.readFileSync(filepathFull);

  let parse;
  if (extension === '.json') {
    parse = JSON.parse;
  }
  if (extension === '.yml') {
    parse = yaml.safeLoad;
  }
  return parse(data);
};

export default parsers;
