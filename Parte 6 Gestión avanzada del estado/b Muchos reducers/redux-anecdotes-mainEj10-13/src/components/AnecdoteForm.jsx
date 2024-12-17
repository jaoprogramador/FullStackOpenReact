import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer'; // Cambia createAnecdote a addAnecdote
import { setNotificationWithTimeout } from '../reducers/notificationReducer'; // Importa la acción de notificación


const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const anecdoteRef = useRef();

  const addAnecdoteHandler = (event) => {
    event.preventDefault(); // Previene la acción por defecto del formulario
    const content = anecdoteRef.current.value.trim(); // Obtiene el contenido del input

    if (content) {
      dispatch(addAnecdote(content)); // Despacha la acción para crear la anécdota
      dispatch(setNotificationWithTimeout(`You added "${content}"`, 5)); // Muestra la notificación por 5 segundos
      anecdoteRef.current.value = ''; // Limpia el campo de entrada

    }
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdoteHandler}>
        <input type="text" ref={anecdoteRef} placeholder="Write anecdote" />
        <button type="submit">Add anecdote</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;




