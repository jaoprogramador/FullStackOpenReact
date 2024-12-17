import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
      published
      genres
    }
  }
`;

export const UPDATE_AUTHOR_BIRTHYEAR = gql`
  mutation updateAuthorBirthyear($name: String!, $born: Int!) {
    updateAuthorBirthyear(name: $name, born: $born) {
      name
      born
    }
  }
`;

