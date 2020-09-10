import _ from 'lodash';

const genDiff = (firstObj, secondObj) => _.union(Object.keys(firstObj), Object.keys(secondObj))
  .map((key) => {
    if (!_.has(firstObj, key)) {
      return {
        keyName: key,
        curValue: secondObj[key],
        status: 'added',
      };
    }

    if (!_.has(secondObj, key)) {
      return {
        keyName: key,
        curValue: firstObj[key],
        status: 'deleted',
      };
    }

    if (_.isPlainObject(firstObj[key]) && _.isPlainObject(secondObj[key])) {
      return {
        keyName: key,
        children: genDiff(firstObj[key], secondObj[key]),
        status: 'nested',
      };
    }

    if ((typeof firstObj[key] !== typeof secondObj[key])
    || (firstObj[key] !== secondObj[key])) {
      return {
        keyName: key,
        prevValue: firstObj[key],
        curValue: secondObj[key],
        status: 'changed',
      };
    }
    return {
      keyName: key,
      curValue: firstObj[key],
      status: 'unchanged',
    };
  });

export default genDiff;
