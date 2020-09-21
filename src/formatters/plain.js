import _ from 'lodash';

const renderValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return String(value);
};

const statusMapping = {
  added: (node, path) => `Property '${path.join('.')}' was added with value: ${renderValue(node.curValue)}`,
  changed: (node, path) => `Property '${path.join('.')}' was updated. From ${renderValue(node.prevValue)} to ${renderValue(node.curValue)}`,
  deleted: (node, path) => `Property '${path.join('.')}' was removed`,
  nested: (node, path, iter) => iter(node.children, path),
  unchanged: () => [],
};

const plain = (ast, pathPieces = []) => {
  const iter = (node, collectedPathPieces) => {
    const mergePath = [...collectedPathPieces, node.keyName];
    return statusMapping[node.status](node, mergePath, plain);
  };

  return ast.map((item) => iter(item, pathPieces)).flat().join('\n');
};

export default plain;
