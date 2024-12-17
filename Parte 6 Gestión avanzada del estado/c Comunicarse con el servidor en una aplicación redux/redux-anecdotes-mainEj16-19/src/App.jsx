import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from'./components/Notification'

import { initializeAnecdotes } from './actions/anecdoteActions'; // Asegúrate de importar esto




const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes()); // Llama a la acción para inicializar anécdotas al montar el componente
  }, [dispatch]);


  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
