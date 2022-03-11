const path = require('path')
const fs = require('fs')
const cliProgress = require('cli-progress');

const args = require('yargs')
  .scriptName("generate")
  .usage('Usage: $0 -d {depth} -c {children} -s true')
  .option('depth', {
    alias: 'd',
    default: 3,
    description: 'The depth of components to generate',
    type: 'number',
  })
  .option('children', {
    alias: 'c',
    default: 3,
    description: 'The amount of children to generate for each component',
    type: 'number',
  })
  .option('styles', {
    alias: 's',
    default: true,
    description: 'Whether or not to add styles to components',
    type: 'boolean',
  })
  .help('h')
  .alias('h', 'help')
  .argv

const baseOutputPath = path.resolve(__dirname, '..', 'src', 'Generated')
const templates = {
  display: fs.readFileSync(path.resolve(__dirname, 'templates', 'Display.tsx')).toString(),
  child: fs.readFileSync(path.resolve(__dirname, 'templates', 'Child.tsx')).toString(),
  childStyle: fs.readFileSync(path.resolve(__dirname, 'templates', 'Child.css')).toString(),
}

const progress = new cliProgress.SingleBar({
  barCompleteChar: '█',
  barIncompleteChar: ' ',
}, cliProgress.Presets.shades_classic)

let totalComponents = (args.children - args.children ** (args.depth + 1)) / (1 - args.children) + 1
if (args.children === 1) {
  totalComponents = args.depth + 1
} else if (args.depth === 1) {
  totalComponents = args.children + 1
}

progress.start(totalComponents, 0)

function generateDepth(currentPath, id, depth, maxDepth, child, children, styles) {
  const imports = []
  const childObjects = []

  if (depth < maxDepth) {
    for (let i = 1; i <= children; i++) {
      const nextPath = path.resolve(currentPath, `Child${i}`)
      imports.push(`import Child${i} from "./Child${i}"`)
      childObjects.push(`      <Child${i} />`)
      generateDepth(nextPath, `${id}-${i}`, depth + 1, maxDepth, i, children, styles)
    }
  }

  fs.mkdirSync(currentPath, {recursive: true})

  if (styles) {
    const styleContent = templates.childStyle
      .replace(/%DEPTH%/g, depth)
      .replace(/%CHILD%/g, child)
      .replace(/%CHILD_ID%/g, id)

    fs.writeFileSync(path.resolve(currentPath, 'index.css'), styleContent)
    imports.push(`import "./index.css"`)
  }

  const childContent = (depth === 0 ? templates.display : templates.child)
    .replace(/%DEPTH%/g, depth)
    .replace(/%CHILD%/g, child)
    .replace(/%CHILD_ID%/g, id)
    .replace(/%IMPORTS%/, imports.join("\n"))
    .replace(/%CHILDREN%/g, childObjects.join("\n"))
  fs.writeFileSync(path.resolve(currentPath, 'index.tsx'), childContent)

  progress.increment()
}

fs.rmSync(baseOutputPath, {recursive: true, force: true})
generateDepth(baseOutputPath, 'id', 0, args.depth, 1, args.children, args.styles)
progress.stop()