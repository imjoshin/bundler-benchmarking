exports.availableBundlers = [
  'esbuild', 
  'parcel', 
  'parcel-css',
  'rollup',
  'rollup-terser',
  'webpack',
  'webpack-swc',
]

exports.testCases = {
  children: [1, 3, 5, 7],
  depth: [1, 2, 3, 4, 5],
  styles: [true, false],
  iterations: 4,
}
