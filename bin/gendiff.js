#!/usr/bin/env node
import commander from 'commander';
import findDiff from '../src/gendiff.js';

const program = commander.createCommand();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(findDiff(filepath1, filepath2));
  })
  .parse(process.argv);
