import * as React from 'react';
import { Display } from "./Generated/Display"
import "./App.css"

const App = () => {
  return (
    <div className="container">
      <div className="app">
        <h1>Bundler Benchmarking - {process.env.BUNDLER_NAME} </h1>
        <Display />
      </div>
    </div>
  )
}

export default App