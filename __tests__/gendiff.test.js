import gendiff from '../src/index.js';
import expectedString from '../__fixtures__/expectedString.js';
import expectedPlainOutputString from '../__fixtures__/expectedPlainOutputString.js';

test('comparing json', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(expectedString);
});

test('comparing yaml', () => {
  expect(gendiff('file1.yml', 'file2.yml')).toEqual(expectedString);
});

test('comparing ini', () => {
  expect(gendiff('file1.ini', 'file2.ini')).toEqual(expectedString);
});

test('plain format', () => {
  expect(gendiff('file1.json', 'file2.json', 'plain')).toEqual(expectedPlainOutputString);
});
