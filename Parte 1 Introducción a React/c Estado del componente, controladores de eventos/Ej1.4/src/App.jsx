
const Hello = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>
        Aupa {props.name}, tienes {props.age} años
      </p>
      <p>Naciste en el año {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Juantxu'
  const age = 43

  return (
    <div>
      <h1>Bienvenido!!!</h1>
      <Hello name="Guillermo" age={26 + 10} />
      <Hello name={name} age={age} />
       
    </div>
  )
}


export default App
