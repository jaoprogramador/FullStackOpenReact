> .[!NOTE]. Text that is a quote
# CONFIGURAMOS EL PACJAGE.JSON   "test": "jest --verbose"
# ============================================
#  "scripts": {
#      "start": "NODE_ENV=production node index.js", -----PARA APUNTAR A TESTBD
#      "dev": "NODE_ENV=development nodemon index.js",----PARA APUNTAR A TESTBD
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


# cuando hago npm run dev no tengo acceso al api notes:
========================================================
# error connecting to MongoDB: Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://www.mongodb.com/docs/atlas/security-whitelist/

# SOLUCION:El problema de venía de Mongo Atlas, que no tenía habilitada las peticiones de conexion desde cualquier IP

# 
