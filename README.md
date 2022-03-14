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


## Known Issues

- 


## Results
<!---
If you run a new test, please replace the results here with your results.md that was generated.
-->
### Total components: 2
children=1, depth=1, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.2s|2.08s|3.55s|3.03s|2.91s|1.99s|
|Bundle Size|131kb|134kb|127kb|130kb|134kb|128kb|

### Total components: 3
children=1, depth=2, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.17s|1.81s|3.53s|3.07s|2.98s|1.99s|
|Bundle Size|131kb|135kb|128kb|131kb|135kb|130kb|

### Total components: 4
children=1, depth=3, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.17s|1.81s|3.51s|3.11s|3.03s|2.01s|
|Bundle Size|132kb|136kb|128kb|132kb|137kb|132kb|

### Total components: 5
children=1, depth=4, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.17s|1.84s|3.51s|3.13s|3.07s|2.04s|
|Bundle Size|133kb|137kb|129kb|133kb|138kb|134kb|

### Total components: 6
children=1, depth=5, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.17s|1.84s|3.56s|3.14s|3.14s|2.05s|
|Bundle Size|133kb|138kb|130kb|134kb|140kb|136kb|

### Total components: 4
children=3, depth=1, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.18s|1.81s|3.53s|3.11s|3s|2.01s|
|Bundle Size|132kb|135kb|128kb|132kb|137kb|132kb|

### Total components: 13
children=3, depth=2, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.17s|1.93s|3.76s|3.34s|3.35s|2.25s|
|Bundle Size|138kb|144kb|135kb|139kb|151kb|150kb|

### Total components: 40
children=3, depth=3, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.18s|2.08s|4.44s|4s|4.18s|2.87s|
|Bundle Size|157kb|172kb|157kb|160kb|192kb|205kb|

### Total components: 121
children=3, depth=4, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.18s|2.64s|6.06s|5.85s|6.37s|4.78s|
|Bundle Size|213kb|253kb|222kb|224kb|316kb|370kb|

### Total components: 364
children=3, depth=5, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.2s|4.16s|10.15s|10.57s|11.83s|10.86s|
|Bundle Size|382kb|499kb|418kb|418kb|696kb|867kb|

### Total components: 6
children=5, depth=1, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.17s|1.82s|3.54s|3.1s|3.11s|2.07s|
|Bundle Size|133kb|137kb|130kb|133kb|140kb|136kb|

### Total components: 31
children=5, depth=2, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.17s|2.04s|4.14s|3.78s|3.9s|2.65s|
|Bundle Size|150kb|162kb|150kb|153kb|178kb|187kb|

### Total components: 156
children=5, depth=3, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.18s|2.81s|6.75s|6.54s|7.05s|5.55s|
|Bundle Size|236kb|287kb|249kb|251kb|369kb|441kb|

### Total components: 781
children=5, depth=4, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.24s|7.44s|17.3s|18.01s|20.77s|24.84s|
|Bundle Size|667kb|916kb|750kb|746kb|1340kb|1715kb|

### Total components: 3906
children=5, depth=5, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.51s|71.1s|83.03s|83.88s|91.22s|323.24s|
|Bundle Size|2864kb|4076kb|3272kb|3241kb|6268kb|8126kb|

### Total components: 8
children=7, depth=1, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.18s|1.82s|3.58s|3.19s|3.18s|2.09s|
|Bundle Size|135kb|139kb|132kb|135kb|143kb|140kb|

### Total components: 57
children=7, depth=2, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.18s|2.22s|4.66s|4.31s|4.62s|3.22s|
|Bundle Size|168kb|188kb|170kb|173kb|218kb|239kb|

### Total components: 400
children=7, depth=3, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.2s|4.33s|10.71s|10.97s|12.59s|11.69s|
|Bundle Size|403kb|531kb|443kb|443kb|748kb|936kb|

### Total components: 2801
children=7, depth=4, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.4s|39.65s|54.52s|56.25s|63.6s|167.65s|
|Bundle Size|2071kb|2942kb|2366kb|2344kb|4516kb|5844kb|

### Total components: 19608
children=7, depth=5, styles=true

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|0/2|0/2|0/2|0/2|
|Build Time|2.02s|2539.65s|0s|0s|0s|0s|
|Bundle Size|13953kb|19919kb|0kb|0kb|0kb|0kb|

