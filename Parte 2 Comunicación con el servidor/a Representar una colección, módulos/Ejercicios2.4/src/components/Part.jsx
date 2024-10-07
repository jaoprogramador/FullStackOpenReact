

const Part = ({ part  }) => {
  
        // const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
       
        return (
          <li>
            {part.name} - {part.exercises} ejercicios
        </li>
        );
      };
      
  export default Part