const path = require('path')
const fs = require('fs')

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
}

function generateDepth(currentPath, depth, maxDepth, child, children, styles) {
  console.log({currentPath, depth, maxDepth, child, children, styles})
  const imports = []
  const childObjects = []

  if (depth < maxDepth) {
    for (let i = 1; i <= children; i++) {
      const nextPath = path.resolve(currentPath, `Child${i}`)
      imports.push(`import Child${i} from "./Child${i}"`)
      childObjects.push(`      <Child${i} />`)
      generateDepth(nextPath, depth + 1, maxDepth, i, children, styles)
    }
  }

  const childContent = (depth === 0 ? templates.display : templates.child)
    .replace(/%DEPTH%/g, depth)
    .replace(/%CHILD%/g, child)
    .replace(/%IMPORTS%/, imports.join("\n"))
    .replace(/%CHILDREN%/g, childObjects.join("\n"))

  fs.mkdirSync(currentPath, {recursive: true})
  fs.writeFileSync(path.resolve(currentPath, 'index.tsx'), childContent)
}

// const displayContent = templates.display
// fs.writeFileSync(path.resolve(baseOutputPath, 'index.tsx'), displayContent)

fs.rmSync(baseOutputPath, {recursive: true, force: true})
generateDepth(baseOutputPath, 0, args.depth, 1, args.children, args.styles)