import { combineReducers } from 'redux';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';
import notificationReducer from './notificationReducer';
// Combinar los reducers en un rootReducer
const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer,
});


export default rootReducer;
