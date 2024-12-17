const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
    {/*5.17
  beforeEach(async ({ page }) => {
    // Navega a la aplicación en localhost
    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    // Verifica que el formulario de inicio de sesión está presente
    await page.waitForSelector('form'); // Espera hasta que el formulario sea visible
    await page.waitForSelector('form', { timeout: 10000 }); // Espera hasta 10 segundos
    await page.screenshot({ path: 'screenshot.png' });
    await page.click('#showLoginButton'); // Simula el clic para mostrar el formulario
    
    
    const loginForm = await page.locator('form');

  });*/}
  {/*5.18
  describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
      // Vaciar la base de datos utilizando una API de backend
      await request.post('http://localhost:3001/api/testing/reset');
  
      // Crear un nuevo usuario en la base de datos
      await request.post('http://localhost:3001/api/users', {
        data: {
          username: 'testuser',
          name: 'Test User',
          password: 'password123'
        }
      });
  
      // Navegar a la aplicación
      await page.goto('http://localhost:5173');
    });
  
    // Prueba para verificar que el formulario de inicio de sesión se muestra
    test('Login form is shown', async ({ page }) => {
      const loginForm = await page.locator('form');
      expect(loginForm).toBeVisible();
    });
  
    describe('Login', () => {
      // Prueba de inicio de sesión con credenciales correctas
      test('succeeds with correct credentials', async ({ page }) => {
        // Introducir el nombre de usuario y contraseña
        await page.fill('input[name="username"]', 'testuser');
        await page.fill('input[name="password"]', 'password123');
        
        // Hacer clic en el botón de inicio de sesión
        await page.click('button[type="submit"]');
  
        // Verificar que el inicio de sesión fue exitoso (suponiendo que redirige a la lista de blogs)
        const userGreeting = await page.locator('text=Test User logged in');
        expect(userGreeting).toBeVisible();
      });
  
      // Prueba de inicio de sesión con credenciales incorrectas
      test('fails with wrong credentials', async ({ page }) => {
        // Introducir un nombre de usuario y/o contraseña incorrectos
        await page.fill('input[name="username"]', 'testuser');
        await page.fill('input[name="password"]', 'wrongpassword');
        
        // Hacer clic en el botón de inicio de sesión
        await page.click('button[type="submit"]');
  
        // Verificar que el inicio de sesión falló (suponiendo que aparece un mensaje de error)
        const errorMessage = await page.locator('text=wrong username or password');
        expect(errorMessage).toBeVisible();
        
        // Verificar que el formulario de inicio de sesión sigue visible
        const loginForm = await page.locator('form');
        expect(loginForm).toBeVisible();
      });
    });
    */}
    {/*5.19
    describe('Blog app', () => {
        beforeEach(async ({ page, request }) => {
          // Vaciar la base de datos y crear un usuario
          await request.post('http://localhost:3001/api/testing/reset');
          
          await request.post('http://localhost:3001/api/users', {
            data: {
              username: 'testuser',
              name: 'Test User',
              password: 'password123'
            }
          });
      
          // Navegar a la aplicación
          await page.goto('http://localhost:5173');
        });
      
        describe('When logged in', () => {
          beforeEach(async ({ page }) => {
            // Iniciar sesión con el usuario creado
            await page.fill('input[name="username"]', 'testuser');
            await page.fill('input[name="password"]', 'password123');
            await page.click('button[type="submit"]');
      
            // Verificar que el inicio de sesión fue exitoso
            const userGreeting = await page.locator('text=Test User logged in');
            expect(userGreeting).toBeVisible();
          });
      
          test('a new blog can be created', async ({ page }) => {
            // Abrir el formulario para crear un nuevo blog
            await page.click('button:has-text("New Blog")'); // Ajustar según tu botón
            await page.fill('input[name="title"]', 'My new blog');
            await page.fill('input[name="author"]', 'John Doe');
            await page.fill('input[name="url"]', 'http://newblog.com');
      
            // Enviar el formulario
            await page.click('button:has-text("Create")'); // Ajusta si el botón es diferente
      
            // Verificar que el blog aparece en la lista de blogs
            const blogTitle = await page.locator('text=My new blog');
            expect(blogTitle).toBeVisible();
          });
        });
        });
    */}
    {/*5.20*/}
     {/*
    describe('Blog app', () => {
        beforeEach(async ({ page, request }) => {
          // Vaciar la base de datos y crear un usuario
          await request.post('http://localhost:3001/api/testing/reset');
          
          await request.post('http://localhost:3001/api/users', {
            data: {
              username: 'testuser',
              name: 'Test User',
              password: 'password123'
            }
          });
      
          // Navegar a la aplicación
          await page.goto('http://localhost:5173');
        });
      
        describe('When logged in', () => {
          beforeEach(async ({ page }) => {
            // Iniciar sesión con el usuario creado
            await page.fill('input[name="username"]', 'testuser');
            await page.fill('input[name="password"]', 'password123');
            await page.click('button[type="submit"]');
      
            // Verificar que el inicio de sesión fue exitoso
            const userGreeting = await page.locator('text=Test User logged in');
            expect(userGreeting).toBeVisible();
      
            // Crear un nuevo blog para luego editarlo
            await page.click('button:has-text("New Blog")'); 
            await page.fill('input[name="title"]', 'My new blog');
            await page.fill('input[name="author"]', 'John Doe');
            await page.fill('input[name="url"]', 'http://newblog.com');
            await page.click('button:has-text("Create")');
      
            // Verificar que el blog fue creado
            const blogTitle = await page.locator('text=My new blog');
            expect(blogTitle).toBeVisible();
          });
      
          test('a blog can be edited', async ({ page }) => {
            // Asume que existe un botón o enlace para editar el blog
            await page.click('button:has-text("Edit")'); // Ajustar según el selector de edición
      
            // Editar los campos del blog
            await page.fill('input[name="title"]', 'My edited blog');
            await page.fill('input[name="author"]', 'Jane Doe');
            await page.fill('input[name="url"]', 'http://editedblog.com');
      
            // Enviar el formulario de edición
            await page.click('button:has-text("Save")'); // Ajustar según el botón de guardar
      
            // Verificar que el blog se haya actualizado correctamente
            const updatedBlogTitle = await page.locator('text=My edited blog');
            const updatedBlogAuthor = await page.locator('text=Jane Doe');
      
            expect(updatedBlogTitle).toBeVisible();
            expect(updatedBlogAuthor).toBeVisible();
          });
        });1*/}
        {/*5.21
        describe('Blog app', () => {
            beforeEach(async ({ page, request }) => {
              // Vaciar la base de datos y crear un usuario
              await request.post('http://localhost:3001/api/testing/reset');
          
              await request.post('http://localhost:3001/api/users', {
                data: {
                  username: 'creatoruser',
                  name: 'Creator User',
                  password: 'password123'
                }
              });
          
              // Navegar a la aplicación
              await page.goto('http://localhost:5173');
            });
          
            describe('When logged in', () => {
              beforeEach(async ({ page }) => {
                // Iniciar sesión con el usuario creador
                await page.fill('input[name="username"]', 'creatoruser');
                await page.fill('input[name="password"]', 'password123');
                await page.click('button[type="submit"]');
          
                // Verificar que el inicio de sesión fue exitoso
                const userGreeting = await page.locator('text=Creator User logged in');
                expect(userGreeting).toBeVisible();
          
                // Crear un nuevo blog
                await page.click('button:has-text("New Blog")');
                await page.fill('input[name="title"]', 'Blog to be deleted');
                await page.fill('input[name="author"]', 'Creator User');
                await page.fill('input[name="url"]', 'http://tobedeleted.com');
                await page.click('button:has-text("Create")');
          
                // Verificar que el blog fue creado
                const blogTitle = await page.locator('text=Blog to be deleted');
                expect(blogTitle).toBeVisible();
              });
          
              test('creator can delete the blog', async ({ page }) => {
                // Interceptar el diálogo de confirmación de eliminación
                page.once('dialog', async dialog => {
                  expect(dialog.type()).toBe('confirm');
                  expect(dialog.message()).toBe('Are you sure you want to delete this blog?');
                  await dialog.accept(); // Aceptar el diálogo
                });
          
                // Hacer clic en el botón de eliminar
                await page.click('button:has-text("Delete")');
          
                // Verificar que el blog ha sido eliminado
                const blogTitle = await page.locator('text=Blog to be deleted');
                expect(blogTitle).not.toBeVisible();
              });
            });
          });*/}
           {/*5.22
           describe('Blog app', () => {
            beforeEach(async ({ page, request }) => {
              // Vaciar la base de datos y crear dos usuarios
              await request.post('http://localhost:3001/api/testing/reset');
          
              // Crear el primer usuario (creador del blog)
              await request.post('http://localhost:3001/api/users', {
                data: {
                  username: 'creatoruser',
                  name: 'Creator User',
                  password: 'password123'
                }
              });
          
              // Crear el segundo usuario (no creador)
              await request.post('http://localhost:3001/api/users', {
                data: {
                  username: 'seconduser',
                  name: 'Second User',
                  password: 'password123'
                }
              });
          
              // Navegar a la aplicación
              await page.goto('http://localhost:5173');
            });
          
            describe('When logged in as blog creator', () => {
              beforeEach(async ({ page }) => {
                // Iniciar sesión con el usuario creador
                await page.fill('input[name="username"]', 'creatoruser');
                await page.fill('input[name="password"]', 'password123');
                await page.click('button[type="submit"]');
          
                // Verificar que el inicio de sesión fue exitoso
                const userGreeting = await page.locator('text=Creator User logged in');
                expect(userGreeting).toBeVisible();
          
                // Crear un nuevo blog con el usuario creador
                await page.click('button:has-text("New Blog")');
                await page.fill('input[name="title"]', 'Blog created by creator');
                await page.fill('input[name="author"]', 'Creator User');
                await page.fill('input[name="url"]', 'http://blogcreated.com');
                await page.click('button:has-text("Create")');
          
                // Verificar que el blog fue creado
                const blogTitle = await page.locator('text=Blog created by creator');
                expect(blogTitle).toBeVisible();
              });
          
              test('only the creator sees the delete button', async ({ page }) => {
                // Verificar que el creador puede ver el botón de eliminar
                const deleteButton = await page.locator('button:has-text("Delete")');
                expect(deleteButton).toBeVisible();
          
                // Cerrar sesión como el creador
                await page.click('button:has-text("Logout")');
          
                // Iniciar sesión con el segundo usuario (no creador)
                await page.fill('input[name="username"]', 'seconduser');
                await page.fill('input[name="password"]', 'password123');
                await page.click('button[type="submit"]');
          
                // Verificar que el segundo usuario no puede ver el botón de eliminar
                const secondUserDeleteButton = await page.locator('button:has-text("Delete")');
                expect(secondUserDeleteButton).not.toBeVisible();
              });
            });
            describe('Blog app', () => {
                beforeEach(async ({ page, request }) => {
                  // Vaciar la base de datos y crear un usuario
                  await request.post('http://localhost:3001/api/testing/reset');
              
                  await request.post('http://localhost:3001/api/users', {
                    data: {
                      username: 'creatoruser',
                      name: 'Creator User',
                      password: 'password123'
                    }
                  });
              
                  // Navegar a la aplicación
                  await page.goto('http://localhost:5173');
              
                  // Iniciar sesión como creador
                  await page.fill('input[name="username"]', 'creatoruser');
                  await page.fill('input[name="password"]', 'password123');
                  await page.click('button[type="submit"]');
              
                  // Verificar que el inicio de sesión fue exitoso
                  const userGreeting = await page.locator('text=Creator User logged in');
                  expect(userGreeting).toBeVisible();
              
                  // Crear varios blogs con diferentes likes
                  await createBlog(page, 'Blog with 0 likes', 'Author 1', 'http://blog0likes.com');
                  await createBlog(page, 'Blog with 3 likes', 'Author 2', 'http://blog3likes.com');
                  await createBlog(page, 'Blog with 5 likes', 'Author 3', 'http://blog5likes.com');
              
                  // Dar likes a los blogs
                  await likeBlog(page, 'Blog with 3 likes', 3); // 3 likes
                  await likeBlog(page, 'Blog with 5 likes', 5); // 5 likes
                });
              
                test('blogs are ordered by likes', async ({ page }) => {
                  // Obtener todos los blogs y sus likes
                  const blogTitles = await page.locator('.blog-title'); // Asegúrate de que el selector sea correcto
                  const blogLikes = await page.locator('.blog-likes'); // Asegúrate de que el selector sea correcto
              
                  const titles = await blogTitles.allTextContents();
                  const likes = await blogLikes.allTextContents();
              
                  // Crear un array de objetos para poder ordenar
                  const blogs = titles.map((title, index) => ({
                    title,
                    likes: parseInt(likes[index].replace(' likes', ''), 10) || 0 // Suponiendo que los likes se muestran como "X likes"
                  }));
              
                  // Ordenar los blogs por likes de forma descendente
                  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
              
                  // Verificar que el orden en la UI coincide con el orden esperado
                  for (let i = 0; i < sortedBlogs.length; i++) {
                    expect(await blogTitles.nth(i).innerText()).toBe(sortedBlogs[i].title);
                  }
                });
              });
              
              // Funciones auxiliares para crear blogs y dar likes
              async function createBlog(page, title, author, url) {
                await page.click('button:has-text("New Blog")');
                await page.fill('input[name="title"]', title);
                await page.fill('input[name="author"]', author);
                await page.fill('input[name="url"]', url);
                await page.click('button:has-text("Create")');
              }
              
              async function likeBlog(page, title, times) {
                for (let i = 0; i < times; i++) {
                  // Hacer clic en el blog correspondiente
                  await page.click(`text=${title}`);
                  // Hacer clic en el botón de "like"
                  await page.click('button:has-text("Like")'); // Asegúrate de que el selector sea correcto
                  await page.waitForTimeout(500); // Espera para que la acción tenga tiempo de procesarse
                  await page.click('button:has-text("Cancel")'); // Cerrar el blog después de dar like
                }
              */}      
              describe('Blog app', () => {
                beforeEach(async ({ page, request }) => {
                  // Vaciar la base de datos y crear un usuario
                  await request.post('http://localhost:3001/api/testing/reset');
              
                  await request.post('http://localhost:3001/api/users', {
                    data: {
                      username: 'creatoruser',
                      name: 'Creator User',
                      password: 'password123',
                    },
                  });
              
                  // Navegar a la aplicación
                  await page.goto('http://localhost:5173');
              
                  // Iniciar sesión como el creador
                  await page.fill('input[name="username"]', 'creatoruser');
                  await page.fill('input[name="password"]', 'password123');
                  await page.click('button[type="submit"]');
              
                  // Verificar que el inicio de sesión fue exitoso
                  const userGreeting = await page.locator('text=Creator User logged in');
                  expect(userGreeting).toBeVisible();
              
                  // Crear varios blogs con diferentes títulos
                  await createBlog(page, 'Blog with 0 likes', 'Author 1', 'http://blog0likes.com');
                  await createBlog(page, 'Blog with 3 likes', 'Author 2', 'http://blog3likes.com');
                  await createBlog(page, 'Blog with 5 likes', 'Author 3', 'http://blog5likes.com');
              
                  // Dar likes a los blogs
                  await likeBlog(page, 'Blog with 3 likes', 3); // 3 likes
                  await likeBlog(page, 'Blog with 5 likes', 5); // 5 likes
                });
              
                test('blogs are ordered by likes', async ({ page }) => {
                  // Obtener todos los blogs y sus likes
                  const blogTitles = await page.locator('.blog-title'); // Selector para los títulos de los blogs
                  const blogLikes = await page.locator('.blog-likes'); // Selector para los likes de los blogs
              
                  const titles = await blogTitles.allTextContents();
                  const likes = await blogLikes.allTextContents();
              
                  // Crear un array de objetos para poder ordenar
                  const blogs = titles.map((title, index) => ({
                    title,
                    likes: parseInt(likes[index].replace(' likes', ''), 10) || 0, // Suponiendo que los likes se muestran como "X likes"
                  }));
              
                  // Ordenar los blogs por likes de forma descendente
                  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
              
                  // Verificar que el orden en la UI coincide con el orden esperado
                  for (let i = 0; i < sortedBlogs.length; i++) {
                    expect(await blogTitles.nth(i).innerText()).toBe(sortedBlogs[i].title);
                  }
                });
              });
              
              // Funciones auxiliares para crear blogs y dar likes
              async function createBlog(page, title, author, url) {
                await page.click('button:has-text("New Blog")');
                await page.fill('input[name="title"]', title);
                await page.fill('input[name="author"]', author);
                await page.fill('input[name="url"]', url);
                await page.click('button:has-text("Create")');
              }
              
              async function likeBlog(page, title, times) {
                for (let i = 0; i < times; i++) {
                  // Hacer clic en el blog correspondiente
                  await page.click(`text=${title}`);
                  // Hacer clic en el botón de "like"
                  await page.click('button:has-text("Like")'); // Asegúrate de que el selector sea correcto
                  await page.waitForTimeout(500); // Espera para que la acción tenga tiempo de procesarse
                  await page.click('button:has-text("Cancel")'); // Cerrar el blog después de dar like
                }
              
      });
      
      
