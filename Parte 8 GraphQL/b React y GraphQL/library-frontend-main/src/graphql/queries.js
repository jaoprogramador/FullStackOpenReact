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
      author
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


