const Part = ({ course }) => {
    
        // Función para calcular el total de ejercicios
        const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
      
        return (
          <div>
            <ul>
              {course.parts.map((part) => (
                <li key={part.id}>
                  {part.content} - {part.exercises} ejercicios
                </li>
              ))}
            </ul>
            <p><strong>Total de ejercicios:</strong> {totalExercises}</p>
          </div>
        );
      };
      
  export default Part