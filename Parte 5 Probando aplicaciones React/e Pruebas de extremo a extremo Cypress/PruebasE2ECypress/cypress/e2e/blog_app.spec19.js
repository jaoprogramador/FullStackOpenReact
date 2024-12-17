describe('Blog app', function() {
    beforeEach(function () {
      // Vacía la base de datos antes de cada prueba
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
  
      // Crea un nuevo usuario para las pruebas
      const user = {
        username: 'testuser',
        password: 'testpassword',
        name: 'Test User'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
  
      // Visita la página de inicio de la aplicación
      cy.visit('http://localhost:5173')
    })
  
    it('Login form is shown', function () {
      cy.contains('Login').should('be.visible')
    })
  
    describe('When logged in', function () {
      beforeEach(function () {
        // Iniciar sesión antes de cada prueba
        cy.get('input[name="username"]').type('testuser')
        cy.get('input[name="password"]').type('testpassword')
        cy.get('button[type="submit"]').click()
  
        // Verifica que el inicio de sesión fue exitoso
        cy.contains('Test User logged in').should('be.visible')
      })
  
      it('A blog can be created', function () {
        // Haz clic en el botón para añadir un nuevo blog
        cy.contains('New Blog').click()
  
        // Rellena el formulario de nuevo blog
        cy.get('input[name="title"]').type('My Cypress Blog')
        cy.get('input[name="author"]').type('Cypress Tester')
        cy.get('input[name="url"]').type('http://cypress.io')
  
        // Envía el formulario
        cy.get('button[type="submit"]').click()
  
        // Verifica que el nuevo blog ha sido añadido a la lista
        cy.contains('My Cypress Blog Cypress Tester').should('be.visible')
      })
    })
  })
  