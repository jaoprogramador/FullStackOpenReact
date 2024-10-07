import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
{/*
import axios from 'axios'
 Ejecutar con axios peticiones del servidor 

axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })


const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)
const footbar = response.data

ReactDOM.createRoot(document.getElementById('root')).render(
  <App  notes ={notes} />*/}
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App   />
)