import { useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService';
import Notification from './components/Notification'
import './index.css'


const App = () => {
  {/*
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', tlf: '040-123456', id: 1 },
    { name: 'Ada Lovelace', tlf: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', tlf: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', tlf: '39-23-6423122', id: 4 }
  ])*/}
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(''); // Para controlar el tipo de notificación
  const [persons, setPersons] = useState([
  ])
  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        console.log('Datos recibidos:', initialPerson); 
        setPersons(Array.isArray(initialPerson) ? initialPerson : []); // Asegura que sea un array
        
      })  
      .catch(error => {
        console.error('Error al obtener las personas:', error);
      });
      
  }, [])

  const toggleImportanceOf = id => {
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, important: !person.important }

    personService
      .update(id, changedPerson)
      .then(response => {
        setPersons(persons.map(note => person.id !== id ? person : response.data))
      })
  }

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Do you really want to delete ${name}?`);
    
    if (confirmDelete) {
      personService
        .deletePerson(id)
        .then(() => {
          // Filtra la persona eliminada del estado
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Error al eliminar la persona:', error);
          alert(`The person '${name}' was already deleted from the server.`);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };

  const [newName, setNewName] = useState('')
  const [newTlf, setNewTlf] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Función para agregar o actualizar una persona
  const addPerson = (event) => {
    event.preventDefault();
    
    const existingPerson = persons.find(person => person.name === newName);
  
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook, replace the old number with a new one?`
      );
  
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, tlf: newTlf };
  
        personService
          .update(existingPerson.id, updatedPerson)  // Usa el campo _id de MongoDB
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ));
  
            // Mostrar mensaje de éxito
            setErrorMessage(`Updated ${newName}'s number successfully`);
            setErrorType('success');
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
  
            setNewName('');
            setNewTlf('');
          })
          .catch(error => {
            // Mostrar mensaje de error si la persona ya no existe
            setErrorMessage(`Information of ${newName} has already been removed from server`);
            setErrorType('error');
            setPersons(persons.filter(p => p.id !== existingPerson.id));  // Remover la persona del estado
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = { name: newName, tlf: newTlf };
  
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setErrorMessage(`Added ${newName} successfully`);
          setErrorType('success');
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
  
          setNewName('');
          setNewTlf('');
        })
        .catch(error => {
          // Manejo de errores en caso de validación fallida
          if (error.response && error.response.data && error.response.data.error) {
            setErrorMessage(`Phone validation failed: ${error.response.data.error}`);
          } else {
            setErrorMessage('An error occurred while adding the person');
          }
          setErrorType('error');
        
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };
  

  // Manejadores para cambiar el nombre, teléfono y término de búsqueda
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleTlfChange = (event) => setNewTlf(event.target.value)
  const handleSearchChange = (event) => setSearchTerm(event.target.value)

  // Filtrar las personas según el término de búsqueda
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  console.log(filteredPersons);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={errorType} />
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
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
