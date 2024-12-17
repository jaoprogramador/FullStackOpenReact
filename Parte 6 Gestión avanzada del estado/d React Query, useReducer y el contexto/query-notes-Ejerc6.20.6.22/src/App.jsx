import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './requests'
import { createAnecdote,getAnecdotes,updateAnecdoteVotes  } from './requests';
const App = () => {
  const queryClient = useQueryClient()
  //ANECDOTAS
  //===========
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
  });

  // Maneja el envío del formulario
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    // Validar longitud de la anécdota
    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, votes: 0 });
    } else {
      alert('La anécdota debe tener al menos 5 caracteres');
    }
  };


  //NOTAS
  //======
  const newNoteMutation = useMutation({
    mutationFn: createNote, 
    onSuccess: (newNote) => {
      //queryClient.invalidateQueries({ queryKey: ['notes'] })
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))

    },
  })
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries('notes')
    },
  })
  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important })
  }

  

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })

    console.log(content)
  }

  

  //const notes = []
  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    retry: false, // Evita reintentos automáticos
    refetchOnWindowFocus: false

    //ueryFn: () => axios.get('http://localhost:3003/api/notes').then(res => res.data)
  })
  const resultAnecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false, // Evita reintentos automáticos
    refetchOnWindowFocus: false

    //ueryFn: () => axios.get('http://localhost:3003/api/notes').then(res => res.data)
  })
  console.log(JSON.parse(JSON.stringify(result)))
  console.log(JSON.parse(JSON.stringify(resultAnecdotes)))
  
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };
  // Mutación para votar en una anécdota
  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdoteVotes,
    onSuccess: (updatedAnecdote) => {
      // Obtén la lista actual de anécdotas y actualízala con la anécdota votada
      const anecdotes = queryClient.getQueryData(['anecdotes']) || [];
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      );
    },
  });

  if (result.isLoading) {
    return <div>Loading notes...</div>;
  }

  if (resultAnecdotes.isLoading) {
    return <div>Loading anecdotes...</div>;
  }

  if (result.isError) {
    return <div>Note service no está disponible debido a problemas con el servidor</div>;
  }

  if (resultAnecdotes.isError) {
    return <div>Anecdote service no está disponible debido a problemas con el servidor</div>;
  }

  const notes = result.data || [];
  const anecdotes = resultAnecdotes.data || [];
  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}

      <h2>Anecdotes App</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" placeholder="Escribe una nueva anécdota..." />
        <button type="submit">Add Anecdote</button>
      </form>
      {/* Aquí se debe incluir el resto del código para listar y mostrar las anécdotas */}
      <ul>
      {anecdotes.map(anecdote => (
         <li key={anecdote.id}>
         {anecdote.content} (Votes: {anecdote.votes}){' '}
         <button onClick={() => handleVote(anecdote)}>Vote</button>
       </li>
      ))}
    </ul>
    </div>
  )
}

export default App