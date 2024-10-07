const Persons = ({ persons }) => (
    <ul>
      {persons.map((person, index) => (
        <li key={index}>{person.name} - {person.tlf}</li>
      ))}
    </ul>
  )
  
  export default Persons
  