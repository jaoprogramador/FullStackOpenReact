const Persons = ({ persons , deletePerson}) => (
    <ul>
      {persons.map((person, index) => (
        <li key={index}>{person.name} - {person.tlf} <button onClick={() => deletePerson(person.id, person.name)}>Delete</button></li>
        
      ))}
    </ul>
  )
  
  export default Persons
  