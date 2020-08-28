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
  expect(gendiff('__fixtures__/filepath1.json', '__fixtures__/filepath2.json')).toEqual(expectedString);
});
