
const Header = (props) => {
  return (
    <div>
      <h3>greeting app created by <a href='https://github.com/jaoprogramador'>jaoprogramador</a> para el curso de {props.course.name}</h3>
      <br />
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      {/*
      <!--Parte1 part={props.part1.name} exercises={props.part1.exercises} / -->
      <!--Parte2 part={props.part2.name} exercises={props.part2.exercises} / -->
      <!--Parte3 part={props.part3.name} exercises={props.part3.exercises} /-->
      */}
      {props.course.parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}
const Total = (props) => {
  const totalExercises = props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <h4>Total de ejercicios: {totalExercises}</h4>
    </div>
  )
}
 /*
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
*/
const Part = (props) => {
  return (
    <div>
      <h4>{props.name} - {props.exercises} ejercicios</h4>
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
  /*
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
*/
/*
const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
*/

const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}


    
  

  return (
    <div>
      <Header course={course} />
      <Content 
      course={course}
      

      />
      <Total course={course} />
    </div>
  )
}


export default App
