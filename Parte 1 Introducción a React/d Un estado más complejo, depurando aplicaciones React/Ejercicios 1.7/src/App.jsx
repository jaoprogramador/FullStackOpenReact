
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
    const total = props.good + props.neutral + props.bad
    const average = total > 0 ? (props.good - props.bad) / total : 0
    const positivePercentage = total > 0 ? (props.good / total) * 100 : 0

      return (
        <div>
          <h3>Buenas:</h3>{props.good}
          <h3>Neutras:</h3>{props.neutral}
          <h3>Malas:</h3>{props.bad}

          <h3>Total de comentarios: {total}</h3>
          <h3>Puntuación promedio: {average.toFixed(2)}</h3>
          <h3>Porcentaje de comentarios positivos: {positivePercentage.toFixed(2)}%</h3>
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
