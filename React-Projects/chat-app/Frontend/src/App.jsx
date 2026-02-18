import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@chakra-ui/react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Button colorScheme='red'>Button</Button>
        <h1>hello</h1>
      </div>
    </>
  )
}

export default App
