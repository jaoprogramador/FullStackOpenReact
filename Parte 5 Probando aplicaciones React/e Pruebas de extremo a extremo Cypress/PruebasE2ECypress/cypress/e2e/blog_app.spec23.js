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
  
      // Iniciar sesión
      cy.get('input[name="username"]').type('testuser')
      cy.get('input[name="password"]').type('testpassword')
      cy.get('button[type="submit"]').click()
  
      // Verifica que el inicio de sesión fue exitoso
      cy.contains('Test User logged in').should('be.visible')
    })
  
    describe('When logged in', function () {
      beforeEach(function () {
        // Crear varios blogs
        cy.contains('New Blog').click()
        cy.get('input[name="title"]').type('Blog 1')
        cy.get('input[name="author"]').type('Author 1')
        cy.get('input[name="url"]').type('http://example.com')
        cy.get('button[type="submit"]').click()
        cy.contains('Blog 1 Author 1')
  
        cy.contains('New Blog').click()
        cy.get('input[name="title"]').type('Blog 2')
        cy.get('input[name="author"]').type('Author 2')
        cy.get('input[name="url"]').type('http://example.com')
        cy.get('button[type="submit"]').click()
        cy.contains('Blog 2 Author 2')
  
        cy.contains('New Blog').click()
        cy.get('input[name="title"]').type('Blog 3')
        cy.get('input[name="author"]').type('Author 3')
        cy.get('input[name="url"]').type('http://example.com')
        cy.get('button[type="submit"]').click()
        cy.contains('Blog 3 Author 3')
      })
  
      it('Blogs are ordered according to likes', function () {
        // Dar likes a los blogs para que tengan diferentes números de likes
  
        // Like Blog 2 tres veces
        cy.contains('Blog 2 Author 2').parent().find('button').contains('View').click()
        cy.contains('Blog 2 Author 2').parent().find('button').contains('Like').click()
        cy.wait(500)  // Esperar para que los likes se actualicen
        cy.contains('Blog 2 Author 2').parent().find('button').contains('Like').click()
        cy.wait(500)
        cy.contains('Blog 2 Author 2').parent().find('button').contains('Like').click()
  
        // Like Blog 1 una vez
        cy.contains('Blog 1 Author 1').parent().find('button').contains('View').click()
        cy.contains('Blog 1 Author 1').parent().find('button').contains('Like').click()
  
        // Like Blog 3 dos veces
        cy.contains('Blog 3 Author 3').parent().find('button').contains('View').click()
        cy.contains('Blog 3 Author 3').parent().find('button').contains('Like').click()
        cy.wait(500)
        cy.contains('Blog 3 Author 3').parent().find('button').contains('Like').click()
  
        // Verificar el orden de los blogs basados en los likes
        cy.get('.blog').eq(0).should('contain', 'Blog 2 Author 2')
        cy.get('.blog').eq(1).should('contain', 'Blog 3 Author 3')
        cy.get('.blog').eq(2).should('contain', 'Blog 1 Author 1')
      })
    })
  })
  