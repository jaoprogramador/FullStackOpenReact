import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../actions/anecdoteActions';
import { setNotificationWithTimeout } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes); // Obtener todas las anécdotas
  const filter = useSelector((state) => state.filter); // Obtener el filtro

  // Filtrar las anécdotas basadas en el filtro
  const filteredAnecdotes = anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote)); // Llama a la acción para votar
    dispatch(setNotificationWithTimeout(`You voted '${anecdote.content}'`, 5)); // 5 segundos para la notificación
  };

  return (
    <div>
      {filteredAnecdotes.length === 0 ? (
        <p>No anecdotes match the filter.</p>
      ) : (
        filteredAnecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes} votes
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AnecdoteList;




