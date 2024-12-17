import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/notes'
const baseUrlAnecdotas = 'http://localhost:3001/anecdotes';
//NOTAS
//=======
export const getNotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createNote = newNote =>
  axios.post(baseUrl, newNote).then(res => res.data)

export const updateNote = updatedNote =>
    axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then(res => res.data)

//ANECDOTAS
//==========
export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data);
export const getAnecdotes = () =>
  axios.get(baseUrlAnecdotas).then(res => res.data)
export const updateAnecdoteVotes = updatedAnecdote =>
  axios.put(`${baseUrlAnecdotas}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data);

//export const getNotes = () =>
//  axios.get('http://localhost:3003/api/notes').then(res => res.data)