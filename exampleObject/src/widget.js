const widget = require('./data/widget.js');

const getNumberPropList = function(arr) {
  const keyInWidget = Object.keys(arr);
  const isNumber = (val) => typeof val === 'number';
  const newArr = [];

  keyInWidget.forEach(function(key) {
    const valInWidget = arr[key];

    for (val in valInWidget) {
      if (valInWidget.hasOwnProperty(val)) isNumber(valInWidget[val]) && newArr.push(val);
    }
  });

  return newArr;
};

console.log(getNumberPropList(widget));
