# Añadir el componente LOGIN
# tenemos que tener levantado la parte back con el api :
#       http://localhost:3001/api/notes
# luego tenemos que levantar la parte FRONT
#       http://localhost:5173/




# Ejercicios 5.1.-5.4.
# Ahora crearemos un frontend para el backend de la lista de blogs que creamos en la última parte. Puedes usar esta aplicación de GitHub como base para tu solución. Debes conectar tu backend con un proxy como se muestra en la parte 3.

# Es suficiente con enviar tu solución terminada. Puedes hacer un commit después de cada ejercicio, pero eso no es necesario.

# Los primeros ejercicios revisan todo lo que hemos aprendido sobre React hasta ahora. Pueden ser un desafío, especialmente si tu backend está incompleto. Podría ser mejor usar el backend de la respuesta modelo de la parte 4.

# Mientras realizas los ejercicios, recuerda todos los métodos de depuración de los que hemos hablado, especialmente mirar a la consola.

# Advertencia: Si notas que estás mezclando los comandos async/await y then, hay un 99.9% de probabilidades de que estés haciendo algo mal. Utiliza uno u otro, nunca ambos.

# 5.1: Frontend de la Lista de Blogs, paso 1
# Clona la aplicación de GitHub con el comando:

# git clone https://github.com/fullstack-hy2020/bloglist-frontendcopy
# Elimina la configuración de git de la aplicación clonada

# cd bloglist-frontend   // ve al repositorio clonado
# rm -rf .gitcopy
# La aplicación se inicia de la forma habitual, pero primero debes instalar sus dependencias:

# npm install
# npm run devcopy
# Implementa la funcionalidad de inicio de sesión en el frontend. El token devuelto con un inicio de sesión exitoso se guarda en el estado user de la aplicación.

# Si un usuario no ha iniciado sesión, solo se verá el formulario de inicio de sesión.

# Si el usuario ha iniciado sesión, se muestra el nombre del usuario y una lista de blogs.

# Los detalles de usuario del usuario que inició sesión no tienen que guardarse todavía en el local storage.

# NB Puedes implementar el rendering condicional del formulario de inicio de sesión así, por ejemplo:

 #  if (user === null) {
#     return (
#       <div>
#         <h2>Log in to application</h2>
#         <form>
#           //...
#         </form>
#       </div>
#     )
#   }

#   return (
#     <div>
#       <h2>blogs</h2>
#       {blogs.map(blog =>
#         <Blog key={blog.id} blog={blog} />
#       )}
#     </div>
#   )
# }

# 5.3: Frontend de la Lista de Blogs, paso 3
# Expande tu aplicación para permitir que un usuario que haya iniciado sesión agregue nuevos blogs:

# CCONTINUAR DESDE CERRAR SESION Y OCULTAR LAS NOTAS: HE HECHO EL SERVICIO QUE CARGA LOS BLOGS, UN COMPONENTE, LO HE LLAMADO EN EL ONLOAD Y EL LOGIN

# he ajustado el boton log out, he puesto un formulario de nuevos blogs y he puesto la validación de ocultar el login o los blogs. PENDIENTE alta blogs
# 5.34 Frontend de la Lista de Blogs, paso 4
# Frontend de la Lista de Blogs, paso 4
# Implementa notificaciones que informen al usuario sobre operaciones exitosas y no exitosas en la parte superior de la página. Por ejemplo, cuando se agrega un nuevo blog, se puede mostrar la siguiente notificación:






