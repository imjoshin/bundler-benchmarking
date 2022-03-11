exports.availableBundlers = [
  'esbuild', 
  'parcel', 
  'rollup', 
  'webpack'
]

exports.testCases = {
  children: [1, 3, 5, 8, 10],
  depth: [1, 3, 5],
  styles: [true, false],
  iterations: 5,
}
