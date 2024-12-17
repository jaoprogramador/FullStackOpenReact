> .[!NOTE]. Text that is a quote
# CONFIGURAMOS EL PACJAGE.JSON
# ============================================
#  "scripts": {
#      "start": "NODE_ENV=production node index.js",
#      "dev": "NODE_ENV=development nodemon index.js",
#      "test": "NODE_ENV=test node --test",
> [!IMPORTANT]
# iNSTALAMOS
# =============
#  npm install --save-dev cross-env
#  npm install cross-env
#  npm install --save-dev supertest

#  npm install --save-dev jest


> [!IMPORTANT] 
# CAMBIAMOS EL CONFIG.JS:


> [!WARNING] 
# Estructura
# ├── index.js
# ├── app.js
# ├── dist
# │   └── ...
# ├── controllers
# │   └── notes.js
# ├── models
# │   └── note.js
# ├── package-lock.json
# ├── package.json
# ├── utils
# │   ├── config.js
# │   ├── logger.js
# │   └── middleware.js  

# 4.8: Pruebas de Lista de Blogs, paso 1
# Utiliza la librería SuperTest para escribir una prueba que realice una solicitud HTTP GET a la URL /api/blogs. Verifica que la aplicación de la lista de blogs devuelva la cantidad correcta de publicaciones de blog en formato JSON.

# Una vez finalizada la prueba, refactoriza el controlador de ruta para usar la sintaxis async/await en lugar de promesas.

# Ten en cuenta que tendrás que realizar cambios similares en el código a los que fueron hechos en el material, como definir el entorno de prueba para que puedas escribir pruebas que usan una base de datos separada.

# NB: cuando estás escribiendo tus pruebas es mejor no ejecutarlas todas, solo ejecuta aquellas en las que estás trabajando. Lee más sobre esto aquí.

# npm install supertest jest --save-dev


# ClusterTest jaoprogramador XxCFzauU8TimgR0F
# packagejson
# "dev": "NODE_ENV=development nodemon index.js", LINUX
# "dev": "set NODE_ENV=development&& nodemon index.js", WINDOWS

# http://localhost:3003/api/blogs

# voy por el punto 4.8: Pruebas de Lista de Blogs, paso 1, me devuelve notas de PROD no de TEST
# lanzamos este comando para definir como test la variable de entorno NODE_ENV
# set NODE_ENV=test&& nodemon index.js

# ARRANCAR TEST ESPECIFICO: npm test -- blog_api.test.js
# ponemos este package.json para que sea test:
# "scripts": {
#     "start": "NODE_ENV=production node index.js",
#    "dev": "set NODE_ENV=test&& nodemon index.js",
#    "test": "cross-env NODE_ENV=test jest",

# 1.-Instalemos el paquete bcrypt para generar los hashes de contraseña:
#   npm install bcrypt

# 2.- Creamos el objeto UUSER.js y lo referenciamos desde Notes.js

# 3.- en app.js exponemos la ruta para el api, y la instancia
#       app.use('/api/users', usersRouter)

# 4.- creamos el test/user_api.test.js 

# 5.- Ajustamos los controles para que nos devuelvan la relacion Notas-usuario con populate

# ====================================================================
# ====================================================================
# 1.- Instalamos la librería que genera tokens
#         npm install jsonwebtoken

# 2.- creamos controllers/login.js. conla funcionalidad de generar tokens

# 3.- creamos en .env la variable SECRETO con una clave

# 4.- en el app.js. enrutamos al nuevo vontrolador de login

# hacemos una peticion POST en postman a http://localhost:3003/api/login
# {
 #    "username": "jaoprogramador",
#     "password": "12345"
# }
# y nos devuelve un token firmado unicamente
# {
 #    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imphb3Byb2dyYW1hZG9yIiwiaWQiOiI2NzBkMmM1ZDk2MjIzMWQzYzcxNDZhZTAiLCJpYXQiOjE3Mjg5MjA0MTZ9.77-ZWJ4r0hiHTzFRx6bQB1-3QSEEFjzV-VLW2vPuz20",
 #    "username": "jaoprogramador",
 #    "name": "juantxu"
# }
# si la clave no es correcta nos devuelve
# "error": "invalid username or password"

# 5 ajustamos el controlador de notas para que solo podamos crear notas si tenemos un token

# 6.- en utils/middleware.js añadimos el tipo de error JsonWebTokenError

# para autenticarse con token, nos logamos con el mismo passw que pusimos en .env SECRET, cogemos el token hacemos una peticion POST pasando por header Autentication Beader TOKEN y nos devolverá:
# {
#     "content": "User id de la nota Bilbao basket Rabaseda mal partido Jornada 3",
#     "important": true,
#     "user": "670d2c5d962231d3c7146ae0",
#     "id": "670d5c8707309beeac706c2f"
# }


# EJERCICIOS
# =============
# Ejercicios 4.15.-4.23.
# En los próximos ejercicios, se implementarán los conceptos básicos de la gestión de usuarios para la aplicación de lista de blogs. La forma más segura es seguir el material del curso desde el capítulo de la parte 4 Administración de usuarios hasta el capítulo Autenticación basada en token. Por supuesto, también puedes utilizar tu creatividad.

