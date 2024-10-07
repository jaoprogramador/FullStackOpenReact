import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', tlf: '040-123456', id: 1 },
    { name: 'Ada Lovelace', tlf: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', tlf: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', tlf: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newTlf, setNewTlf] = useState('')
  // Estado para controlar el campo de búsqueda
  const [searchTerm, setSearchTerm] = useState('')

  // Manejador para actualizar el estado `newName` cuando se escribe en el input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleTlfChange = (event) => {
    setNewTlf(event.target.value)
  }

   // Manejador para actualizar el estado `searchTerm` cuando se escribe en el campo de búsqueda
   const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }
  // Manejador para agregar una nueva persona a la agenda
  const addPerson = (event) => {
    event.preventDefault() // Prevenir el comportamiento por defecto del formulario (recargar la página)
    
    // Verificar si el nombre ya existe en el array persons
    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      // Si el nombre no existe, creamos un nuevo objeto persona
      const newPerson = { name: newName, tlf: newTlf }

      // Actualizar el estado de `persons` añadiendo la nueva persona a la lista
      setPersons(persons.concat(newPerson))

      // Limpiar el input después de agregar la persona
      setNewName('')
      setNewTlf('')
    }
  }
  //Filtrar las personas según el término de búsqueda
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div>
      <h2>Phonebook</h2>
      {/* Campo de búsqueda */}
      <div>
        Search: <input value={searchTerm} onChange={handleSearchChange} />
      </div>
      <h2>add a new </h2>

      {/* Formulario para agregar nuevas personas */}
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          
        </div>
        <div>
          TLF number: <input value={newTlf} onChange={handleTlfChange} />
          
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person, index) => (
          <li key={index}>{person.name} - {person.tlf}</li>
        ))}
      </ul>
    </div>
  )
}


export default App