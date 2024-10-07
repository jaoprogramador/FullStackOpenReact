//Componente Header
const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

// Componente Part
const Part = ({ part }) => {
  return (
    <li>
      {part.name} - {part.exercises} ejercicios
    </li>
  );
};

// Componente Content
const Content = ({ parts }) => {
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
  );
};

// Componente Course
const Course = ({ courses }) => {
  return (
    <div>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exportar el componente Course junto con sus subcomponentes
export default Course;