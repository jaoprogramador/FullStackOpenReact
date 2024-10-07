const PersonForm = ({ addPerson, newName, handleNameChange, newTlf, handleTlfChange }) => (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Phone: <input value={newTlf} onChange={handleTlfChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
  
  export default PersonForm







