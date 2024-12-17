//1
describe('Blog App', () => {
    beforeEach(() => {
      // Asegúrate de que la aplicación esté corriendo en localhost:3000 (ajústalo a la URL correcta de tu aplicación)
      cy.visit('http://localhost:3000');
    });
  
    it('se asegura de que el formulario de login se muestra por defecto', () => {
      cy.contains('Login').should('be.visible');
    });
  
    it('login falla con credenciales incorrectas', () => {
      cy.get('input[name="username"]').type('usuarioincorrecto');
      cy.get('input[name="password"]').type('contraseñaincorrecta');
      cy.get('button[type="submit"]').click();
  
      cy.contains('Invalid username or password').should('be.visible');
    });
  
    it('login funciona con credenciales correctas', () => {
      cy.get('input[name="username"]').type('usuario_correcto');
      cy.get('input[name="password"]').type('contraseña_correcta');
      cy.get('button[type="submit"]').click();
  
      cy.contains('Welcome, usuario_correcto').should('be.visible');
    });
  
    describe('Cuando el usuario ha iniciado sesión', () => {
      beforeEach(() => {
        // Simulamos el login antes de cada test dentro de este bloque
        cy.get('input[name="username"]').type('usuario_correcto');
        cy.get('input[name="password"]').type('contraseña_correcta');
        cy.get('button[type="submit"]').click();
      });
  
      it('el usuario puede crear un nuevo blog', () => {
        cy.contains('New Blog').click();
        cy.get('input[name="title"]').type('Nuevo Blog Cypress');
        cy.get('input[name="author"]').type('Autor Cypress');
        cy.get('input[name="url"]').type('http://nuevoblog.com');
        cy.get('button[type="submit"]').click();
  
        cy.contains('Nuevo Blog Cypress').should('be.visible');
      });
  
      it('el usuario puede eliminar un blog que ha creado', () => {
        cy.contains('Nuevo Blog Cypress').parent().find('button').contains('Delete').click();
        cy.on('window:confirm', () => true); // Aceptar el diálogo de confirmación de eliminación
        cy.contains('Nuevo Blog Cypress').should('not.exist');
      });
    });
  });
  
  
  
  