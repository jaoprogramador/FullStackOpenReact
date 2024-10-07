import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', tlf: '040-123456', id: 1 },
    { name: 'Ada Lovelace', tlf: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', tlf: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', tlf: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newTlf, setNewTlf] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Manejador para agregar una nueva persona
  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, tlf: newTlf }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewTlf('')
    }
  }

  // Manejadores para cambiar el nombre, teléfono y término de búsqueda
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleTlfChange = (event) => setNewTlf(event.target.value)
  const handleSearchChange = (event) => setSearchTerm(event.target.value)

  // Filtrar las personas según el término de búsqueda
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      
      {/* Filtro de búsqueda */}
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h2>Add a new</h2>

      {/* Formulario para agregar nuevas personas */}
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newTlf={newTlf}
        handleTlfChange={handleTlfChange}
      />

      <h2>Numbers</h2>

      {/* Lista de personas filtradas */}
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
