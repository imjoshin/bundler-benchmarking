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
  children: [1, 3],
  depth: [1, 3],
  styles: [true, false],
  iterations: 1,
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
  console.log(`${bundler} ${status} after ${elapsed}s with c=${children}, d=${depth}, and styles=${styles ? 'true' : 'false'}. Bundle size: ${bundleSize}`)

  return {
    success,
    time: elapsed, 
    size: bundleSize
  }
}

function formatResults(c, d, s, results) {
  const bundlers = Object.keys(results).sort()
  const success = bundlers.map((b) => results[b].success * 100 + "%")
  const time = bundlers.map((b) => results[b].time + "s")
  const size = bundlers.map((b) => Math.round(results[b].size / 1024) + "kb")

  const output = [
    `### Results with children=${c}, depth=${d}, and styles=${s ? 'true' : 'false'}`,
    `||${bundlers.join("|")}|`,
    `|---|${bundlers.map(() => "---").join("|")}|`,
    `|Success Rate|${success.join("|")}|`,
    `|Build Time|${time.join("|")}|`,
    `|Bundle Size|${size.join("|")}|`,
  ]

  return output.join("\n")
}

// TODO run two builds to measure second build
async function runTests() {
  let finalResults = []
  for (const c of tests.children) {
    for (const d of tests.depth) {
      for (const s of tests.styles) {
        await execute(`yarn generate -c ${c} -d ${d} -s ${s ? 'true' : 'false'}`)

        let results = {}

        for (bundler of bundlers) {
          let final = {success: 0, time: 0, size: 0}
          
          for (const i of [...Array(tests.iterations).keys()]) {
            const result = await test(bundler, c, d, s, i)
            final.success += result.success ? 1 : 0
            if (result.success) {
              final.time += result.time
              final.size += result.size
            }
          }

          results[bundler] = {
            success: final.success / tests.iterations,
            time: final.time / tests.iterations,
            size: final.size / tests.iterations,
          }
        }

        const formatted = formatResults(c, d, s, results)
        finalResults.push(formatted)
      }
    }
  }

  fs.writeFileSync(path.resolve(__dirname, '..', 'results.md'), finalResults.join("\n\n"))
}

runTests()
