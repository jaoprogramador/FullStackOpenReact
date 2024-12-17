describe('Note app', function() {
  beforeEach(function() {

    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'secret'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  {/*
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:5173')
  })*/}
  //it('front page can be opened', function() {
  //  cy.visit('http://localhost:5173')
    //cy.contains('Notes')
  //  cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  //})
  it('front page contains random text', function() {
    cy.visit('http://localhost:5173')
    cy.contains('wtf is this app?')
  })
  //prueba intente iniciar sesión en nuestra aplicación. Suponemos que nuestro backend contiene un usuario con el nombre de usuario mluukkai y la contraseña salainen.
  it('login form can be opened', function() {
    cy.visit('http://localhost:5173')
    cy.contains('log in').click()
  })
  it('user can login', function () {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })  

  it('a new note can be created', function() {
    cy.contains('new note').click()
    cy.get('input').type('a note created by cypress')
    cy.contains('save').click()
    cy.contains('a note created by cypress')
  })
  it('login fails with wrong password', function() {
    cy.contains('log in').click()
  cy.get('#username').type('mluukkai')
  cy.get('#password').type('wrong')
  cy.get('#login-button').click()

  cy.get('.error')
    .should('contain', 'wrong credentials')
    .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')

  cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
})
describe('when logged in', function() {
  beforeEach(function() {
    cy.contains('log in').click()
    cy.get('input:first').type('mluukkai')
    cy.get('input:last').type('salainen')
    cy.get('#login-button').click()
  })

  it('a new note can be created', function() {
    // ... 
  })

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'mluukkai', password: 'salainen'
    }).then(response => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:5173')
    })
  })

  it('a new note can be created', function() {
    // ...
  })

 
})
//Creemos un nuevo comando personalizado para crear una nueva nota. El comando creará una nueva nota con una solicitud HTTP POST
Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    url: 'http://localhost:3001/api/notes',
    method: 'POST',
    body: { content, important },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
    }
  })

  cy.visit('http://localhost:5173')
})

})