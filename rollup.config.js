import typescript from '@rollup/plugin-typescript'
import css from "rollup-plugin-import-css"
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import {uglify} from 'rollup-plugin-uglify';
import pkg from './package.json'

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
    css(),
    uglify(),
  ]
}