exports.availableBundlers = [
  'esbuild', 
  'parcel', 
  'rollup', 
  'webpack'
]

exports.testCases = {
  children: [1, 3, 5],
  depth: [1, 3, 5, 8],
  styles: [true],
  iterations: 5,
}
