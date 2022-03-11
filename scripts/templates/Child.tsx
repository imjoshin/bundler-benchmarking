import * as React from 'react'
%IMPORTS%

const Child = () => {
  const text = "Depth %DEPTH%, Child %CHILD%"
  const [boldChars, setBoldChars] = React.useState(new Array(text.length))
  const fontSize = Math.max(18 - %DEPTH%, 6)
  const style = {
    marginLeft: `1rem`,
    borderLeft: `0.1rem solid`, 
    padding: `0.1rem 0.5rem`, 
    fontSize: `${fontSize}px`
  }

  const onClick = React.useCallback((i: number) => {
    boldChars[i] = !boldChars[i]
    console.log(boldChars)
    setBoldChars([...boldChars])
  }, [boldChars])

  let display = []
  for(let i = 0; i < text.length; i++) {
    const letterStyle = {
      fontWeight: boldChars[i] ? 'bold' : 'normal',
      color: boldChars[i] ? 'orange' : 'inherit',
    }
    display.push(
      <span key={i} onClick={() => onClick(i)} style={letterStyle}>
        {text[i]}
      </span>
    )
  }

  return <div className="child-%CHILD_ID%" style={style}>
    <div>
      {display}
    </div>
    <div>
%CHILDREN%
    </div>
  </div>
}

export default Child
