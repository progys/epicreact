// Styling
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import '../box-styles.css'

// 💰 Use the className for the size and style (backgroundColor) for the color
// 💰 each of the elements should also have the "box" className applied

// 🐨 add a className prop to each of these and apply the correct class names
// 💰 Here are the available class names: box, box--large, box--medium, box--small

// 🐨 add a style prop to each of them as well so their background color
// matches what the text says it should be as well as `fontStyle: 'italic'`
function Box({style, size, children}) {
  return (
    <div style={{fontStyle: 'italic', ...style}} className={`box box--${size}`}>
      {children}
    </div>
  )
}

const smallBox = (
  <Box style={{backgroundColor: 'lightblue'}} size="small">
    small lightblue box
  </Box>
)
const mediumBox = (
  <Box style={{backgroundColor: 'pink'}} size="medium">
    medium pink box
  </Box>
)
const largeBox = (
  <Box style={{backgroundColor: 'orange'}} size="large">
    large orange box
  </Box>
)

function App() {
  return (
    <div>
      {smallBox}
      {mediumBox}
      {largeBox}
    </div>
  )
}

export default App
