const { ApolloServer, gql } = require('apollo-server');

let authors = [
    {
      name: 'Robert Martin',
      id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
      born: 1952,
    },
    {
      name: 'Martin Fowler',
      id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
      born: 1963
    },
    {
      name: 'Fyodor Dostoevsky',
      id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
      born: 1821
    },
    { 
      name: 'Joshua Kerievsky', // birthyear not known
      id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    { 
      name: 'Sandi Metz', // birthyear not known
      id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
];
  
let books = [
    {
      title: 'Clean Code',
      published: 2008,
      author: 'Robert Martin',
      id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Agile software development',
      published: 2002,
      author: 'Robert Martin',
      id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
      genres: ['agile', 'patterns', 'design']
    },
    {
      title: 'Refactoring, edition 2',
      published: 2018,
      author: 'Martin Fowler',
      id: "afa5de00-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Refactoring to patterns',
      published: 2008,
      author: 'Joshua Kerievsky',
      id: "afa5de01-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'patterns']
    },  
    {
      title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
      published: 2012,
      author: 'Sandi Metz',
      id: "afa5de02-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'design']
    },
    {
      title: 'Crime and punishment',
      published: 1866,
      author: 'Fyodor Dostoevsky',
      id: "afa5de03-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'crime']
    },
    {
      title: 'Demons',
      published: 1872,
      author: 'Fyodor Dostoevsky',
      id: "afa5de04-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'revolution']
    },
];

// Definición del esquema con la mutación addBook
const typeDefs = gql`
  type Book {
    title: String
    author: String
    published: Int
    genres: [String]
  }

  type Author {
    name: String
    born: Int
    bookCount: Int
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
  }

  type Query {
    hello: String
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }
`;

// Resolvers para el esquema
const resolvers = {
  Query: {
    hello: () => '¡Hola, mundo!',
    bookCount: () => books.length,
    authorCount: () => {
      const uniqueAuthors = new Set(books.map(book => book.author));
      return uniqueAuthors.size;
    },
    allBooks: (parent, args) => {
      let filteredBooks = books;
      
      if (args.author) {
        filteredBooks = filteredBooks.filter(book => book.author === args.author);
      }
      
      if (args.genre) {
        filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre));
      }
      
      return filteredBooks;
    },
    allAuthors: () => authors,
  },
  
  Author: {
    bookCount: (author) => {
      return books.filter(book => book.author === author.name).length;
    }
  },

  Mutation: {
    addBook: (parent, args) => {
      // Verificar si el autor ya existe en la lista de autores
      let author = authors.find(a => a.name === args.author);
      
      if (!author) {
        // Si el autor no existe, agregarlo a la lista de autores con born = null
        author = {
          name: args.author,
          born: null,
        };
        authors.push(author);
      }
      
      // Crear el nuevo libro
      const newBook = {
        title: args.title,
        author: args.author,
        published: args.published,
        genres: args.genres,
        id: `book-${books.length + 1}`,
      };
      
      // Agregar el nuevo libro a la lista de libros
      books.push(newBook);
      
      // Retornar el libro recién agregado
      return newBook;
    }
  }
};

// Configuración del servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Inicializar el servidor
server.listen().then(({ url }) => {
  console.log(`Servidor corriendo en ${url}`);
});
