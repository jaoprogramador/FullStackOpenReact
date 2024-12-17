import { gql } from '@apollo/client';

export const AUTHORIZE2 = gql`
  mutation Authorize($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;
export const AUTHORIZE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
//FORMULARIO DE CREAR REVIEW
export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;
//FORMULARIO DE CREAR USUARIO
export const CREATE_USER = gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;
//DELETE REVIEW
export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
  deleteReview(id: $id)
}

`;



