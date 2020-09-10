import yaml from 'js-yaml';
import ini from 'ini';

const parserMapping = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (data, extention) => parserMapping[extention](data);
