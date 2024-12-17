const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
/* 
   

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, 2)
})

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    assert.strictEqual(contents.includes('HTML is easy'), true)
})

  test.only('a valid note can be added ', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }
  
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/notes')
  
    const contents = response.body.map(r => r.content)
  
    assert.strictEqual(response.body.length, initialNotes.length + 1)
  
    assert(contents.includes('async/await simplifies making async calls'))
  })*/

  test('note without content is not added', async () => {
    const newNote = {
      important: true
    }
  
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
  
    const response = await api.get('/api/notes')
  
    assert.strictEqual(response.body.length, initialNotes.length)
  })

after(async () => {
  await mongoose.connection.close()
})