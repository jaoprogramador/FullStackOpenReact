> .[!NOTE]. Text that is a quote
# CONFIGURAMOS EL PACJAGE.JSON   "test": "jest --verbose"
# ============================================
#  "scripts": {
#      "start": "NODE_ENV=production node index.js",
#      "dev": "NODE_ENV=development nodemon index.js",
#      "test": "NODE_ENV=test node --test",
#       "test": "jest --verbose"
> [!IMPORTANT]
# iNSTALAMOS jest: librería para pruebas
# =======================================
#  npm install --save-dev jest

# al final del package.json añadimos  que el entorno de ejecución es Node.

# //...
 # "jest": {
 #   "testEnvironment": "node"
 # }

> [!IMPORTANT] 
# CREAMOS TESTS/reverse.test.js


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


# He llegado hasta los Test
# =============================
# http://localhost:3003/api/blogs/:id

# COMENTARIOS /* --- */  Dxctechnology_24


# Ejercicios 4.3.-4.7.
# Creemos una colección de funciones auxiliares que están destinadas a ayudar a lidiar con la lista de blogs. Cree las funciones en un archivo llamado utils/list_helper.js. Escriba sus pruebas en un archivo de prueba con el nombre apropiado en el directorio tests.


# 4.3: Funciones Auxiliares y Pruebas Unitarias, paso 1
# Primero define una función dummy que reciba una matriz de publicaciones de blog como parámetro y siempre devuelva el valor 1. El contenido del archivo list_helper.js en este punto debe ser el siguiente:

# const dummy = (blogs) => {
#  // ...
# }

# module.exports = {
#  dummy
# }copy
# Verifica que tu configuración de prueba funcione con la siguiente prueba:

# const listHelper = require('../utils/list_helper')

# test('dummy returns one', () => {
#   const blogs = []

#   const result = listHelper.dummy(blogs)
#   expect(result).toBe(1)
# })

# 4.4: Funciones Auxiliares y Pruebas Unitarias, paso 2
# Define una nueva función totalLikes que recibe una lista de publicaciones de blogs como parámetro. La función devuelve la suma total de likes en todas las publicaciones del blog.

# Escribe pruebas apropiadas para la función. Se recomienda poner las pruebas dentro de un bloque describe, para que la salida del informe de prueba se agrupe bien:

# npm test pasando para list_helper_test
# Definir datos de prueba para la función se puede hacer así:

# describe('total likes', () => {
#   const listWithOneBlog = [
#     {
#       _id: '5a422aa71b54a676234d17f8',
#       title: 'Go To Statement Considered Harmful',
#       author: 'Edsger W. Dijkstra',
#       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
#       likes: 5,
#       __v: 0
#     }
#   ]

#   test('when list has only one blog, equals the likes of that', () => {
#     const result = listHelper.totalLikes(listWithOneBlog)
#     expect(result).toBe(5)
#   })
# })copy
# Si definir tu propia lista de datos de prueba de blogs es demasiado trabajo, puedes usar la lista ya hecha aquí.

# Es probable que tenga problemas al escribir pruebas. Recuerda las cosas que aprendimos sobre depuración en la parte 3. Puedes imprimir cosas en la consola con console.log incluso durante la ejecución de la prueba. Incluso es posible usar el depurador mientras se ejecutan las pruebas, puedes encontrar instrucciones para eso aquí.

# NB: si alguna prueba falla, entonces se recomienda ejecutar solo esa prueba mientras estás solucionando el problema. Puedes ejecutar una única prueba con el método only.

# Otra forma de ejecutar una sola prueba (o bloque de descripción) es especificar el nombre de la prueba que se ejecutará con la bandera -t:

# npm test -- -t 'when list has only one blog, equals the likes of that'


# para ejecutar una prueba específica:
#     npm test -- -t 'when list has only one blog, equals the likes of that blog'


# 4.5*: Funciones Auxiliares y Pruebas Unitarias, paso 3
# Define una nueva función favoriteBlog que recibe una lista de blogs como parámetro. La función descubre qué blog tiene más me gusta. Si hay muchos favoritos, basta con devolver uno de ellos.

# El valor devuelto por la función podría tener el siguiente formato:

# {
#   title: "Canonical string reduction",
#   author: "Edsger W. Dijkstra",
#   likes: 12
# }copy
# NB cuando estás comparando objetos, el método toEqual es probablemente lo que debas usar, ya que el método toBe intenta verificar que los dos valores sean el mismo valor, y no solo que contengan las mismas propiedades.

# Escribe las pruebas para este ejercicio dentro de un nuevo bloque describe. Haz lo mismo con los ejercicios restantes también

# EJECUTAMOS EL TEST INDIVIDUALMENTE :
# ====================================
# npm test -- -t 'favorite blog'

# 4.6*: Funciones Auxiliares y Pruebas Unitarias, paso 4
# Este y el siguiente ejercicio son un poco más desafiantes. No es necesario completar estos dos ejercicios para avanzar en el material del curso, por lo que puede ser una buena idea volver a estos una vez que haya terminado de leer el material de esta parte en su totalidad.

# Se puede terminar este ejercicio sin el uso de librerías adicionales. Sin embargo, este ejercicio es una gran oportunidad para aprender a usar la librería Lodash.

# Define una función llamada mostBlogs que reciba una lista de blogs como parámetro. La función devuelve el author que tiene la mayor cantidad de blogs. El valor de retorno también contiene el número de blogs que tiene el autor principal:

# {
#   author: "Robert C. Martin",
#   blogs: 3
# }copy
# Si hay muchos blogueros importantes, entonces es suficiente con devolver uno de ellos.

# INSTALAMOS PARA ANEJO DE ARRAYS 
# npm install lodash
# EJECUTAMOS INDIVIDUALMENTE EL TEST
#  npm test -- -t 'most blogs'

# 4.13 Expansiones de la Lista de Blogs, paso 1
# Implementa la funcionalidad para eliminar un solo recurso de publicación de blog.

# Utiliza la sintaxis async/await. Sigue las convenciones de RESTful al definir la API HTTP.

# Implementa pruebas para esta funcionalidad.

# 4.13 Expansiones de la Lista de Blogs, paso 1
# Implementa la funcionalidad para eliminar un solo recurso de publicación de blog.

# Utiliza la sintaxis async/await. Sigue las convenciones de RESTful al definir la API HTTP.

# Implementa pruebas para esta funcionalidad.


# PRUEBA CON CURL
# curl -X DELETE http://localhost:3001/api/blogs/<blogId>

# 4.14 Expansiones de Listas de Blogs, paso 2
# Implementa la funcionalidad para actualizar la información de una publicación de blog individual.

# Utiliza async/await.

# La aplicación principalmente necesita actualizar la cantidad de likes para una publicación de blog. Puedes implementar esta funcionalidad de la misma manera que implementamos actualizar notas en la parte 3.

# Implementa pruebas para esta funcionalidad.

# curl -X PUT http://localhost:3001/api/blogs/<blogId> -H "Content-Type: application/json" -d '{"likes": 20}'
