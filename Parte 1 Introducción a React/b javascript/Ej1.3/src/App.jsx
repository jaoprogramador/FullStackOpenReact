
const Header = (props) => {
  return (
    <div>
      <h3>greeting app created by <a href='https://github.com/jaoprogramador'>jaoprogramador</a> para el curso de {props.course}</h3>
      <br />
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Parte1 part={props.part1.name} exercises={props.part1.exercises} />
      <Parte2 part={props.part2.name} exercises={props.part2.exercises} />
      <Parte3 part={props.part3.name} exercises={props.part3.exercises} />
    </div>
  )
}
  const Total = (props) => {
    return (
      <div>
        <h4> <b> Total de ejercicios:</b> {props.exercises}</h4>
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
  /* 
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14*/
  
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

    
  

  return (
    <div>
      <Header course={course} />
      <Content 
      part1={part1} 
      part2={part2} 
      part3={part3} 

      />
      <Total exercises={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}


export default App