### Total components: 2
children=1, depth=1, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.2s|2.06s|3.53s|3.01s|2.91s|1.96s|
|Bundle Size|131kb|133kb|127kb|130kb|133kb|128kb|

### Total components: 3
children=1, depth=2, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.17s|1.82s|3.48s|3s|2.95s|2.01s|
|Bundle Size|131kb|134kb|127kb|131kb|133kb|130kb|

### Total components: 4
children=1, depth=3, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.17s|1.81s|3.52s|3.03s|3.01s|2.01s|
|Bundle Size|132kb|135kb|128kb|132kb|134kb|132kb|

### Total components: 5
children=1, depth=4, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.17s|1.84s|3.58s|3.13s|3.04s|2.02s|
|Bundle Size|132kb|136kb|129kb|132kb|135kb|134kb|

### Total components: 6
children=1, depth=5, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.17s|1.83s|3.59s|3.16s|3.09s|2.04s|
|Bundle Size|133kb|137kb|129kb|133kb|136kb|135kb|

### Total components: 4
children=3, depth=1, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.17s|1.79s|3.57s|3.09s|3.02s|1.99s|
|Bundle Size|132kb|135kb|128kb|131kb|134kb|132kb|

### Total components: 13
children=3, depth=2, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.18s|1.86s|3.77s|3.26s|3.24s|2.17s|
|Bundle Size|137kb|142kb|134kb|138kb|143kb|149kb|

### Total components: 40
children=3, depth=3, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.18s|1.99s|4.29s|3.75s|3.84s|2.73s|
|Bundle Size|153kb|165kb|152kb|156kb|168kb|200kb|

### Total components: 121
children=3, depth=4, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.18s|2.49s|5.85s|5.19s|5.36s|4.37s|
|Bundle Size|200kb|233kb|206kb|210kb|245kb|354kb|

### Total components: 364
children=3, depth=5, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.19s|3.6s|9.64s|8.56s|9.47s|9.78s|
|Bundle Size|342kb|438kb|369kb|375kb|475kb|818kb|

### Total components: 6
children=5, depth=1, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.17s|1.82s|3.54s|3.1s|3.05s|2.04s|
|Bundle Size|133kb|137kb|129kb|133kb|136kb|135kb|

### Total components: 31
children=5, depth=2, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.18s|1.95s|4.13s|3.6s|3.64s|2.52s|
|Bundle Size|147kb|157kb|146kb|150kb|160kb|183kb|

### Total components: 156
children=5, depth=3, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.18s|2.62s|6.79s|5.72s|5.94s|5.11s|
|Bundle Size|220kb|262kb|229kb|234kb|278kb|421kb|

### Total components: 781
children=5, depth=4, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.21s|5.29s|16.06s|14.08s|15.73s|22.92s|
|Bundle Size|583kb|785kb|647kb|656kb|871kb|1612kb|

### Total components: 3906
children=5, depth=5, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.39s|17.09s|75.54s|54.14s|61.61s|307.27s|
|Bundle Size|2429kb|3409kb|2746kb|2776kb|3839kb|7600kb|

### Total components: 8
children=7, depth=1, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.19s|1.8s|3.62s|3.16s|3.07s|2.06s|
|Bundle Size|134kb|138kb|131kb|134kb|138kb|139kb|

### Total components: 57
children=7, depth=2, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.18s|2.13s|4.58s|4.04s|4.14s|3.06s|
|Bundle Size|162kb|179kb|163kb|167kb|184kb|232kb|

### Total components: 400
children=7, depth=3, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.19s|3.66s|10.16s|8.91s|9.84s|10.73s|
|Bundle Size|361kb|465kb|392kb|398kb|508kb|886kb|

### Total components: 2801
children=7, depth=4, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|2/2|2/2|2/2|2/2|
|Build Time|0.32s|12.95s|50.42s|38.9s|44.91s|166.05s|
|Bundle Size|1769kb|2474kb|1998kb|2021kb|2785kb|5477kb|

### Total components: 19608
children=7, depth=5, styles=false

||esbuild|parcel|rollup|rollup-terser|webpack|webpack-swc|
|---|---|---|---|---|---|---|
|Passes|2/2|2/2|0/2|0/2|2/2|0/2|
|Build Time|1.4s|87.42s|0s|0s|407.41s|0s|
|Bundle Size|11755kb|16565kb|0kb|0kb|18809kb|0kb|



## License
[MIT](https://choosealicense.com/licenses/mit/)