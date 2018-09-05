const jsonTree = require('./data/jsonTree.js');

const getSkPersonList = function(arr) {
  const skPersonArr = [];

  const recursiveDestructure = function(target) {
    const {
      name,
      type,
      childnode: child,
      childnode: { length: childLength },
    } = Array.isArray(target) ? target[0] : target;
    const isAbleLoop = childLength >= 2;
    const isSk = type === 'sk';

    isSk && skPersonArr.push(name);

    return isAbleLoop ? child.map((val) => recursiveDestructure(val)) : childLength && recursiveDestructure(child);
  };

  recursiveDestructure(arr);

  return skPersonArr;
};

console.log(getSkPersonList(jsonTree));
