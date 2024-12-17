import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/notes'

export const getNotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createNote = newNote =>
  axios.post(baseUrl, newNote).then(res => res.data)

export const updateNote = updatedNote =>
    axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then(res => res.data)



//export const getNotes = () =>
//  axios.get('http://localhost:3003/api/notes').then(res => res.data)