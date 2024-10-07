import { useState } from 'react'
import Note from './components/Note'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  // Manejador para actualizar el estado `newName` cuando se escribe en el input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Manejador para agregar una nueva persona a la agenda
  const addPerson = (event) => {
    event.preventDefault() // Prevenir el comportamiento por defecto del formulario (recargar la página)
    
    // Crear un nuevo objeto para la nueva persona
    const newPerson = { name: newName }

    // Actualizar el estado de `persons` añadiendo la nueva persona a la lista
    setPersons(persons.concat(newPerson))

    // Limpiar el input después de agregar la persona
    setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}


export default App