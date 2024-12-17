import { createSelector } from 'reselect';

// Selector para obtener las anécdotas del estado
const getAnecdotes = (state) => state.anecdotes;

// Selector para obtener el filtro del estado
const getFilter = (state) => state.filter.toLowerCase();

// Selector memoizado que aplica el filtro y ordena las anécdotas
export const getFilteredAndSortedAnecdotes = createSelector(
  [getAnecdotes, getFilter],
  (anecdotes, filter) => {
    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  }
);

