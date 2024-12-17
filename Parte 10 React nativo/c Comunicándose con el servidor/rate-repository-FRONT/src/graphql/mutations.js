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
