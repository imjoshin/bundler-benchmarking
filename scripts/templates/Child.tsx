import * as React from 'react'
%IMPORTS%

const Child = () => {
  const fontSize = Math.max(18 - %DEPTH%, 6)
  const style = {
    marginLeft: `1rem`,
    borderLeft: `0.1rem solid`, 
    padding: `0.1rem 0.5rem`, 
    fontSize: `${fontSize}px`
  }

  return <div className="child-%CHILD_ID%" style={style}>
    <div>
      Depth %DEPTH%, Child %CHILD%
    </div>
    <div>
%CHILDREN%
    </div>
  </div>
}

export default Child
