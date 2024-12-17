import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer'; // Importa la acción de crear anécdota

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const anecdoteRef = useRef();

  const addAnecdote = (event) => {
    event.preventDefault(); // Previene la acción por defecto del formulario
    const content = anecdoteRef.current.value.trim(); // Obtiene el contenido del input

    if (content) {
      dispatch(createAnecdote(content)); // Despacha la acción para crear la anécdota
      anecdoteRef.current.value = ''; // Limpia el campo de entrada
    }
  };

  return (
    <form onSubmit={addAnecdote}>
      <input type="text" ref={anecdoteRef} placeholder="Escribe una anécdota" />
      <button type="submit">Agregar anécdota</button>
    </form>
  );
};

export default AnecdoteForm;



