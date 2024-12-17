import React from 'react';
import useField from './useField'; // Asegúrate de que este hook esté importado correctamente
import useResource from './useResource'; // Importa el nuevo hook

const App = () => {
  const content = useField('text');
  const name = useField('text');
  const number = useField('text');

  // Usamos el hook useResource para gestionar notas y personas
  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.reset(); // Resetea el campo de contenido
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    name.reset(); // Resetea el campo de nombre
    number.reset(); // Resetea el campo de número
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input type={content.type} value={content.value} onChange={content.onChange} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input type={name.type} value={name.value} onChange={name.onChange} /> <br/>
        number <input type={number.type} value={number.value} onChange={number.onChange} />
        <button>create</button>
      </form>
      {persons.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
    </div>
  );
};

export default App;


