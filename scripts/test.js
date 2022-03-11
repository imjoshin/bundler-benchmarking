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

const tests = {
  children: [1, 3, 5, 8],
  depth: [1, 3, 5],
  styles: [true, false],
  iterations: 5,
}

async function test(bundler, children, depth, styles, iteration) {
  await execute(`yarn clean`)
  const start = Date.now()
  let success = true

  try {
    await execute(`yarn build:${bundler}`)
  } catch {
    success = false
  }

  const elapsed = Math.round((Date.now() - start) / 10) / 100;
  const status = success ? 'succeeded' : `${Red}errored${Reset}`

  const dist = path.resolve(__dirname, "..", "dist")
  const bundleStat = fs.statSync(path.resolve(dist, "app.js"))
  let bundleSize = bundleStat.size

  if (!fs.existsSync(path.resolve(dist, 'app.css'))) {
    const styleStat = fs.statSync(path.resolve(dist, "app.js"))
    bundleSize += styleStat.size
  }

  // TODO average, better output, get size of bundle, etc?
  console.log(`${bundler} ${status} after ${elapsed}s with ${children} children and a depth of ${depth}. Bundle size: ${bundleSize}`)
}

// TODO run two builds to measure second build
async function runTests() {
  for (const c of tests.children) {
    for (const d of tests.depth) {
      for (const s of tests.styles) {
        await execute(`yarn generate -c ${c} -d ${d} -s ${s ? 'true' : 'false'}`)

        for (bundler of bundlers) {
          for (const i of [...Array(tests.iterations).keys()]) {
            await test(bundler, c, d, s, i)
          }
        }
        
      }
    }
  }
}

runTests()
