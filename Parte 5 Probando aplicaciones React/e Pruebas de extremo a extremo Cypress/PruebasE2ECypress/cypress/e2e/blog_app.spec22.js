describe('Blog app', function () {
    beforeEach(function () {
      // Vacía la base de datos antes de cada prueba
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
  
      // Crea dos usuarios: uno para crear el blog y otro que intentará eliminarlo
      const user1 = {
        username: 'creator',
        password: 'password1',
        name: 'Blog Creator'
      }
      const user2 = {
        username: 'otheruser',
        password: 'password2',
        name: 'Other User'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user1)
      cy.request('POST', 'http://localhost:3003/api/users', user2)
  
      // Visita la página de inicio de la aplicación
      cy.visit('http://localhost:5173')
    })
  
    it('Login form is shown', function () {
      cy.contains('Login').should('be.visible')
    })
  
    describe('When logged in', function () {
      beforeEach(function () {
        // Iniciar sesión con el primer usuario (creator)
        cy.get('input[name="username"]').type('creator')
        cy.get('input[name="password"]').type('password1')
        cy.get('button[type="submit"]').click()
  
        // Verifica que el inicio de sesión fue exitoso
        cy.contains('Blog Creator logged in').should('be.visible')
  
        // Crear un nuevo blog
        cy.contains('New Blog').click()
        cy.get('input[name="title"]').type('Blog created by Creator')
        cy.get('input[name="author"]').type('Author 1')
        cy.get('input[name="url"]').type('http://example.com')
        cy.get('button[type="submit"]').click()
  
        // Verifica que el nuevo blog ha sido añadido a la lista
        cy.contains('Blog created by Creator Author 1')
  
        // Cierra sesión del primer usuario
        cy.contains('Logout').click()
      })
  
      it('Only the creator can see the delete button', function () {
        // Iniciar sesión con el segundo usuario (otheruser)
        cy.get('input[name="username"]').type('otheruser')
        cy.get('input[name="password"]').type('password2')
        cy.get('button[type="submit"]').click()
  
        // Verifica que el segundo usuario ha iniciado sesión
        cy.contains('Other User logged in').should('be.visible')
  
        // Haz clic en el botón "View" o "Show" para ver los detalles del blog
        cy.contains('Blog created by Creator Author 1').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
  
        // Verifica que el segundo usuario no puede ver el botón de eliminar
        cy.contains('delete').should('not.exist')
  
        // Cierra sesión del segundo usuario
        cy.contains('Logout').click()
  
        // Iniciar sesión de nuevo con el creador del blog (creator)
        cy.get('input[name="username"]').type('creator')
        cy.get('input[name="password"]').type('password1')
        cy.get('button[type="submit"]').click()
  
        // Haz clic en el botón "View" o "Show" para ver los detalles del blog
        cy.contains('Blog created by Creator Author 1').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
  
        // Verifica que el creador puede ver el botón de eliminar
        cy.contains('delete').should('be.visible')
      })
    })
  })
  