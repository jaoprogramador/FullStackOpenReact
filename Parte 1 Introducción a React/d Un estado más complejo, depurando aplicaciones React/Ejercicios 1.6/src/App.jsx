
import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleBuenasClick = () => {
    
    setGood(good + 1)
    
  }

  const handleMalasClick = () => {
    
    setBad(bad + 1)
    
  }

  const handleNeutralClick = () => {
    
    setNeutral(neutral + 1)
    
  }
  const Estadisticas = (props) => {
    
      return (
        <div>
          <h3>Buenas:</h3>{props.good}
          <h3>Neutras:</h3>{props.neutral}
          <h3>Malas:</h3>{props.bad}
        </div>
      )
    }

  return (
    <div>
      <h1>Opiniones del servicio UNICAFE</h1>
      <button onClick={handleBuenasClick}>Bueno</button>
      <button onClick={handleNeutralClick}>Regular</button>
      <button onClick={handleMalasClick}>Malo</button>
      <h1>Estadisticas</h1>
       {/* Pasa las propiedades correctamente al componente Estadisticas */}
       <Estadisticas good={good} neutral={neutral} bad={bad} />


    </div>
  )
}

export default App
