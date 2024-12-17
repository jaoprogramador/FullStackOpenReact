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

