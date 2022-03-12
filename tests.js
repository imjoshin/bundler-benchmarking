exports.availableBundlers = [
  'esbuild', 
  'parcel', 
  'rollup',
  'rollup-terser',
  'webpack',
  'webpack-swc',
]

exports.testCases = {
  children: [1, 2, 3, 4, 5, 6, 7],
  depth: [1, 2, 3, 4, 5],
  styles: [true, false],
  iterations: 2,
}
