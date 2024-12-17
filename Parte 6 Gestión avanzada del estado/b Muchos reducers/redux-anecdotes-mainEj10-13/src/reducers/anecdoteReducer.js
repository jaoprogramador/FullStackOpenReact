
import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
].map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    addAnecdote(state, action) {
      state.push({
        content: action.payload,
        id: getId(),
        votes: 0,
      });
    },
  },
});

export const { voteAnecdote, addAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
