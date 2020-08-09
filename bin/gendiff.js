#!/usr/bin/env node


const program = require('commander'); // (normal include)

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format', 'output format')
  
  .parse(process.argv);


console.log(program.args);