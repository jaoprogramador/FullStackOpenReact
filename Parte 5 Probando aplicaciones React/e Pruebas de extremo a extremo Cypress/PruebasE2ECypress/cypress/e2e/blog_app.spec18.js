describe('Blog app', function () {
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
  
    describe('Login', function () {
      it('succeeds with correct credentials', function () {
        // Intenta iniciar sesión con credenciales correctas
        cy.get('input[name="username"]').type('testuser')
        cy.get('input[name="password"]').type('testpassword')
        cy.get('button[type="submit"]').click()
  
        // Verifica que el usuario haya iniciado sesión correctamente
        cy.contains('Test User logged in').should('be.visible')
      })
  
      it('fails with wrong credentials', function () {
        // Intenta iniciar sesión con credenciales incorrectas
        cy.get('input[name="username"]').type('testuser')
        cy.get('input[name="password"]').type('wrongpassword')
        cy.get('button[type="submit"]').click()
  
        // Verifica que aparezca un mensaje de error y que el usuario no haya iniciado sesión
        cy.contains('Invalid username or password').should('be.visible')
  
        // Verifica que la notificación se muestre en rojo (clase 'error')
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })
  })
  