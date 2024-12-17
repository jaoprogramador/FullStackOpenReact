Ejercicio 9.14.
9.14.
Crea una nueva aplicación Vite con TypeScript.

Este ejercicio es similar al que ya hiciste en la Parte 1 del curso, pero con TypeScript y algunos ajustes adicionales. Comienza modificando el contenido de main.tsx a lo siguiente:

import ReactDOM from 'react-dom/client'
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)copy
y App.tsx:

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <h1>{courseName}</h1>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises {totalExercises}
      </p>
    </div>
  );
};

export default App;copy
y elimina los archivos innecesarios.

Toda la aplicación ahora está en un componente. Esto no es lo que queremos, así que refactoriza el código para que conste de tres componentes: Header, Content y Total. Todos los datos aún se mantienen en el componente App, que pasa todos los datos necesarios a cada componente como props. ¡Asegúrate de agregar declaraciones de tipo para los props de cada componente!

El componente Header debe encargarse de mostrar el nombre del curso. Content debe mostrar los nombres de las diferentes partes y la cantidad de ejercicios en cada parte, y Total debe mostrar la suma total de ejercicios en todas las partes.

El componente App debería verse algo así:

const App = () => {
  // const-declarations

  return (
    <div>
      <Header name={courseName} />
      <Content ... />
      <Total ... />
    </div>
  )
};

src/
|-- App.tsx
|-- components/
|   |-- Header.tsx
|   |-- Content.tsx
|   |-- Total.tsx
|-- main.tsx
|-- index.css

Ejercicio 9.15.
9.15.
Continuemos extendiendo la aplicación creada en el ejercicio 9.14. Primero, agrega la información del tipo y reemplaza la variable courseParts con la del ejemplo siguiente.

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
];copy
Ahora sabemos que ambas interfaces CoursePartBasic y CoursePartBackground comparten no solo los atributos base, sino también un atributo llamado description, que es un string en ambas interfaces.

Tu primera tarea es declarar una nueva interface, que incluya el atributo description y extienda la interfaz de CoursePartBase. Luego, modifica el código para que puedas eliminar el atributo description de CoursePartBasic y de CoursePartBackground sin obtener ningún error.

A continuación, crea un componente Part que muestre todos los atributos de cada tipo de parte del curso. ¡Utiliza un switch case basado en verificación de tipos exhaustiva! Utiliza el nuevo componente en el componente Content.

Por último, agrega otra parte del curso con los siguientes atributos: name, exerciseCount, description y requirements, el último siendo un array de strings. Los objetos de este tipo se ven de la siguiente manera:

{
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special"
}copy
Luego agrega esa interfaz a la unión de tipos CoursePart y agrega los datos correspondientes a la variable courseParts. Ahora, si no has modificado tu componente Content correctamente, deberías recibir un error, porque aún no has agregado soporte para el cuarto tipo de parte del curso. Realiza los cambios necesarios a Content, para que todos los atributos de la nueva parte del curso también se muestren y el compilador no produzca ningún error.

El resultado podría verse así:

