
import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)
  
  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)

  const handleClick = () => {
    console.log('clicked')
    alert('clicked')
  }

  return (
    <div>
      <div>{counter}</div>
      {/*
      <button onClick={handleClick}>
        OK
      </button>
      <br />
      <button onClick={() => setCounter(counter + 1)}>
        Contador
      </button>
      <br />
      <button onClick={() => console.log('clicked')}>
        Clicked console
      </button>*/}
      <br />
      <p>Controlador de eventos es una función</p>
      {/*<button onClick={() => setCounter(counter + 1)}>
        plus1
      </button>*/}
       <button onClick={() => setCounter(counter + 1)}>
        plus2
      </button>
      <br />
      <button onClick={increaseByOne}>
        plus
      </button>
      <br />
      <button onClick={setToZero}>
        zero
      </button>

    </div>
  )
}
export default App
