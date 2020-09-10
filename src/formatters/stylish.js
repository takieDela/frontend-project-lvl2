import _ from 'lodash';

const padding = (depth) => '  '.repeat(depth);

const renderValue = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const renderObject = Object.entries(value)
    .map(([key, innerValue]) => `${padding(depth + 2)}    ${key}: ${renderValue(innerValue, depth + 2)}`);

  return `{\n${renderObject.join('\n')}\n${padding(depth + 2)}}`;
};

const statusMapping = {
  added: (node, depth) => `${padding(depth)}  + ${node.keyName}: ${renderValue(node.curValue, depth)}`,
  changed: (node, depth) => [
    `${padding(depth)}  - ${node.keyName}: ${renderValue(node.prevValue, depth)}`,
    `${padding(depth)}  + ${node.keyName}: ${renderValue(node.curValue, depth)}`,
  ],
  deleted: (node, depth) => `${padding(depth)}  - ${node.keyName}: ${renderValue(node.curValue, depth)}`,
  nested: (node, depth, iter) => `${padding(depth)}    ${node.keyName}: ${iter(node.children, depth + 2)}`,
  unchanged: (node, depth) => `${padding(depth)}    ${node.keyName}: ${renderValue(node.curValue, depth)}`,
};

const renderTree = (ast) => {
  const iter = (children, depth) => {
    const lines = children.flatMap((node) => statusMapping[node.status](node, depth, iter));
    return `{\n${lines.join('\n')}\n${padding(depth)}}`;
  };

  return iter(ast, 0);
};

export default renderTree;
