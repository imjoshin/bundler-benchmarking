# bundler-benchmarking

This project was made to benchmark different bundlers under different constraints.

Current bundlers measured:
- esbuild
- parcel
- rollup
- webpack

These benchmarks use a generated application using `yarn generate`. 


## Installation

```bash
git clone git@github.com:j0sh77/bundler-benchmarking.git
cd bundler-benchmarking
yarn install
```

## Usage

### Generating a site

```bash
yarn generate -c $CHILDREN -d $DEPTH -s $STYLES
```

Generates a sample site where a tree of react components is created. 
Each node of the tree has `c` children and the tree is of depth `d`.
If `s` is `true`, a stylesheet will be generated for each component.

### Running/viewing Builds

```bash
yarn build:$BUNDLER
yarn serve
```

### Running tests

```bash
yarn test
```

Runs the test suite defined in `scripts/test.js`.

## Contributing

Pull requests are welcome and encouraged!


### Adding a new bundler

If you'd like to add a new bundler, please do! 

1. Add the needed dependencies
2. Create the config file (if any)
3. Add a `build:$BUNDLER` script to `package.json`
4. Add the bundler name to `availableBundlers` in `scripts/test.js`
5. Run `yarn test`
6. Update this README's results below


## Future Features

- Measure builds in a `watch` mode
- Measure a second rebuild
- Measure a second rebuild with files changed
- Run in docker container to grab peak memory usage


## Known Issues

- Parcel configuration isn't set to render in browser
- Rollup configuration isn't set to render in browser


## Results
<!---
If you run a new test, please replace the results here with your results.md that was generated.
-->

### children=1, depth=1, styles=true
||esbuild|parcel|rollup|webpack|
|---|---|---|---|---|
|Success Rate|100%|100%|100%|100%|
|Build Time|0.18s|0.82s|1.77s|3.18s|
|Bundle Size|130kb|3kb|2kb|268kb|

### children=1, depth=3, styles=true
||esbuild|parcel|rollup|webpack|
|---|---|---|---|---|
|Success Rate|100%|100%|100%|100%|
|Build Time|0.18s|0.9s|1.83s|3.24s|
|Bundle Size|131kb|6kb|3kb|273kb|


## License
[MIT](https://choosealicense.com/licenses/mit/)