# Una advertencia más: Si notas que estás mezclando llamadas async/await y then, es 99% seguro que estás haciendo algo mal. Utiliza uno u otro, nunca ambos.

# 4.16*: Expansión de la Lista de Blogs, paso 4
# Agrega una funcionalidad que agregue las siguientes restricciones para la creación de nuevos usuarios: Deben proporcionarse tanto el username como password y ambos deben tener al menos 3 caracteres. El username debe ser único.

# La operación debe responder con un código de estado adecuado y algún tipo de mensaje de error si se crea un usuario no válido.

# NB No pruebes las restricciones de password con las validaciones de Mongoose. No es una buena idea porque la password recibida por el backend y el hash de password guardado en la base de datos no son lo mismo. La longitud de la contraseña debe validarse en el controlador como hicimos en la parte 3 antes de usar la validación de Mongoose.

# Además, implementa pruebas que verifiquen que no se creen usuarios no válidos y que una operación de agregar usuario que sea no válida devuelva un código de estado adecuado y un mensaje de error.

# NB si decides definir pruebas en múltiples archivos, debes notar que por defecto cada archivo de prueba se ejecuta en su propio proceso (ver Modelo de ejecución de pruebas en la documentación). La consecuencia de esto es que diferentes archivos de prueba se ejecutan al mismo tiempo. Dado que las pruebas comparten la misma base de datos, la ejecución simultánea puede causar problemas, que pueden evitarse ejecutando las pruebas con la opción --test-concurrency=1, es decir, definiéndolas para que se ejecuten secuencialmente.

# 4.17: Expansión de la Lista de Blogs, paso 5
# Expande los blogs para que cada blog contenga información sobre el creador del blog.

# Modifica la adición de nuevos blogs para que cuando se cree un nuevo blog, cualquier usuario de la base de datos sea designado como su creador (por ejemplo, el que se encontró primero). Implementa esto de acuerdo con el capítulo de la parte 4 populate. El usuario designado como creador no importa todavía. La funcionalidad se termina en el ejercicio 4.19.

# Modifica la lista de todos los blogs para que la información de usuario del creador se muestre con el blog:

# 4.18: Expansión de la Lista de Blogs, paso 6
# Implementar la autenticación basada en token según la parte 4 Autenticación basada en token.

# 4.19: Expansión de la Lista de Blogs, paso 7
# Modifica la adición de nuevos blogs para que solo sea posible si se envía un token válido con la solicitud HTTP POST. El usuario identificado por el token se designa como el creador del blog.

# 4.20*: Expansión de la Lista de Blogs, paso 8
# Este ejemplo de la parte 4 muestra cómo tomar el token del encabezado con la función auxiliar getTokenFrom.

# Si usaste la misma solución, refactoriza para llevar el token a un middleware. El middleware debe tomar el token del encabezado Authorization y debe asignarlo al campo token del objeto request.

# En otras palabras, si registras este middleware en el archivo app.js antes de todas las rutas

#  app.use(middleware.tokenExtractor)

#  4.21*: Expansión de la Lista de Blogs, paso 9
#  Cambia la operación de eliminar blogs para que el blog solo pueda ser eliminado por el usuario que lo agregó. Por lo tanto, eliminar un blog solo es posible si el token enviado con la solicitud es el mismo que el del creador del blog.

#  Si se intenta eliminar un blog sin un token o por un usuario incorrecto, la operación debe devolver un código de estado adecuado.

#  Ten en cuenta que si obtienes un blog de la base de datos,

#  const blog = await Blog.findById(...)copy
#  el campo blog.user no contiene una cadena, sino un objeto. Entonces, si deseas comparar el ID del objeto obtenido de la base de datos y un ID de cadena, la operación de comparación normal no funciona. El ID obtenido de la base de datos debe primero convertirse en una cadena.

#  if ( blog.user.toString() === userid.toString() ) 


#  4.22*: Expansión de la Lista de Blogs, paso 10
#  Tanto la creación de un nuevo blog como su eliminación necesitan averiguar la identidad del usuario que está realizando la operación. El middleware tokenExtractor que hicimos en el ejercicio 4.20 ayuda, pero los controladores de las operaciones post y delete necesitan averiguar quién es el usuario que posee un token específico.

#  Ahora cree un nuevo middleware userExtractor, que encuentre al usuario y lo guarde en el objeto de solicitud. Cuando registras el middleware en app.js


# HE HECHO ALTAS DE BLOGS CON TOKENS, HE REFACTORIZADO LA OBTENCIÓN DEL TOKEN DESDE EL MIDLEWARE, HE PROBADO LA CREACIÓN DE BLOGS CON JWT
# CONTINUAR DESDE 4.21*: Expansión de la Lista de Blogs, paso 9


# http://localhost:3003/api/blogs/:id

# HE CREADO LOS TEST Y COMENTADO LOS ANTIGUAR ANTES DE PONER LOS TOKENS DE AUTENTICACION. PENDIENTE LANZARLOS