/* import { v4 as uuid } from 'uuid'; */

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
//const { v1: uuid } = require('uuid')
const { v4: uuidv4 } = require('uuid');

const { GraphQLError } = require('graphql')

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

let authors = [
  {
    name: "Robert Martin",
    born: 1952,
    bookCount: 2
  },
  {
    name: "Martin Fowler",
    born: 1963,
    bookCount: 1
  },
  {
    name: "Fyodor Dostoevsky",
    born: 1821,
    bookCount: 2
  },
  {
    name: "Joshua Kerievsky",
    bookCount: 1
  },
  {
    name: "Sandi Metz",
    bookCount: 1
  }
];

let books = [
  {
    id: "1",
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin"
    ,genres: ["Realismo mágico", "Ficción", "Literatura latinoamericana"]
  },
  {
    id: "2",
    title: "Refactoring",
    published: 2018,
    author: "Martin Fowler"
    ,genres: ["Realismo mágico", "Ficción", "Literatura latinoamericana"]
  },
  {
    id: "3",
    title: "Crime and Punishment",
    published: 1866,
    author: "Fyodor Dostoevsky"
    ,genres: ["Realismo mágico", "Ficción", "Literatura latinoamericana"]
  },
  {
    id: "4",
    title: "Design Patterns",
    published: 1994,
    author: "Erich Gamma"
    ,genres: ["Realismo mágico", "Ficción", "Literatura latinoamericana"]
  },
];

const typeDefs = `
  type Address {
    street: String!
    city: String! 
  }

  enum YesNo {
    YES
    NO
  }
  
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    allAuthors: [Author!]!       
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
  
  type Author {                  # Nuevo tipo Author
    name: String!
    born: Int
    bookCount: Int!
  }
  
  type Book {
    id: ID!
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }


  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
    allBooks: [Book!]!

  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editNumber(
      name: String!
      phone: String!
    ): Person
    
    addBook(  
      title: String!
      author: String!
      published: Int!
      genres: [String!]!  
    ): Book

    updateAuthor(
      name: String!, 
      born: Int!): Author



  }
`
const { v1: uuid } = require('uuid');  
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons;
      }
      const byPhone = (person) =>
        args.phone === 'YES' ? person.phone : !person.phone;
      return persons.filter(byPhone);
    },
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name),
    allAuthors: () => authors,
    allBooks: () => books,
  },
  
  Person: {
    address: ({ street, city }) => {
      return { street, city };
    },
  },

  Mutation: {
    addPerson: (root, args) => {
      if (persons.find(p => p.name === args.name)) {
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        });
      }
      const person = { ...args, id: uuid() };
      persons = persons.concat(person);
      return person;
    },

    editNumber: (root, args) => {
      const person = persons.find(p => p.name === args.name);
      if (!person) {
        return null;
      }

      const updatedPerson = { ...person, phone: args.phone };
      persons = persons.map(p => p.name === args.name ? updatedPerson : p);
      return updatedPerson;
    },

    // Aquí agregamos la mutación addBook correctamente
    addBook: (root, args) => {
      console.log("addBook args BACK:", args);  
      // Verificar si el libro ya existe
      if (books.find(b => b.title === args.title)) {
        throw new GraphQLError('Book with this title already exists', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.title },
        });
      }

      // Crear el nuevo libro
      const newBook = {
        id: uuid(),  //
        title: args.title,
        author: args.author,
        published: args.published,
        genres: args.genres,  // Géneros asociados al libro
      };

      books = books.concat(newBook);  // Agregar el libro a la lista de libros
      console.log("BACK New book added:", newBook);
      return newBook;
    },
    updateAuthor: (_, { name, born }) => {
      // Buscar al autor por nombre
      const author = authors.find((author) => author.name === name);
      
      if (!author) {
        throw new GraphQLError('Autor no encontrado', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: name,
          },
        });
      }
    
      // Actualizar el año de nacimiento
      author.born = born;
    
      return author;
    }
    

    

  },
};



const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error("BACK APOLLO :::Error en el servidor:", error); // Esto muestra el error en la consola del servidor
    return error;
  },

})


startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})