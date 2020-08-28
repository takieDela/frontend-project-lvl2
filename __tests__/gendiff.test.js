import gendiff from '../src/gendiff';

const expectedString = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('comparing json', () => {
  expect(gendiff('filepath1.json', 'filepath2.json')).toEqual(expectedString);
});

test('comparing yaml', () => {
  expect(gendiff('filepath1.yml', 'filepath2.yml')).toEqual(expectedString);
});
