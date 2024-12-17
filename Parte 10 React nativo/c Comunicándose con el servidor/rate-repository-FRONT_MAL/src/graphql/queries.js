import { gql } from '@apollo/client';

//import { gql } from 'apollo-boost';
export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          name
          ownerName
          ratingAverage
          reviewCount
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    me {
      id
      username
    }
  }
`;
