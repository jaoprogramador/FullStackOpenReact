import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../actions/anecdoteActions';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    
    // Despacha la acción asíncrona para crear la anécdota
    dispatch(createAnecdote(content));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="anecdote" />
      <button type="submit">Create Anecdote</button>
    </form>
  );
};

export default AnecdoteForm;





