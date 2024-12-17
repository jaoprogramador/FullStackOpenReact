# React + Vite

<!-- Ejercicios 8.13.-8.16
Los siguientes ejercicios probablemente rompan su frontend. No se preocupe por ello todavía; el frontend se arreglará y ampliará en el próximo capítulo.

8.13: Base de datos, parte 1
Cambie la aplicación de la biblioteca para que guarde los datos en una base de datos. Puede encontrar el esquema de mongoose para libros y autores desde aquí.

Cambiemos un poco el esquema de graphql del libro

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}copy
para que en lugar de solo el nombre del autor, el objeto libro contenga todos los detalles del autor.

Puede asumir que el usuario no intentará agregar libros o autores defectuosos, por lo que no tiene que preocuparse por los errores de validación.

Las siguientes cosas no tienen que funcionar todavía:

consulta/query allBooks con parámetros
campo bookCount de un objeto de autor
campo author de un libro
mutación editAuthor
Nota: a pesar de que el autor ahora es un objeto dentro de un libro, el esquema para agregar un libro puede permanecer igual, solo el nombre del autor se da como parámetro

type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book!
  editAuthor(name: String!, setBornTo: Int!): Author
} 
8.14 : Base de datos, parte 2
Complete el programa para que funcionen todas las consultas (excepto allBooks con el parámetro author) y mutaciones.

Con respecto al parámetro genre de la consulta de todos los libros, la situación es un poco más desafiante. La solución es simple, pero encontrarla puede ser un dolor de cabeza. Puede beneficiarse de esto.

8.15 Base de datos, parte 3
Complete el programa de modo que los errores de validación de la base de datos (por ejemplo, título de libro o nombre del autor demasiado corto) se manejen con sensatez. Esto significa que hacen que se emita un GraphQLError con un mensaje de error adecuado.

8.16 usuario e inicio de sesión
Agregue administración de usuarios a su aplicación. Expanda el esquema así:

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  // ..
  me: User
}

type Mutation {
  // ...
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}copy
Cree resolutores para la consulta me y las nuevas mutaciones createUser y login. Como en el material del curso, puede asumir que todos los usuarios tienen la misma contraseña codificada.

Haga que las mutaciones addBook y editAuthor sean posibles solo si la solicitud incluye un token válido.

(No se preocupe por arreglar el frontend todavía.)
-->