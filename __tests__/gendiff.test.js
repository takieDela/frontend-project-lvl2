import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);
const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const expectedString = readFile(getFixturePath('expectedString.txt'));
const expectedPlainOutputString = readFile(getFixturePath('expectedPlainOutputString.txt'));
const expectedStringifyJsonOutput = readFile(getFixturePath('expectedStringifyJsonOutput.json'));

test('comparing json files', () => {
  const calculatedDiff = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(calculatedDiff).toEqual(expectedString);
});

test('comparing yaml files', () => {
  const calculatedDiff = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(calculatedDiff).toEqual(expectedString);
});

test('comparing ini files', () => {
  const calculatedDiff = gendiff(getFixturePath('file1.ini'), getFixturePath('file2.ini'));
  expect(calculatedDiff).toEqual(expectedString);
});

test('display plain format', () => {
  const calculatedDiff = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(calculatedDiff).toEqual(expectedPlainOutputString);
});

test('display json format', () => {
  const calculatedDiff = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(calculatedDiff).toEqual(expectedStringifyJsonOutput);
});
