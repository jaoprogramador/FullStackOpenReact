const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Importar modelos
const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');

// Clave secreta para tokens JWT
const JWT_SECRET = 'SECRET_KEY';

// Conectar a MongoDB

//mongoose.connect('mongodb://localhost:27017/graphql-library', {
mongoose.connect('mongodb+srv://jaoprogramador:QuJDcyCyEDGquupK@graphql-library.hjxot.mongodb.net/?retryWrites=true&w=majority&appName=graphql-library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error de conexión:', err));

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
    allBooks(genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User

  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Address {
    street: String!
    city: String!
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
      born: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

  }
`;

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
    allBooks: async (root, { genre }) => {
      const filter = genre ? { genres: genre } : {};
      return await Book.find(filter).populate('author');
    },
    allAuthors: async () => {
      return await Author.find();
    },
    // Las otras consultas aquí ...
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    createUser: async (root, args) => {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(args.password, saltRounds);

      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        passwordHash
      });

      try {
        return await user.save();
      } catch (error) {
        throw new GraphQLError('Error al crear usuario', {
          extensions: { code: 'BAD_USER_INPUT', error }
        });
      }
    },

    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });

      const passwordCorrect =
        user === null ? false : await bcrypt.compare(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        throw new GraphQLError('Credenciales incorrectas', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
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
    addBook: async (root, args, context) => {
      const { title, author: authorName, published, genres } = args;
      if (!context.currentUser) {
        throw new GraphQLError('No autorizado', {
          extensions: { code: 'UNAUTHORIZED' }
        });
      }

      // Validación del título del libro
      if (title.length < 3) {
        throw new GraphQLError('El título del libro debe tener al menos 3 caracteres.', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: title },
        });
      }
  
      // Validación de la fecha de publicación
      const currentYear = new Date().getFullYear();
      if (published > currentYear) {
        throw new GraphQLError('El año de publicación no puede ser mayor que el año actual.', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: published },
        });
      }
  
      // Validación de géneros
      if (!genres || genres.length === 0) {
        throw new GraphQLError('El libro debe tener al menos un género.', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: genres },
        });
      }
  
      // Buscar o crear el autor
      let author = await Author.findOne({ name: authorName });
      if (!author) {
        author = new Author({ name: authorName, bookCount: 0 });
        await author.save();
      }
  
      // Crear y guardar el libro
      const book = new Book({
        title,
        published,
        author: author._id,
        genres,
      });
      await book.save();
  
      // Incrementar el contador de libros del autor
      author.bookCount += 1;
      await author.save();
  
      return book;
    },
    updateAuthor: async (_, { name, born }) => {
      // Validación del nombre del autor
      if (name.length < 3) {
        throw new GraphQLError('El nombre del autor debe tener al menos 3 caracteres.', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: name },
        });
      }
  
      // Validación del año de nacimiento
      const currentYear = new Date().getFullYear();
      if (born > currentYear) {
        throw new GraphQLError('El año de nacimiento no puede ser mayor que el año actual.', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: born },
        });
      }
  
      // Buscar el autor en la base de datos
      const author = await Author.findOne({ name });
      if (!author) {
        throw new GraphQLError('Autor no encontrado', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: name },
        });
      }
  
      // Actualizar el año de nacimiento
      author.born = born;
      await author.save();
  
      return author;
    },
  },
  
  /*
    addBook: async (root, args) => {
      console.log("addBook args BACK:", args);

      // Verificar si el autor ya existe
      let author = await Author.findOne({ name: args.author });

      // Si el autor no existe, lo creamos
      if (!author) {
        author = new Author({ name: args.author, bookCount: 0 });
        await author.save();
      }

      // Crear el nuevo libro
      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,  // Guardamos la referencia al autor
        genres: args.genres,
      });

      await book.save();

      // Incrementar el contador de libros del autor
      author.bookCount += 1;
      await author.save();

      return book;
    },

     updateAuthor: async (_, { name, born }) => {
      const author = await Author.findOne({ name });

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
      await author.save();

      return author;
    }, 
    updateAuthor: async (_, { name, born }) => {
      // Buscar el autor por nombre
      let author = await Author.findOne({ name });
  
      // Si no existe el autor, lo creamos
      if (!author) {
        author = new Author({
          name,
          born
        });
        await author.save();
      } else {
        // Si el autor ya existe, actualizamos su año de nacimiento
        author.born = born;
        await author.save();
      }
  
      return author;
    },
  
  },

  Author: {
    bookCount: async (author) => {
      // Calcular el número de libros asociados con un autor
      const books = await Book.find({ author: author._id });
      return books.length;
    },
  },

  Book: {
    author: async (book) => {
      return await Author.findById(book.author);
    },
  },*/
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error("BACK APOLLO :::Error en el servidor:", error); // Esto muestra el error en la consola del servidor
    return error;
  },
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer ')) {
      const token = auth.substring(7);
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

