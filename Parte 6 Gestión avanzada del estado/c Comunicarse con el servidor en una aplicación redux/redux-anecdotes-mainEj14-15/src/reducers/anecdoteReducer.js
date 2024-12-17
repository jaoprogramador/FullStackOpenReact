
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:3003/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// Definir el slice para las anécdotas usando createSlice
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

// Acciones generadas automáticamente
export const { setAnecdotes, voteAnecdote, addAnecdote } = anecdoteSlice.actions;

// Thunk para obtener las anécdotas desde el backend
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await axios.get(baseUrl);
    dispatch(setAnecdotes(response.data));
  };
};

// Thunk para crear una nueva anécdota en el backend
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = {
      content: content,
      votes: 0,
    };
    const response = await axios.post(baseUrl, newAnecdote);
    dispatch(addAnecdote(response.data));

    //const newAnecdote = asObject(content);
    //const response = await axios.post(baseUrl, newAnecdote);
    //dispatch(addAnecdote(response.data));
  };
};

export default anecdoteSlice.reducer;


