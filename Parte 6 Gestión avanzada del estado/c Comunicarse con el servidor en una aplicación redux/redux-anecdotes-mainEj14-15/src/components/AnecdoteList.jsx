import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { getFilteredAndSortedAnecdotes } from '../selectors'; // Usar selector memoizado
import { setNotificationWithTimeout } from '../reducers/notificationReducer'; // Importa la acción de notificación
import { initializeAnecdotes } from '../reducers/anecdoteReducer'; // Asegúrate de que la ruta es correcta



const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase();
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
  });
 // Usar el selector memoizado
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(initializeAnecdotes()); // Llama a la acción para inicializar anécdotas
  }, [dispatch]);

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id)); // Despacha la acción para votar
    dispatch(setNotificationWithTimeout(`You voted for "${anecdote.content}"`, 5)); // Muestra la notificación por 5 segundos
  };

 // Ordena las anécdotas por número de votos en orden descendente
 const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;


