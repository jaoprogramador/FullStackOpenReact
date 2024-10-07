const Filter = ({ searchTerm, handleSearchChange }) => (
    <div>
      Search: <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  )
  
  export default Filter
  