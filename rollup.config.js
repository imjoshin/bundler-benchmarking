import typescript from '@rollup/plugin-typescript'
import css from "rollup-plugin-import-css"
import babel from 'rollup-plugin-babel';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import pkg from './package.json'

export default {
  input: './src/index.tsx',
  output: {
    file: pkg.main,
    format: 'iife',
    sourcemap: false,
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    }
  },
  plugins: [
    typescript(),
    css(),
    injectProcessEnv({ 
      BUNDLER_NAME: 'rollup',
    }),
    babel({ 
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react']
    })
  ]
}