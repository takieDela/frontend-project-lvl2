"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commander = _interopRequireDefault(require("commander"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const program = _commander.default.createCommand();

const findDiff = (firstData, secondData) => {
  const result = [];
  const firstDataEntries = Object.entries(firstData);
  const secondDataEntries = Object.entries(secondData);
  firstDataEntries.reduce((acc, [key, value]) => {
    if (!_lodash.default.has(secondData, key)) {
      result.push(['-', key, value]);
    } else {
      if (_lodash.default.get(secondData, key) !== value) {
        result.push(['-', key, value]);
        result.push(['+', key, _lodash.default.get(secondData, key)]);
      } else {
        result.push([' ', key, value]);
      }
    }
  }, '');

  for (const [key, value] of secondDataEntries) {
    if (!_lodash.default.has(firstData, key)) {
      result.push(['+', key, value]);
    }
  }

  return result;
};

const customOutput = output => {
  const outputSort = output.sort((a, b) => {
    if (a[1] < b[1]) {
      return -1;
    }

    if (a[1] > b[1]) {
      return 1;
    }

    return 0;
  });
  let result = `{\n`;

  for (const field of outputSort) {
    result = result + ' ' + field[0] + ' ' + field[1] + ':' + ' ' + field[2] + '\n';
  }

  result += '}';
  return result;
};

program.description('Compares two configuration files and shows a difference.').version(_package.default.version).helpOption('-h, --help', 'output usage information').option('-f, --format [type]', 'output format').arguments('<filepath1> <filepath2>').action(function (filepath1, filepath2) {
  const firstFile = _fs.default.readFileSync(_path.default.resolve('src/' + filepath1));

  const firstJson = JSON.parse(firstFile);

  const secondFile = _fs.default.readFileSync(_path.default.resolve('src/' + filepath2));

  const secondJson = JSON.parse(secondFile);
  console.log(customOutput(findDiff(firstJson, secondJson))); // console.log(firstJson);
  // console.log(secondJson);
  // console.log(program.args);
}).parse(process.argv);
var _default = program;
exports.default = _default;