
const Header = (props) => {
  return (
    <div>
      <h3>greeting app created by <a href='https://github.com/jaoprogramador'>jaoprogramador</a> para el curso de {props.course}</h3>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Parte1 part={props.part1} exercises={props.exercises1} />
      <Parte2 part={props.part2} exercises={props.exercises2} />
      <Parte3 part={props.part3} exercises={props.exercises3} />
    </div>
  )
}
  const Total = (props) => {
    return (
      <div>
        <h4>{props.exercises}</h4>
      </div>
    )
}
const Parte1 = (props) => {
  return (
    <div>
       <h4>{props.part} - {props.exercises} ejercicios</h4>
    </div>
  )
}
const Parte2 = (props) => {
  return (
    <div>
       <h4>{props.part} - {props.exercises} ejercicios</h4>
    </div>
  )
}
const Parte3 = (props) => {
  return (
    <div>
      <h4>{props.part} - {props.exercises} ejercicios</h4>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  
    
  

  return (
    <div>
      <Header course={course} />
      <Content 
      part1={part1} exercises1={exercises1}
      part2={part2} exercises2={exercises2}
      part3={part3} exercises3={exercises3}

      />
      <Total exercises={exercises1+exercises2+exercises3} />
    </div>
  )
}


export default App
