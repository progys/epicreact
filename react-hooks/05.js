// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
 const root =  React.useRef();

React.useEffect(() => {
   const rootNode = root.current;
   VanillaTilt.init(rootNode, {
     max: 25,
     speed: 400,
     glare: true,
     'max-glare': 0.5,
   });
   return () => rootNode.vanillaTilt.destroy();
}, []);

  return (
    <div className="tilt-root" ref={root}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
