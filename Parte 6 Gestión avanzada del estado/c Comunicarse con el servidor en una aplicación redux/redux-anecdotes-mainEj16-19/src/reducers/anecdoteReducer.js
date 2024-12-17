const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ANECDOTES':
      return action.payload;
    case 'VOTE_ANECDOTE': {
      const updatedAnecdotes = state.map(anecdote =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      );
      return updatedAnecdotes;

    }
    case 'ADD_ANECDOTE':
      return [...state, action.payload];
    default:
      return state;
  }
};


export default anecdoteReducer;




