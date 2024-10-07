import Part from "./Part"
const Content = ({ parts  }) => {
 // Verifica si las partes existen
 if (!parts) {
  return <p>No hay partes disponibles.</p>; // Manejo de error si partes no está definido
}

// Calcular el total de ejercicios
const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
     
        <div>
          <ul>
            {parts.map((part) => (
              <Part key={part.id} part={part} />
            ))}
          </ul>
          <p><strong>Total de ejercicios:</strong> {totalExercises}</p> {/* Mostrar el total */}
   
      </div>
      
      
    )
  }
  export default Content