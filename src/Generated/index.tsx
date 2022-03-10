import * as React from 'react';
import Child1 from "./Child1"
import Child2 from "./Child2"
import Child3 from "./Child3"
import "./index.css"

const Display = () => {
  return <div>
    <div>
      <Child1 />
      <Child2 />
      <Child3 />
    </div>
  </div>
}

export default Display
