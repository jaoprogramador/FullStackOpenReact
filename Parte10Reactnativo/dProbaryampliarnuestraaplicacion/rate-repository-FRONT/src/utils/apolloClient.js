

/* import {ApolloClient,InMemoryCache,HttpLink  } from 'apollo-boost'; */
import { ApolloClient, InMemoryCache, HttpLink,createHttpLink  } from '@apollo/client';
import AuthStorage from './authStorage';
import { setContext } from '@apollo/client/link/context';

import Constants from 'expo-constants';


// Crea un enlace HTTP para conectarte al endpoint de GraphQL
//const httpLink = new HttpLink({ CAMBIO CON LOGIN
const httpLink = createHttpLink({

  uri: 'http://192.168.1.153:4000/graphql', // Reemplaza con tu endpoint
  //uri: Constants.manifest.extra?.apolloUri || 'http://192.168.1.153:4000/graphql',
});

// Crea una instancia de ApolloClient
const createApolloClient = () => {
  return new ApolloClient({
    // Replace the IP address part with your own IP address!
    //uri: 'http://192.168.1.153:4000/graphql',
    //link: httpLink, CAMBIO CON LOGIN
    link: authLink.concat(httpLink),

    cache: new InMemoryCache()

  });
};
const authLink = setContext(async (_, { headers }) => {
  const authStorage = new AuthStorage();
  const token = await authStorage.getAccessToken(); // Recupera el token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


export default createApolloClient;