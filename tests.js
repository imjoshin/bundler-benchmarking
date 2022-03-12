exports.availableBundlers = [
  'esbuild', 
  'parcel', 
  'rollup', 
  'webpack',
  'webpack-swc',
]

exports.testCases = {
  children: [1, 2, 3, 4, 5, 6, 7],
  depth: [1, 2, 3, 4, 5],
  styles: [true, false],
  iterations: 4,
}
