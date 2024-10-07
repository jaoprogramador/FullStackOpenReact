
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
  // Componente Button para los botones de enviar comentarios
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

// Componente StatisticLine para mostrar una sola estadística
const StatisticLine = ({ text, value }) => {
  return ( 
    <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

  )
}
  const Estadisticas = (props) => {
    const total = props.good + props.neutral + props.bad
    const average = total > 0 ? (props.good - props.bad) / total : 0
    const positivePercentage = total > 0 ? (props.good / total) * 100 : 0
    console.log(total)
      if(total > 0 ){
        return (
          <div>
        {/* Usamos StatisticLine para cada estadística */}
        <table>
          <tbody>
          
            <StatisticLine text="Buenas" value={good} />
            <StatisticLine text="Neutras" value={neutral} />
            <StatisticLine text="Malas" value={bad} />
            <StatisticLine text="Total de comentarios" value={total} />
            <StatisticLine text="Puntuación promedio" value={average.toFixed(2)} />
            <StatisticLine text="Porcentaje de comentarios positivos" value={positivePercentage.toFixed(2) + "%"} />
         </tbody>
        </table>
        
      </div>
        )
      }else{
        return (
          <div>
            <h3>No han dado feedback del servicio</h3>
          </div>
        )
      }
      
    }

  return (
    <div>
      <h1>Opiniones del servicio UNICAFE</h1>
       {/* Usamos Button para los botones */}
       <Button handleClick={() => setGood(good + 1)} text="Bueno" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Regular" />
      <Button handleClick={() => setBad(bad + 1)} text="Malo" />
      <h1>Estadisticas</h1>
       {/* Pasa las propiedades correctamente al componente Estadisticas */}
       <Estadisticas good={good} neutral={neutral} bad={bad} />


    </div>
  )
}

export default App
