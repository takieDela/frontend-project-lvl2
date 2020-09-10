import renderTreeDiff from './stylish.js';
import renderPlainDiff from './plain.js';
import renderJSONDiff from './json.js';

const renderersTree = {
  plain: renderPlainDiff,
  tree: renderTreeDiff,
  json: renderJSONDiff,
};

export default (diff, format) => renderersTree[format](diff);
