import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, createAnecdote, updateAnecdoteVotes } from './requests';
import Notification from './components/Notification';
import { NotificationProvider, useNotification } from './components/NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  // Mutación para crear una nueva anécdota
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote]);
      dispatch({ type: 'SHOW_NOTIFICATION', payload: `Anecdote '${newAnecdote.content}' created!` });
    },
    onError: (error) => {
      // Manejar el error y mostrar notificación
      dispatch({ type: 'SHOW_NOTIFICATION', payload: `Error: ${error.response?.data?.error || 'Something went wrong.'}` });
    },
  });

  // Mutación para votar en una anécdota
  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdoteVotes,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) || [];
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      );
      dispatch({ type: 'SHOW_NOTIFICATION', payload: `Anecdote '${updatedAnecdote.content}' voted!` });
    },
  });

  // Consulta para obtener las anécdotas
  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const handleCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, votes: 0 });
    } else {
      dispatch({ type: 'SHOW_NOTIFICATION', payload: 'Anecdote must be at least 5 characters long.' });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading anecdotes.</div>;

  return (
    <div>
      <h2>Anecdote App</h2>
      <Notification />
      <form onSubmit={handleCreate}>
        <input name="anecdote" placeholder="Write a new anecdote" />
        <button type="submit">Create</button>
      </form>
      <ul>
        {anecdotes.map(anecdote => (
          <li key={anecdote.id}>
            {anecdote.content} (votes: {anecdote.votes}){' '}
            <button onClick={() => handleVote(anecdote)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default () => (
  <NotificationProvider>
    <App />
  </NotificationProvider>
);
