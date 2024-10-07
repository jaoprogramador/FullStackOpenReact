

const Part = ({ course }) => {
  const total = course.parts.reduce((sum, part) => {
    console.log('Calculando total', sum, part);
    return sum + part.exercises; // Suma el número de ejercicios de cada parte
  }, 0); // Inicia el acumulador en 0

    
        // Función para calcular el total de ejercicios
        // const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
       
        return (
          <div>
            <ul>
              {course.parts.map((part) => (
                <li key={part.id}>
                  {part.content} - {part.exercises} ejercicios
                </li>
              ))}
            </ul>
            <p><strong>Total de ejercicios:</strong> {total}</p>
          </div>
        );
      };
      
  export default Part