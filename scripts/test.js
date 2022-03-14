const path = require('path')
const fs = require('fs')
const cliProgress = require('cli-progress')
const util = require(`util`)
const exec = util.promisify(require(`child_process`).exec)
const {availableBundlers, testCases} = require('../tests')

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
  .usage('Usage: $0 -o {output name} -b {bundler}')
  .option('output', {
    alias: 'o',
    description: 'The name of the output name (without extension) in ./results',
    type: 'string',
    demandOption: true,
  })
  .option('bundler', {
    alias: 'b',
    default: 'all',
    description: 'The bundler to test',
    type: 'string',
    choices: ['all', ...availableBundlers]
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

  const dist = path.resolve(__dirname, "..", "dist")
  let bundleSize = 0

  if (fs.existsSync(dist)) {
    // TODO this measurement isn't great, but it works for now
    fs.readdirSync(dist).forEach(file => {
      if (file.endsWith(".css") || file.endsWith(".js") || file.endsWith(".html")) {
        const fileStat = fs.statSync(path.resolve(dist, file))
        bundleSize += fileStat.size
      }
    });
  }

  return {
    success: success && (bundleSize > 0),
    time: elapsed, 
    size: bundleSize
  }
}

function writeCSV(file, bundler, totalComponents, i, c, d, s, time, size, success) {
  fs.appendFileSync(file, [bundler, totalComponents, i, c, d, s, time, size, success].join(",") + "\n");
}

function formatResults(c, d, s, results, totalComponents) {
  const bundlers = Object.keys(results).sort()
  const success = bundlers.map((b) => results[b].passes)
  const time = bundlers.map((b) => Math.round(results[b].time * 100) / 100 + "s")
  const size = bundlers.map((b) => Math.round(results[b].size / 1024) + "kb")

  const output = [
    `### Total components: ${totalComponents}`, 
    `children=${c}, depth=${d}, styles=${s ? 'true' : 'false'}`,
    ``,
    `||${bundlers.join("|")}|`,
    `|---|${bundlers.map(() => "---").join("|")}|`,
    `|Passes|${success.join("|")}|`,
    `|Build Time|${time.join("|")}|`,
    `|Bundle Size|${size.join("|")}|`,
  ]

  return output.join("\n")
}

// TODO run two builds to measure second build
async function runTests() {
  const markdownResults = path.resolve(__dirname, '..', 'results', `${args.output}.md`)
  fs.writeFileSync(markdownResults, "")
  const csvResults = path.resolve(__dirname, '..', 'results', `${args.output}.csv`)
  fs.writeFileSync(csvResults, "bundler, components, iteration, children, depth, styles, time, bundle_size, success\n")

  for (const s of testCases.styles) {
    for (const c of testCases.children) {
      for (const d of testCases.depth) {
        let totalComponents = (c - c ** (d + 1)) / (1 - c) + 1
        if (c === 1) {
          totalComponents = d + 1
        } else if (d === 1) {
          totalComponents = c + 1
        }

        const logFields = [
          `Children: ${Cyan}${c}${Reset}`,
          `Depth: ${Cyan}${d}${Reset}`,
          `Components: ${Cyan}${totalComponents}${Reset}`,
          `Styles: ${Cyan}${s ? 'true' : 'false'}${Reset}`,
        ].join(', ')
        
        console.log(`\n  ${logFields}`)
        console.log(Array(logFields.length - (8 * 4)).fill('-').join(''))

        await execute(`yarn generate -c ${c} -d ${d} -s ${s ? 'true' : 'false'}`)

        let results = {}

        for (bundler of bundlers) {
          if (bundlers.length) {
            console.log(`Testing ${Yellow}${bundler}${Reset}`)
          }
          let final = {success: 0, time: 0, size: 0}

          for (const i of [...Array(testCases.iterations).keys()]) {
            const result = await test(bundler, c, d, s, i)
            final.success += result.success ? 1 : 0

            if (result.success) {
              final.time += result.time
              final.size += result.size
            }

            writeCSV(csvResults, bundler, totalComponents, i, c, d, s, result.time, result.size, result.success)
          }

          results[bundler] = {
            passes: `${final.success}/${testCases.iterations}`,
            time: final.time / testCases.iterations,
            size: final.size / testCases.iterations,
          }
        }

        const formatted = formatResults(c, d, s, results, totalComponents)
        fs.appendFileSync(markdownResults, formatted + "\n\n");
      }
    }
  }

}

runTests()
