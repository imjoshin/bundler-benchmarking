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
4. Add the bundler name to `availableBundlers` in `./tests.js`
5. Run `yarn test`
6. Update this README's results below


## Future Features

- Measure builds in a `watch` mode
- Measure a second rebuild
- Measure a second rebuild with files changed
- Run in docker container to grab peak memory usage
- Better results output


## Known Issues

- 


## Results

View the results of the test runs [here](https://github.com/j0sh77/bundler-benchmarking/tree/main/results).

## License
[MIT](https://choosealicense.com/licenses/mit/)