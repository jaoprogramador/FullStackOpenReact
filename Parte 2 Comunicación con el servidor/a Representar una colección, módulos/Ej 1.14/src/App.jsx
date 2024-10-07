
import { useState } from 'react'
import Note from './components/Note'

 {/* PASO7
const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}
*/}
const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* PASO1
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
        */}
        {/* PASO2

        {notes.map(note => <li>{note.content}</li>)}
         */}
         {/* PASO3 pero nos da un error :
         Warning: Each child in a list should have a unique "key" prop.
         
        {notes.map(note => 
          <li>
            {note.content}
          </li>
        )}
          */}
          {/* PASO4
          
          {notes.map(note => 
          <li key={note.id}>
            {note.content}
          </li>
          

        )}*/}
         {/* PASO5
         
        {notes.map((note, i) => 
          <li key={i}>
            {note.content}
          </li>
        )}
          )}*/}


         {/* PASO6
         )}*/}
         {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
          {/* PASO5
         )}*/}
          {/* PASO5
         )}*/}
          {/* PASO5
         )}*/}
          {/* PASO5
         )}*/}

      </ul>
    </div>
  )
}


export default App
