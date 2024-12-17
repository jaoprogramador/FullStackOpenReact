//2
describe('Blog app', function() {
    beforeEach(function() {
      // Cambia la URL a la que uses para tu front-end
      cy.visit('http://localhost:5173')  
    })
  
    it('Login form is shown', function() {
      // Verifica que el formulario de inicio de sesión esté visible
      cy.contains('Login').should('be.visible')
      cy.get('input[name="username"]').should('be.visible')
      cy.get('input[name="password"]').should('be.visible')
    })
  })