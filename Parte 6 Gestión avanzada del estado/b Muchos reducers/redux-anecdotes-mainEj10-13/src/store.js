import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './reducers/anecdoteReducer';  // Importa el nuevo reducer
import filterReducer from './reducers/filterReducer';     // Importa el filter reducer
import notificationReducer from './reducers/notificationReducer'; 
// Crear el store usando configureStore
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,  // Añadir anecdoteReducer aquí
    filter: filterReducer,
    notification: notificationReducer
  },
  devTools: process.env.NODE_ENV !== 'production',  // Habilitar Redux DevTools en desarrollo
});

export default store;

