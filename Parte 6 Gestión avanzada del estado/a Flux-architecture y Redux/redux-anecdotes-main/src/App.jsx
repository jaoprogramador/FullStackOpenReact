import React from 'react';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  return (
    <div>
      <h1>¡Anecdotario!</h1>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;

