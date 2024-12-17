import { gql } from '@apollo/client';

//import { gql } from 'apollo-boost';
//VERSION1 GET_REPOSITORIES 
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


export const GET_REPOSITORY2 = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      url
      ownerAvatarUrl
    }
  }
`;
export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      id
      name
      ownerName
      fullName
      language
      ownerAvatarUrl
      ratingAverage
      reviewCount
      description
      stargazersCount  
      forksCount 
      url


    }
  }
`;
export const GET_REPOSITORY_WITH_REVIEWS = gql`
  query GetRepositoryWithReviews($id: ID!) {
    repository(id: $id) {
      id
      name
      ownerName
      fullName
      language
      ownerAvatarUrl
      ratingAverage
      reviewCount
      description
      stargazersCount  
      forksCount 
      url
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


export const GET_USER = gql`
  query GetUser {
    me {
      id
      username
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const GET_REVIEWS = gql`
  query GetReviews($repositoryId: ID!, $first: Int!, $after: String) {
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
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_REPOSITORY_REVIEWS = gql`
  query GetRepositoryReviews($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    id
    fullName
    reviews(first: $first, after: $after) {
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
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;
export const ME_REPOSITORIES = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
export const ME_REVIEWS = gql`
  query MeReviews($first: Int, $after: String) {
    me {
      id
      username
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            rating
            text
            createdAt
            repository {
              id
              fullName
              url
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

