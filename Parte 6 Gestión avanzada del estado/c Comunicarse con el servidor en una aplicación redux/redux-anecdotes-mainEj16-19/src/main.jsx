import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//import { configureStore } from '@reduxjs/toolkit'
import App from './App';
import rootReducer from './reducers'; // Importa rootReducer correctamente
import store from './store'; // Importa el store desde store.js

{/*
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})*/}

console.log(store.getState())


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
