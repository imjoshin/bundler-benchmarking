import * as React from 'react';
import Generated from "./Generated"
import "./App.css"

const App = () => {
  return (
    <div className="container">
      <div className="app">
        <h1>Bundler Benchmarking - {process.env.BUNDLER_NAME} </h1>
        <Generated />
      </div>
    </div>
  )
}

export default App