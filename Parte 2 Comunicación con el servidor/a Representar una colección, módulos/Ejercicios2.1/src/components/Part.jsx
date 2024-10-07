const Part = ({ course }) => {
    
       
      
        return (
          <div>
            <ul>
              {course.parts.map((part) => (
                <li key={part.id}>
                  {part.content} - {part.exercises} ejercicios
                </li>
              ))}
            </ul>
            
          </div>
        );
      };
      
  export default Part