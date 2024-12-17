import { gql } from '@apollo/client'

export const GET_AUTHORS = gql`
  query GetAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    allBooks {
      title
      published
      genres
      author {
        name
        born
      }
    }

  }
`;
export const GET_USER_FAVORITE_GENRE = gql`
  query GetUserFavoriteGenre {
    me {
      favoriteGenre
    }
  }
`;

export const GET_BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
    }
  }
`;



export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($name: String!, $born: Int!) {
    updateAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: AuthorInput!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
    }
  }
`;

//SUBSCRIPCIONES
//===============
// Definir la suscripción para 'bookAdded'
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
    }
  }
`;


