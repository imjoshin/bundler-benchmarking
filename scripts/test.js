const path = require('path')
const fs = require('fs')
const cliProgress = require('cli-progress')
const util = require(`util`)
const exec = util.promisify(require(`child_process`).exec)

const availableBundlers = ['esbuild', 'parcel', 'rollup', 'webpack']

const Reset = "\x1b[0m"
const Dim = "\x1b[2m"
const Underline = "\x1b[4m"
const Black = "\x1b[30m"
const Red = "\x1b[31m"
const Green = "\x1b[32m"
const Yellow = "\x1b[33m"
const Blue = "\x1b[34m"
const Magenta = "\x1b[35m"
const Cyan = "\x1b[36m"
const White = "\x1b[37m"

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

const execute = (cmd, showCommand = true) => {
  if (showCommand) {
    console.log(`${Dim}$ ${cmd}${Reset}`)
  }

  return exec(cmd)
}

const tests = [
  {children: 1, depth: 1},
  {children: 1, depth: 5},
  {children: 3, depth: 1},
  {children: 3, depth: 3},
  {children: 5, depth: 1},
  {children: 5, depth: 3},
  {children: 5, depth: 5},
  {children: 5, depth: 8},
  {children: 10, depth: 1},
  {children: 10, depth: 3},
  {children: 10, depth: 5},
  {children: 10, depth: 8},
]

// TODO run two builds to measure second build
async function runTests() {
  for ({children, depth} of tests) {
    await execute(`yarn generate -c ${children} -d ${depth}`)

    for (bundler of bundlers) {
      await execute(`yarn clean`)
      const start = Date.now()
      await execute(`yarn build:${bundler}`)
      const elapsed = Math.round((Date.now() - start) / 10) / 100;

      // TODO average, better output, get size of bundle, etc?
      console.log(`${bundler} took ${elapsed}s with ${children} children and a depth of ${depth}`)
    }
  }
}

runTests()
