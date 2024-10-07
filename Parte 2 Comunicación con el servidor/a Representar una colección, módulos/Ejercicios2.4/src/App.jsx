
import { useState } from 'react'
import Course from './components/Course'
{/*import Note from './components/Note'*/}

 {/* PASO7
const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}
*/}
const App = () => {
  {/* const { notes } = props*/}
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      
         <Course courses={courses} />
    </div>
  )
}


export default App
