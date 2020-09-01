import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = (filepath) => {
  const filepathFull = path.resolve(process.cwd(), '__fixtures__', filepath);
  const extension = path.extname(filepathFull);
  const data = fs.readFileSync(filepathFull, 'utf-8');

  let parse;
  if (extension === '.json') {
    parse = JSON.parse;
  }
  if (extension === '.yml') {
    parse = yaml.safeLoad;
  }
  if (extension === '.ini') {
    parse = ini.parse;
  }

  return parse(data);
};

export default parsers;
