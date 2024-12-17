import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const setAnecdotes = (anecdotes) => ({
  type: 'SET_ANECDOTES',
  payload: anecdotes,
});


export const initializeAnecdotes = () => {
  return async (dispatch) => {
    console.log('anecdoteactiones.initializeAnecdotes::',baseUrl);
    const response = await axios.get(baseUrl);
    console.log('anecdoteactiones.initializeAnecdotes::',response);
    dispatch(setAnecdotes(response.data));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/${anecdote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...anecdote,
          votes: anecdote.votes + 1,
        }),
      });

      // Verificar si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('Failed to vote anecdote');
      }

      const updatedAnecdote = await response.json();
      
      dispatch({
        type: 'VOTE_ANECDOTE',
        payload: updatedAnecdote,
      });
    } catch (error) {
      console.error('Error voting anecdote:', error);
      // Manejar el error de manera apropiada (por ejemplo, mostrando una notificación)
    }
  };
};




export const createAnecdote = (content) => {
  return async (dispatch) => {
    const response = await axios.post(baseUrl, { content, votes: 0 });
    dispatch({
      type: 'ADD_ANECDOTE',
      payload: response.data,
    });
  };
};
