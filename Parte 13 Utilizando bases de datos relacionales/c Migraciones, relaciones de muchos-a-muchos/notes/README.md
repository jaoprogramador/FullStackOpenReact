# React + Vite
#
# INI nodemon index.js
# URL http://localhost:3001/api/users
# PARA POSTMAN
# =============
POST http://localhost:3001/api/users

    {
        "id": 1,
        "username": "jaoprohramador@gmail.com",
        "name": "juantxu"
    }
GET http://localhost:3001/api/users/ 


PUT http://localhost:3001/api/users/guigui@gmail.com
    {
    "newUsername": "guiller@hotmail.com"
    }

POST http://localhost:3001/api/login/
    {   
    "username": "jaoprohramador@gmail.com",
    "password":"secret"
    
    }
    --BACK
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imphb3Byb2hyYW1hZG9yQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3MzYwNjg4NTB9.mYjoTTgrS7Bnlg1xM4tPmjfalG3XYj6RfjNf-7R5RvI",
        "username": "jaoprohramador@gmail.com",
        "name": "juantxu"
    }   


POST http://localhost:3001/api/blogs/
    {   
    "title": "Recetas de comida italiana",
    "content":"Pizza carbonara",
     "userId":"jaoprohramador@gmail.com"
    
    }
    Autorization "el token del login"


POST http://localhost:3001/api/blogs/
    {   
    "title": "Recetas de comida turca",
    "content":"Durum pollo",
    "url":"http://www.tk.recetes.es",
     "userId":"1",
     "likes": 4,
    "author": "Mustafa"
    }

DELETE http://localhost:3001/api/blogs/1
    SIN JSON, SOLO BEARER token del login

GET http://localhost:3001/api/blogs/
    [
        {
            "id": 2,
            "author": null,
            "url": "http://www.tk.recetes.es",
            "title": "Recetas de comida turca",
            "likes": 4,
            "createdAt": "2025-01-05T09:18:28.394Z",
            "updatedAt": "2025-01-05T09:18:28.394Z",
            "userId": 1,
            "user": {
                "id": 1,
                "username": "jaoprohramador@gmail.com",
                "name": "juantxu"
            }
        },
        {
            "id": 3,
            "author": "Kostas",
            "url": "http://www.gr.recetes.es",
            "title": "Recetas de comida griega",
            "likes": 4,
            "createdAt": "2025-01-05T09:29:05.453Z",
            "updatedAt": "2025-01-05T09:29:05.453Z",
            "userId": 1,
            "user": {
                "id": 1,
                "username": "jaoprohramador@gmail.com",
                "name": "juantxu"
            }
        },
        {
            "id": 4,
            "author": "Kiuko",
            "url": "http://www.kr.recetes.es",
            "title": "Recetas de comida koreana",
            "likes": 4,
            "createdAt": "2025-01-05T09:30:11.638Z",
            "updatedAt": "2025-01-05T09:30:11.638Z",
            "userId": 1,
            "user": {
                "id": 1,
                "username": "jaoprohramador@gmail.com",
                "name": "juantxu"
            }
        }
    ]

GET http://localhost:3001/api/blogs/3
    {
        "id": 3,
        "author": "Kostas",
        "url": "http://www.gr.recetes.es",
        "title": "Recetas de comida griega",
        "likes": 4,
        "createdAt": "2025-01-05T09:29:05.453Z",
        "updatedAt": "2025-01-05T09:29:05.453Z",
        "userId": 1
    }

GET http://localhost:3001/api/blogs/api/blogs
    [
    {
        "id": 4,
        "author": "Kiuko",
        "url": "http://www.kr.recetes.es",
        "title": "Recetas de comida koreana",
        "likes": 46,
        "createdAt": "2025-01-05T09:30:11.638Z",
        "updatedAt": "2025-01-05T09:30:11.638Z",
        "userId": 1,
        "user": {
            "id": 1,
            "username": "jaoprohramador@gmail.com",
            "name": "juantxu"
        }
    },
    {
        "id": 3,
        "author": "Kostas",
        "url": "http://www.gr.recetes.es",
        "title": "Recetas de comida griega",
        "likes": 3,
        "createdAt": "2025-01-05T09:29:05.453Z",
        "updatedAt": "2025-01-05T09:29:05.453Z",
        "userId": 1,
        "user": {
            "id": 1,
            "username": "jaoprohramador@gmail.com",
            "name": "juantxu"
        }
    },
    {
        "id": 2,
        "author": null,
        "url": "http://www.tk.recetes.es",
        "title": "Recetas de comida turca",
        "likes": 2,
        "createdAt": "2025-01-05T09:18:28.394Z",
        "updatedAt": "2025-01-05T09:18:28.394Z",
        "userId": 1,
        "user": {
            "id": 1,
            "username": "jaoprohramador@gmail.com",
            "name": "juantxu"
        }
    }
]

POST http://localhost:3001/api/notes 
    {
        "id": 8,
        "content": "Tengo que montar mesas",
        "important": false 
    }
GET http://localhost:3001/api/notes?important=true
    [
    {
        "id": 4,
        "content": "Tengo que hacer la compra de verduras",
        "important": true,
        "date": "2025-01-05T10:38:13.981Z",
        "user": {
            "name": "juantxu"
        }
    },
    {
        "id": 5,
        "content": "Tengo que hacer la compra de carne",
        "important": true,
        "date": "2025-01-05T10:38:32.143Z",
        "user": {
            "name": "juantxu"
        }
    }
]


MIGRACION 
==========
instalar umzug

    npm install umzug

ejecutar migracion
    npm run migration:down

Ejercicio 13.17.
Eliminar todas las tablas de la base de datos

    npx sequelize-cli db:migrate:undo:all

--Ejercicio 13.17.
-- Elimine todas las tablas de la base de datos de su aplicación
DROP TABLE IF EXISTS notes, users, "SequelizeMeta" CASCADE;

npx sequelize-cli db:migrate --env production

Ejercicio 13.18.

npx sequelize-cli migration:generate --name add-year-to-blogs

npx sequelize-cli db:migrate
--Ejercicio 13.19
npx sequelize-cli migration:generate --name create-reading-list
crea la tabla en 20250105151043-create-reading-list.js
npx sequelize-cli db:migrate

Ejercicio 13.20

Ejercicio 13.21.

Ejercicio 13.22.
Ejercicio 13.23
Ejercicio 13.24.