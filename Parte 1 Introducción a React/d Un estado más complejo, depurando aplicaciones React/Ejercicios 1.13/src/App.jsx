
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is the same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  // Estado para la anécdota seleccionada
  const [selected, setSelected] = useState(0);
  // Estado para los votos de cada anécdota
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  // Función para seleccionar una anécdota aleatoria
  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  // Función para votar por la anécdota actual
  const voteAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1; // Incrementa el voto para la anécdota seleccionada
    setVotes(newVotes);
  };

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      <button onClick={getRandomAnecdote}>Next Anecdote</button>
      <button onClick={voteAnecdote}>Vote</button>
      <h2>Anecdote Voting Results</h2>
      <ul>
        {anecdotes.map((anecdote, index) => (
          <li key={index}>
            {anecdote} - {votes[index]} vote(s)
          </li>
        ))}
      </ul>
    </div>
  );
};


export default App
