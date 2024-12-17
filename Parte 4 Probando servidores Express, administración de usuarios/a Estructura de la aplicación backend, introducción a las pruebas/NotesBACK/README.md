# EJERCICIOS DE TESTING
# ============================================
[text](.)
> .[!NOTE]. Text that is a quote
# INSTALAMOS LOS MODULOS DE VARIABLES Y MONGO
# ============================================
# npm install dotenv
# npm install mongoose
> [!IMPORTANT]
# AÑADIMOS EN PACkAGE.JSON "test": "node --test"
#  "scripts": {
#      "start": "node index.js",
#     "dev": "nodemon index.js",
#     "build:ui": "rm -rf build && cd ../frontend/ && npm run build && cp -r build ../backend",
#     "deploy": "fly deploy",
#     "deploy:full": "npm run build:ui && npm run deploy",
#     "logs:prod": "fly logs",
#     "lint": "eslint .",
#     "test": "node --test"
> [!IMPORTANT] 
# En los ejercicios de esta parte, crearemos una aplicación de lista de blogs, que permite a los usuarios guardar información sobre blogs interesantes con los que se han encontrado en Internet. Para cada blog listado, guardaremos el autor, el título, la URL y la cantidad de votos positivos de los usuarios de la aplicación.

# 4.1 Lista de Blogs, paso 1
# Imaginemos una situación en la que recibes un correo electrónico que contiene el siguiente cuerpo de la aplicación e instrucciones:


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
