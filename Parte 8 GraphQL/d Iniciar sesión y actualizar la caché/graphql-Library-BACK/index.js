const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const { createServer } = require('http');  // Asegúrate de importar 'http' correctamente
 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Importar modelos
const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');
const Person = require('./models/Person'); 

// Clave secreta para tokens JWT
const JWT_SECRET = 'SECRET_KEY';


// Conectar a MongoDB
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
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  input AuthorInput { 
    name: String!
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
      title: String!, 
      author: AuthorInput!, 
      published: Int!, 
      genres: [String!]!
    ): Book!

    updateAuthor(
      name: String!, 
      born: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
      password: String!     
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`;

const BOOK_ADDED = 'BOOK_ADDED';

const resolvers = {
  Query: {
    personCount: async () => await Person.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return await Person.find({});
      }
      const byPhone = args.phone === 'YES' ? { phone: { $exists: true } } : { phone: { $exists: false } };
      return await Person.find(byPhone);
    },
    findPerson: async (root, args) => await Person.findOne({ name: args.name }),
    allBooks: async (root, { genre }) => {
      const filter = genre ? { genres: genre } : {};
      return await Book.find(filter).populate('author');
    },
    allAuthors: async () => {
      return await Author.find();
    },
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
      const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);
      if (!(user && passwordCorrect)) {
        throw new GraphQLError('Credenciales incorrectas', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }
      const userForToken = { username: user.username, id: user._id };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },

    addPerson: async (root, args) => {
      const existingPerson = await Person.findOne({ name: args.name });
      if (existingPerson) {
        throw new GraphQLError('Name must be unique', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name },
        });
      }
      const person = new Person({
        name: args.name,
        phone: args.phone,
        address: { street: args.street, city: args.city }
      });
      await person.save();
      return person;
    },

    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      if (!person) return null;
      person.phone = args.phone;
      await person.save();
      return person;
    },

    addBook: async (root, args, context) => {
      const { title, published, genres } = args;
      const authorName = args.author.name;
      if (!context.currentUser) {
        throw new GraphQLError('No autorizado', { extensions: { code: 'UNAUTHORIZED' } });
      }
      if (title.length < 3) {
        throw new GraphQLError('El título del libro debe tener al menos 3 caracteres.', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: title },
        });
      }
      const currentYear = new Date().getFullYear();
      if (published > currentYear) {
        throw new GraphQLError('El año de publicación no puede ser mayor que el año actual.', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: published },
        });
      }
      if (!genres || genres.length === 0) {
        throw new GraphQLError('El libro debe tener al menos un género.', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: genres },
        });
      }
      let author = await Author.findOne({ name: authorName });
      if (!author) {
        author = new Author({ name: authorName, bookCount: 0 });
        await author.save();
      }
      const book = new Book({ title, published, author: author._id, genres });
      await book.save();
      
      author.bookCount += 1;
      await author.save();
      return await Book.findById(book._id).populate('author');
    },

    updateAuthor: async (_, { name, born }) => {
      if (name.length < 3) {
        throw new GraphQLError('El nombre del autor debe tener al menos 3 caracteres.', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: name },
        });
      }
      const currentYear = new Date().getFullYear();
      if (born > currentYear) {
        throw new GraphQLError('El año de nacimiento no puede ser mayor que el año actual.', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: born },
        });
      }
      const author = await Author.findOne({ name });
      if (!author) {
        throw new GraphQLError('Autor no encontrado', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: name },
        });
      }
      author.born = born;
      await author.save();
      return author;
    },
  },

  
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error("Error en el servidor:", error); 
    return error;
  },
});


const httpServer = createServer(server);

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
}).then(({ url, subscriptionsUrl  }) => {
  console.log(`Server ready at ${url}`);
  

  
});






