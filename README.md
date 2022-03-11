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

- Parcel configuration ends up with a `require` of the `app.css` in the final bundle, which breaks the browser rendering


## Results
<!---
If you run a new test, please replace the results here with your results.md that was generated.
-->

### children=1, depth=1, styles=true
||esbuild|parcel|rollup|webpack|
|---|---|---|---|---|
|Success Rate|100%|100%|100%|100%|
|Build Time|0.17s|0.78s|3.54s|3.21s|
|Bundle Size|130kb|3kb|126kb|268kb|

### children=1, depth=3, styles=true
||esbuild|parcel|rollup|webpack|
|---|---|---|---|---|
|Success Rate|100%|100%|100%|100%|
|Build Time|0.19s|0.85s|3.64s|3.13s|
|Bundle Size|131kb|6kb|127kb|273kb|

### children=1, depth=5, styles=true
||esbuild|parcel|rollup|webpack|
|---|---|---|---|---|
|Success Rate|100%|100%|100%|100%|
|Build Time|0.17s|0.85s|3.74s|3.6s|
|Bundle Size|133kb|10kb|129kb|279kb|

### children=3, depth=1, styles=true
||esbuild|parcel|rollup|webpack|
|---|---|---|---|---|
|Success Rate|100%|100%|100%|100%|
|Build Time|0.19s|0.94s|3.97s|3.4s|
|Bundle Size|131kb|6kb|127kb|273kb|

### children=3, depth=3, styles=true
||esbuild|parcel|rollup|webpack|
|---|---|---|---|---|
|Success Rate|100%|100%|100%|100%|
|Build Time|0.19s|1.07s|4.8s|4.59s|
|Bundle Size|152kb|67kb|151kb|382kb|

### children=3, depth=5, styles=true
||esbuild|parcel|rollup|webpack|
|---|---|---|---|---|
|Success Rate|100%|100%|100%|100%|
|Build Time|0.21s|2.08s|11.19s|13.06s|
|Bundle Size|342kb|616kb|369kb|1371kb|

### children=5, depth=1, styles=true
||esbuild|parcel|rollup|webpack|
|---|---|---|---|---|
|Success Rate|100%|100%|100%|100%|
|Build Time|0.18s|0.97s|3.93s|3.4s|
|Bundle Size|133kb|10kb|129kb|279kb|

### children=5, depth=3, styles=true
||esbuild|parcel|rollup|webpack|
|---|---|---|---|---|
|Success Rate|100%|100%|100%|100%|
|Build Time|0.19s|1.36s|7.45s|7.83s|
|Bundle Size|220kb|262kb|229kb|730kb|

### children=5, depth=5, styles=true
||esbuild|parcel|rollup|webpack|
|---|---|---|---|---|
|Success Rate|100%|100%|100%|100%|
|Build Time|0.5s|55.83s|91.66s|95.68s|
|Bundle Size|2441kb|6590kb|2745kb|12307kb|



## License
[MIT](https://choosealicense.com/licenses/mit/)