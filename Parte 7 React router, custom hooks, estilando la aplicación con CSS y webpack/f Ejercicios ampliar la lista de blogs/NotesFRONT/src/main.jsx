import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
{/*

  ReactDOM.createRoot(document.getElementById('root')).render(
    <App   />
  )

*/}
const root = ReactDOM.createRoot(document.getElementById('root')); // Usa createRoot en lugar de render

root.render(
  <Provider store={store}>
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider> 

  
);
