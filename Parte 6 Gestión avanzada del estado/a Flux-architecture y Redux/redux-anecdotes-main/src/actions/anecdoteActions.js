export const getId = () => (100000 * Math.random()).toFixed(0);

export const createAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0,
    },
  };
};

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

  