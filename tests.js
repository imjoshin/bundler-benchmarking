exports.availableBundlers = [
  'esbuild', 
  'parcel', 
  'parcel-css',
  'rollup',
  'rollup-terser',
  'webpack',
  'webpack-esbuild',
  'webpack-swc',
  'vite',
]

exports.testCases = {
  children: [1, 3, 5, 7, 9],
  depth: [1, 3, 5],
  styles: [true, false],
  iterations: 3,
}
