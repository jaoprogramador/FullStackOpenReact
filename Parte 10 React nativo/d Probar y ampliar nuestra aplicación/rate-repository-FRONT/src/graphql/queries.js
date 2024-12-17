import { gql } from 'apollo-boost';

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

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      stargazersCount
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
export const CREATE_REVIEW = gql`
  mutation CreateReview($ownerName: String!, $repositoryName: String!, $rating: Int!, $reviewText: String) {
    createReview(ownerName: $ownerName, repositoryName: $repositoryName, rating: $rating, reviewText: $reviewText) {
      id
      repositoryId
    }
  }
`;


export const GET_REPOSITORIES2 = gql`
  query getRepositories($searchKeyword: String) {
    repositories(searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
          description
        }
      }
    }
  }
`;

export const GET_REVIEWS = gql`
  query GetRepositoryReviews($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

