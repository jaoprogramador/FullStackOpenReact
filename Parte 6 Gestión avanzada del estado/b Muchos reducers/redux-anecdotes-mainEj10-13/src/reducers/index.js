import { combineReducers } from 'redux';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';

// Combinar los reducers en un rootReducer
const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

export default rootReducer;
