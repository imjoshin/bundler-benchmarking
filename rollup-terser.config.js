import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json'
import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';


export default {
  input: './src/index.tsx',
  output: {
    file: 'dist/app.js',
    format: 'iife',
    sourcemap: false,
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    }
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      dedupe: ['react', 'react-dom'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BUNDLER_NAME': JSON.stringify('rollup'),
    }),
    commonjs(),
    typescript(),
    terser(),
    postcss({
      plugins: [
        cssnano(),
      ],
      extensions: [ '.css' ],
    }),
  ]
}