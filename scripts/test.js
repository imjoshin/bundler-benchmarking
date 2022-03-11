const path = require('path')
const fs = require('fs')
const cliProgress = require('cli-progress');

const availableBundlers = ['webpack']

const args = require('yargs')
  .scriptName("test")
  .usage('Usage: $0 -d {depth} -c {children} -s true')
  .option('bundler', {
    alias: 'b',
    default: 'all',
    description: 'The bundler to test',
    type: 'string',
    choices: ['all', ...availableBundlers]
  })
  .option('iterations', {
    alias: 'i',
    default: 10,
    description: 'The number of iterations for each test',
    type: 'number',
  })
  .help('h')
  .alias('h', 'help')
  .argv

const bundlers = args.bundler !== "all" ? [args.bundler] : availableBundlers

bundlers.forEach((bundler) => {
  console.log(`Testing ${bundler}`)
})
